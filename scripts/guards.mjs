/**
 * Build guards.
 *
 * These turn recurring defects from the site audit into build failures rather
 * than things somebody has to remember:
 *
 *   1. A dash character in visitor facing copy
 *   2. An href of "#", which is what broke five links on the live homepage
 *   3. A route with anything other than exactly one h1
 *   4. An image with no alt attribute
 *   5. An internal link pointing at a route that does not exist
 *
 * Guards 1, 3, 4 and 5 read the built HTML rather than the source, so they
 * check what a visitor and a crawler actually receive. Class names, hrefs and
 * CSS values are code identifiers and are never inspected as copy.
 *
 * Usage: next build && node scripts/guards.mjs
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, relative, sep } from "node:path";

const OUT = "out";
let failures = 0;

const fail = (message) => {
  failures += 1;
  console.error(`  ✗ ${message}`);
};

/* ---------------------------------------------------------------------- */

function walk(dir, test, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, test, out);
    else if (test(full)) out.push(full);
  }
  return out;
}

/**
 * Turns a built file path into a URL route.
 *
 * `relative()` returns backslashes on Windows, which never match the forward
 * slash routes read out of the HTML or `lib/routes.ts`. Every route string in
 * this file goes through here so the two stay comparable on every platform.
 */
const toRoute = (file) =>
  "/" + relative(OUT, file).split(sep).join("/").replace(/index\.html$/, "");

const pages = walk(OUT, (f) => f.endsWith("index.html"));

if (pages.length === 0) {
  console.error("\nNo build output found. Run next build first.\n");
  process.exit(1);
}

