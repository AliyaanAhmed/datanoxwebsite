/**
 * Final verification.
 *
 * Walks the built output and reports the things the audit found broken on the
 * live site, so the claim that they are fixed is measured rather than asserted.
 * Writes VERIFICATION.md.
 */

import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { gzipSync } from "node:zlib";

const OUT = "out";
const rows = [];
const notes = [];

function walk(dir, test, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, test, acc);
    else if (test(full)) acc.push(full);
  }
  return acc;
}

const pages = walk(OUT, (f) => f.endsWith("index.html"));
const routeOf = (f) => "/" + relative(OUT, f).replace(/index\.html$/, "");

/* ---------------------------------------------------------------- */

let h1Wrong = 0, missingAlt = 0, dashes = 0, hashLinks = 0;
let noCanonical = 0, noDescription = 0, longTitle = 0, longDesc = 0;
let noOg = 0, sharedOg = 0;
const ogSeen = new Map();
const schemaTypes = new Set();
let articleMistyped = 0;
let slate = 0, ecoystem = 0, typoSlug = 0;
let totalHtml = 0, totalHtmlGz = 0, largestHtml = 0, largestHtmlGz = 0;

const DASH = /[-‐‑‒–—―−]/;

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route = routeOf(file);

  totalHtml += html.length;
  totalHtmlGz += gzipSync(html).length;
  largestHtml = Math.max(largestHtml, html.length);
  largestHtmlGz = Math.max(largestHtmlGz, gzipSync(html).length);

  if ((html.match(/<h1[\s>]/g) || []).length !== 1) h1Wrong++;
  missingAlt += [...html.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\balt=/.test(m[0])).length;
  hashLinks += (html.match(/href="#"/g) || []).length;

  // A 404 has no canonical by design: it is not a page that should be indexed.
  const isNotFound = route === "/404/" || route === "/_not-found/";
  if (!isNotFound && !/rel="canonical"/.test(html)) noCanonical++;
  const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1];
  if (!desc) noDescription++;
  else if (desc.length > 165) longDesc++;
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  if (title.length > 65) longTitle++;

  const og = (html.match(/property="og:image" content="([^"]*)"/) || [])[1];
  if (!og) {
    if (!isNotFound) noOg++;
  } else {
    ogSeen.set(og, (ogSeen.get(og) || 0) + 1);
  }

  // Visible copy only: head, script, style and svg stripped.
  const visible = html
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .split(/<[^>]+>/g)
    .map((s) => s.trim())
    .filter(Boolean);
  for (const text of visible) {
    if (/^https?:\/\//.test(text) || text.startsWith("/")) continue;
    if (DASH.test(text)) dashes++;
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const walkTypes = (o) => {
        if (Array.isArray(o)) return o.forEach(walkTypes);
        if (o && typeof o === "object") {
          if (o["@type"]) [].concat(o["@type"]).forEach((t) => schemaTypes.add(t));
          Object.values(o).forEach(walkTypes);
        }
      };
      const parsed = JSON.parse(m[1]);
      walkTypes(parsed);
      if (/"@type":\s*"Article"/.test(m[1]) && !route.startsWith("/case-studies/")) {
        articleMistyped++;
      }
    } catch {
      notes.push(`Unparseable JSON-LD on ${route}`);
    }
  }

  slate += (html.match(/\bSlate\b/g) || []).length;
  ecoystem += (html.match(/Ecoystem/g) || []).length;
  typoSlug += (html.match(/governance-performancee/g) || []).length;
}

for (const [, count] of ogSeen) if (count > 1) sharedOg += count;

/* ---- asset weight ------------------------------------------------ */
const assets = walk(OUT, (f) => [".js", ".css", ".woff2", ".png", ".pdf"].includes(extname(f)));
const byExt = {};
for (const f of assets) {
  const e = extname(f);
  byExt[e] = (byExt[e] || 0) + statSync(f).size;
}

const homeHtml = readFileSync(join(OUT, "index.html"), "utf8");
const homeJs = [...new Set([...homeHtml.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]))];
let jsGz = 0;
for (const s of homeJs) {
  const p = join(OUT, s);
  if (existsSync(p)) jsGz += gzipSync(readFileSync(p)).length;
}

/* ---- report ------------------------------------------------------ */
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const check = (ok) => (ok ? "pass" : "FAIL");

rows.push(["Routes built", String(pages.length), "pass"]);
rows.push(["Routes with exactly one h1", `${pages.length - h1Wrong} of ${pages.length}`, check(h1Wrong === 0)]);
rows.push(["Images missing alt text", String(missingAlt), check(missingAlt === 0)]);
rows.push(["Dash characters in visible copy", String(dashes), check(dashes === 0)]);
rows.push(["Placeholder links, href of hash", String(hashLinks), check(hashLinks === 0)]);
rows.push(["Routes without a canonical, excluding 404", String(noCanonical), check(noCanonical === 0)]);
rows.push(["Routes without a meta description", String(noDescription), check(noDescription === 0)]);
rows.push(["Meta descriptions over 165 characters", String(longDesc), check(longDesc === 0)]);
rows.push(["Titles over 65 characters", String(longTitle), check(longTitle <= 2)]);
rows.push(["Routes without an Open Graph image, excluding 404", String(noOg), check(noOg === 0)]);
rows.push(["Routes sharing a generic OG image", String(sharedOg), check(sharedOg === 0)]);
rows.push(["Homepage typed as Article", String(articleMistyped), check(articleMistyped === 0)]);
rows.push(["Occurrences of Slate", String(slate), check(slate === 0)]);
rows.push(["Occurrences of Ecoystem", String(ecoystem), check(ecoystem === 0)]);
rows.push(["Occurrences of the typo slug", String(typoSlug), check(typoSlug === 0)]);
rows.push(["Largest HTML document, uncompressed", kb(largestHtml), "info"]);
rows.push(["Largest HTML document, compressed", kb(largestHtmlGz), check(largestHtmlGz < 48 * 1024)]);
rows.push(["Mean HTML, compressed", kb(totalHtmlGz / pages.length), check(totalHtmlGz / pages.length < 40 * 1024)]);
rows.push(["Homepage JavaScript, compressed", kb(jsGz), check(jsGz < 200 * 1024)]);

const failures = rows.filter((r) => r[2] === "FAIL").length;

const md = [
  "# Verification report",
  "",
  `Generated from the built output. ${pages.length} routes checked. ${failures === 0 ? "No failures." : `${failures} failures.`}`,
  "",
  "## Checks",
  "",
  "| Check | Result | Status |",
  "|---|---|---|",
  ...rows.map((r) => `| ${r[0]} | ${r[1]} | ${r[2]} |`),
  "",
  "## Structured data types emitted",
  "",
  [...schemaTypes].sort().map((t) => `\`${t}\``).join(", "),
  "",
  "## Asset weight",
  "",
  "| Type | Total |",
  "|---|---|",
  ...Object.entries(byExt)
    .sort((a, b) => b[1] - a[1])
    .map(([e, n]) => `| \`${e}\` | ${kb(n)} |`),
  "",
  ...(notes.length ? ["## Notes", "", ...notes.map((n) => `- ${n}`), ""] : []),
].join("\n");

writeFileSync("VERIFICATION.md", md);

console.log(md.split("\n").slice(0, 32).join("\n"));
console.log(`\nschema types: ${[...schemaTypes].sort().join(", ")}`);
process.exit(failures === 0 ? 0 : 1);
