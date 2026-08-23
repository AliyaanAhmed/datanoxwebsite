/**
 * Hero headline wrap check.
 *
 * Every page hero splits its headline into explicit spans so the line breaks
 * are deliberate. A span that wraps has broken that intent, and it happens
 * silently whenever copy or the display typeface changes. This walks every
 * built route and reports any span rendering on more than one line.
 *
 * Needs /tmp/routes.json, which scripts/seo-audit.mjs and the build sweep
 * both produce, and a server on port 8811.
 */

import { chromium } from 'playwright';
import fs from 'fs';
const routes = JSON.parse(fs.readFileSync('/tmp/routes.json','utf8'));
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const bad = [];
for (const r of routes) {
  await p.goto('http://localhost:8811' + r, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(250);
  const res = await p.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return null;
    const spans = [...h1.children].filter(c => c.tagName === 'SPAN');
    const out = spans.map(s => {
      const inner = s.firstElementChild || s;
      const rects = inner.getClientRects().length;
      return { text: inner.textContent.trim(), lines: rects };
    });
    return { spanCount: spans.length, out, text: h1.textContent.trim() };
  });
  if (!res) { bad.push([r, 'NO H1']); continue; }
  const wrapped = res.out.filter(o => o.lines > 1);
  if (wrapped.length) bad.push([r, wrapped.map(w => `"${w.text}" -> ${w.lines} lines`).join(' | ')]);
}
console.log(bad.length ? bad.map(x => x.join('  ::  ')).join('\n') : 'no wrapped hero spans at 1440');
await b.close();