/** Strips everything a visitor does not read, then returns the text nodes. */
function visibleText(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    // Drop the whole head, which holds meta content checked separately.
    .replace(/<head[\s\S]*?<\/head>/gi, " ");

  return stripped
    .split(/<[^>]+>/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function metaStrings(html) {
  const out = [];
  for (const match of html.matchAll(
    /<(?:title)>([^<]+)<\/title>|<meta[^>]+(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"[^>]*content="([^"]*)"/gi,
  )) {
    out.push(match[1] ?? match[2]);
  }
  return out.filter(Boolean);
}

/* ---------------------------------------------------------------------- */
/* 1. No dash characters in visitor facing copy                           */
/* ---------------------------------------------------------------------- */

// Hyphen minus, non breaking hyphen, figure dash, en dash, em dash,
// horizontal bar and the minus sign.
const DASH = /[-‐‑‒–—―−]/;

console.log("\nGuard 1: no dash characters in visitor facing copy");
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route = toRoute(file);

  for (const text of [...visibleText(html), ...metaStrings(html)]) {
    // Bare URLs are addresses, not prose.
    if (/^https?:\/\//.test(text) || text.startsWith("/")) continue;
    if (DASH.test(text)) {
      const at = text.search(DASH);
      fail(
        `${route} dash in copy near: ${text
          .slice(Math.max(0, at - 34), at + 34)
          .replace(/\s+/g, " ")}`,
      );
    }
  }
}

/* ---------------------------------------------------------------------- */
/* 2. No placeholder links                                                 */
/* ---------------------------------------------------------------------- */

console.log("Guard 2: no placeholder links");
const sources = walk(
  ".",
  (f) =>
    [".tsx", ".ts", ".mdx"].includes(extname(f)) &&
    !f.includes("node_modules") &&
    !f.includes(".next") &&
    !f.startsWith("out"),
);

for (const file of sources) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      if (/href=["']#["']/.test(line) || /href:\s*["']#["']/.test(line)) {
        fail(`${file}:${index + 1} placeholder href of "#"`);
      }
    });
}

/* ---------------------------------------------------------------------- */
/* 3 and 4. One h1 per route, and every image carries alt text             */
/* ---------------------------------------------------------------------- */

console.log("Guard 3: exactly one h1 per route");
console.log("Guard 4: every image has alt text");

const routeSet = new Set(pages.map(toRoute));

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route = toRoute(file);

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(`${route} has ${h1s} h1 elements, expected exactly 1`);

  const missingAlt = [...html.matchAll(/<img\b[^>]*>/g)].filter(
    (m) => !/\balt=/.test(m[0]),
  ).length;
  if (missingAlt > 0) {
    fail(`${route} has ${missingAlt} image(s) with no alt attribute`);
  }
}

/* ---------------------------------------------------------------------- */
/* 5. Every internal link resolves to a real route                         */
/* ---------------------------------------------------------------------- */

console.log("Guard 5: every internal link resolves");
const seen = new Set();
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route = toRoute(file);

  for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    let target = match[1];
    if (!target.endsWith("/")) target += "/";
    if (target.startsWith("/_next/")) continue;
    if (/\.[a-z0-9]{2,5}\/$/i.test(target)) continue; // a file, not a route
    const key = `${route} -> ${target}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (!routeSet.has(target)) {
      fail(`${route} links to ${target}, which is not a built route`);
    }
  }
}

/* ====================================================================== */
/* Guards 6 to 9: repetition                                              */
/*                                                                        */
/* The audit of August 2026 found one closing paragraph formula on 17 of  */
/* 20 pages, a component default heading identical on 10 pages, and       */
/* eleven pages running the same last three blocks in the same order.     */
/* Rewriting that copy once does not stop it returning, so these four     */
/* guards measure it on every build.                                      */
/*                                                                        */
/* These ran in reporting mode while the rewrite was in progress, because */
/* failing the build for the whole duration of the work helps nobody.     */
/* The rewrite is finished and the count is zero, so they now block by     */
/* default. Set GUARDS_SOFT=1 to drop back to warnings during a large      */
/* content change, and put it back before merging.                        */
/* ====================================================================== */

const STRICT = process.env.GUARDS_SOFT !== "1";
let softFailures = 0;

const soft = (message) => {
  if (STRICT) fail(message);
  else {
    softFailures += 1;
    console.warn(`  ! ${message}`);
  }
};

/**
 * The page's own content, with the shared header and footer removed, and
 * with the breadcrumb trail dropped. Breadcrumbs are navigation, so the
 * word "Home" appearing on every route is correct rather than repetitive.
 */
function mainRegion(html) {
  const match = html.match(/<main[^>]*id="main"[^>]*>([\s\S]*)<\/main>/i);
  if (!match) return "";
  return match[1].replace(
    /<nav[^>]*aria-label="Breadcrumb"[^>]*>[\s\S]*?<\/nav>/gi,
    " ",
  );
}

function textOf(fragment) {
  return fragment
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const normalise = (s) =>
  s.toLowerCase().replace(/[.,;:!?"'’“”()]/g, "").replace(/\s+/g, " ").trim();

const routeOf = toRoute;

/**
 * Deliberate repetition, and why each entry is here.
 *
 * These guards exist to catch copy that was defaulted rather than written.
 * They are not an argument against a site having a consistent primary call
 * to action or a shared reading list, so the handful of strings that are
 * meant to be identical everywhere are named here rather than the guards
 * being softened for everything.
 *
 * Adding to this list should be uncomfortable. If an entry is not a
 * deliberate global pattern, the fix is the copy, not this array.
 */
const DELIBERATE = new Set([
  // The site has one primary action and one secondary action. Varying them
  // per page would be worse for a visitor, not better.
  "book a demo",
  "read a white paper first",
  "book a demo read a white paper first",
  // The blog template's own furniture.
  "read next",
  "all writing",
]);

/**
 * Routes excluded from the repetition corpus.
 *
 * The two error documents are the same page emitted twice by the framework,
 * one for the static export and one for the router fallback. Comparing them
 * with each other reports a duplicate that cannot be fixed and does not
 * exist.
 */
const EXCLUDED_ROUTES = new Set(["/404/", "/_not-found/"]);

/**
 * Every route label, read from the registry.
 *
 * Used to tell a heading that is a navigation label from a heading somebody
 * wrote. A related pages card is headed with the target route's label, so
 * "Intelli Form" appearing as a heading on three routes is the link working.
 */
const ROUTE_LABELS = new Set(
  [...readFileSync(join("lib", "routes.ts"), "utf8").matchAll(/label:\s*"([^"]+)"/g)].map(
    (m) => normalise(m[1]),
  ),
);

const sentenceIndex = new Map(); // normalised sentence -> Set(route)
const headingIndex = new Map(); // normalised heading  -> Set(route)
const labelIndex = new Map(); // normalised link label -> Set(route)
const sequenceIndex = new Map(); // block sequence      -> [route]

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route = routeOf(file);
  if (EXCLUDED_ROUTES.has(route)) continue;
  const main = mainRegion(html);
  if (!main) continue;

  // Sentences. Long ones only, because a short repeated phrase such as a
  // product name is not a defect.
  for (const raw of textOf(main).split(/(?<=[.?!])\s+/)) {
    const sentence = normalise(raw);
    if (sentence.split(" ").length < 8) continue;
    if (DELIBERATE.has(sentence)) continue;
    if (!sentenceIndex.has(sentence)) sentenceIndex.set(sentence, new Set());
    sentenceIndex.get(sentence).add(route);
  }

  // Headings, at any level below the h1.
  for (const match of main.matchAll(/<h([2-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const heading = normalise(textOf(match[2]));
    if (heading.length < 6) continue;
    // A related pages card is titled with the route's own label, so the same
    // product name appearing as a heading on three routes is the navigation
    // working rather than the copy repeating.
    if (ROUTE_LABELS.has(heading)) continue;
    if (DELIBERATE.has(heading)) continue;
    if (!headingIndex.has(heading)) headingIndex.set(heading, new Set());
    headingIndex.get(heading).add(route);
  }

  // Link and button labels inside the page body.
  for (const match of main.matchAll(/<(?:a|button)\b[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)) {
    const label = normalise(textOf(match[1]));
    if (label.length < 4 || label.split(" ").length > 8) continue;
    if (DELIBERATE.has(label)) continue;
    if (!labelIndex.has(label)) labelIndex.set(label, new Set());
    labelIndex.get(label).add(route);
  }

  // Block sequence, read from the data-block attribute on every shared band.
  const blocks = [...main.matchAll(/data-block="([a-z0-9]+)"/g)].map((m) => m[1]);
  // A sequence of one block carries no information about a page's shape. The
  // twelve blog posts all render a single closing call to action band and
  // nothing else that is marked, which is the template working rather than
  // twelve pages built from the same skeleton.
  if (blocks.length < 2) continue;
  const sequence = blocks.join(" > ");
  if (!sequenceIndex.has(sequence)) sequenceIndex.set(sequence, []);
  sequenceIndex.get(sequence).push(route);
}

/* ---------------------------------------------------------------------- */
/* 6. No sentence of eight or more words appears on two routes             */
/* ---------------------------------------------------------------------- */

console.log("Guard 6: no duplicated sentences across routes");
/*
 * Three routes, not two.
 *
 * A sentence on exactly two routes is nearly always structural rather than
 * lazy: a listing card carrying a post's own description, or one diagram
 * legitimately shown on both the hub page and the product page it belongs
 * to. Failing on those trains everybody to ignore the guard. On three or
 * more routes it is a template speaking rather than a writer.
 */
const dupSentences = [...sentenceIndex.entries()]
  .filter(([, routes]) => routes.size > 2)
  .sort((a, b) => b[1].size - a[1].size);

for (const [sentence, routes] of dupSentences.slice(0, 25)) {
  soft(
    `on ${routes.size} routes: "${sentence.slice(0, 96)}${
      sentence.length > 96 ? "..." : ""
    }"`,
  );
}
if (dupSentences.length > 25) {
  console.warn(`  ! and ${dupSentences.length - 25} more duplicated sentences`);
}

