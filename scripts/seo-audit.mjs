/**
 * Metadata and internal link audit.
 *
 * Reads the built HTML rather than the source, so it reports what a crawler
 * receives. Checks title and description length, canonical, Open Graph image,
 * h1 and structured data on every indexable route, and reports how many
 * inbound links each route has from other pages' bodies.
 *
 * The inbound count excludes the header and footer, because a link every page
 * carries tells you nothing about what the site considers important.
 */

import fs from 'node:fs';
import path from 'node:path';

const OUT = 'out';
const pages = [];
const walk = (dir, base = '') => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walk(path.join(dir, e.name), base + '/' + e.name);
    else if (e.name === 'index.html') pages.push({ route: (base || '') + '/', file: path.join(dir, e.name) });
  }
};
walk(OUT);

// The two framework error documents and the utility landing page are not
// indexable and are not part of the information architecture, so holding
// them to the same rules only produces noise.
const SKIP = new Set(['/404/', '/_not-found/', '/qrlandingpage/']);
const skipped = pages.filter((p) => SKIP.has(p.route)).map((p) => p.route);
for (let i = pages.length - 1; i >= 0; i--) if (SKIP.has(pages[i].route)) pages.splice(i, 1);

const pick = (html, re) => { const m = html.match(re); return m ? m[1] : null; };
const decode = (s) => s ? s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>') : s;

const rows = [];
const linkGraph = new Map();

for (const { route, file } of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const title = decode(pick(html, /<title>([^<]*)<\/title>/));
  const desc = decode(pick(html, /<meta name="description" content="([^"]*)"/));
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const ogImage = pick(html, /<meta property="og:image" content="([^"]*)"/);
  const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, '').trim() ?? null);
  const robots = pick(html, /<meta name="robots" content="([^"]*)"/);
  const ld = (html.match(/application\/ld\+json/g) || []).length;

  // internal links out of <main>
  const main = (html.match(/<main[^>]*id="main"[\s\S]*?<\/main>/) || [''])[0];
  const hrefs = [...main.matchAll(/href="(\/[^"#?]*)"/g)].map(m => m[1]);
  linkGraph.set(route, new Set(hrefs.filter(h => h !== route)));

  rows.push({ route, title, desc, canonical, ogImage, h1, robots, ld });
}

const problems = [];
const seenTitles = new Map(), seenDescs = new Map();

for (const r of rows) {
  const t = r.title ?? '';
  const d = r.desc ?? '';
  if (!r.title) problems.push([r.route, 'no title']);
  if (!r.desc) problems.push([r.route, 'no description']);
  if (t.length > 62) problems.push([r.route, `title ${t.length} chars: ${t}`]);
  if (t.length && t.length < 20) problems.push([r.route, `title only ${t.length} chars`]);
  if (d.length > 160) problems.push([r.route, `description ${d.length} chars`]);
  if (d.length && d.length < 70) problems.push([r.route, `description only ${d.length} chars`]);
  if (!r.canonical) problems.push([r.route, 'no canonical']);
  if (!r.ogImage) problems.push([r.route, 'no og:image']);
  if (!r.h1) problems.push([r.route, 'no h1']);
  if (!r.ld) problems.push([r.route, 'no structured data']);
  if (t) { (seenTitles.get(t) ?? seenTitles.set(t, []).get(t)).push(r.route); }
  if (d) { (seenDescs.get(d) ?? seenDescs.set(d, []).get(d)).push(r.route); }
}

for (const [t, rs] of seenTitles) if (rs.length > 1) problems.push([rs.join(', '), `duplicate title: ${t}`]);
for (const [d, rs] of seenDescs) if (rs.length > 1) problems.push([rs.join(', '), `duplicate description`]);

// inbound link counts
const inbound = new Map(rows.map(r => [r.route, 0]));
for (const [, outs] of linkGraph) for (const o of outs) if (inbound.has(o)) inbound.set(o, inbound.get(o) + 1);

console.log(`${rows.length} routes checked, ${skipped.length} skipped (${skipped.join(', ')})\n`);
console.log('--- Problems ---');
if (!problems.length) console.log('none');
for (const [where, what] of problems) console.log(`  ${where}\n    ${what}`);

console.log('\n--- Inbound internal links (from page bodies, excluding nav and footer) ---');
[...inbound.entries()].sort((a, b) => a[1] - b[1]).forEach(([r, n]) => {
  const flag = n === 0 ? '  ORPHAN' : n < 2 ? '  thin' : '';
  console.log(`  ${String(n).padStart(3)}  ${r}${flag}`);
});