/* ---------------------------------------------------------------------- */
/* 7. No heading repeats across three or more routes                       */
/* ---------------------------------------------------------------------- */

console.log("Guard 7: headings are written per page, not defaulted");
const dupHeadings = [...headingIndex.entries()]
  .filter(([, routes]) => routes.size >= 3)
  .sort((a, b) => b[1].size - a[1].size);

for (const [heading, routes] of dupHeadings) {
  soft(`heading on ${routes.size} routes: "${heading}"`);
}

/* ---------------------------------------------------------------------- */
/* 8. No call to action label repeats across eight or more routes          */
/* ---------------------------------------------------------------------- */

console.log("Guard 8: call to action labels vary");
const dupLabels = [...labelIndex.entries()]
  .filter(([, routes]) => routes.size >= 8)
  .sort((a, b) => b[1].size - a[1].size);

for (const [label, routes] of dupLabels) {
  soft(`label on ${routes.size} routes: "${label}"`);
}

/* ---------------------------------------------------------------------- */
/* 9. No block sequence is shared by four or more routes                   */
/* ---------------------------------------------------------------------- */

console.log("Guard 9: pages do not all run the same skeleton");
const dupSequences = [...sequenceIndex.entries()]
  .filter(([, routes]) => routes.length >= 4)
  .sort((a, b) => b[1].length - a[1].length);

for (const [sequence, routes] of dupSequences) {
  soft(`${routes.length} routes share the sequence ${sequence}`);
}

/* ---------------------------------------------------------------------- */

if (!STRICT && softFailures > 0) {
  console.log(
    `\n${softFailures} repetition warning${
      softFailures === 1 ? "" : "s"
    } from guards 6 to 9. Reporting only.`,
  );
  console.log("Run without GUARDS_SOFT=1 to make these fail again.");
}

console.log(
  failures === 0
    ? `\nAll blocking guards passed across ${pages.length} routes.\n`
    : `\n${failures} guard failure${failures === 1 ? "" : "s"}.\n`,
);
process.exit(failures === 0 ? 0 : 1);
