/**
 * Screenshot helper.
 *
 * Forces every scroll reveal shown and every lazy image eager before
 * capturing, because a full page screenshot never scrolls and would
 * otherwise photograph an empty document.
 *
 * Usage:
 *   node scripts/shots.mjs '[["/clients/","/tmp/a.png",{"full":true}]]'
 *
 * Options per job: w, h, full, scroll. Set CHROMIUM_PATH if Playwright
 * cannot find its own browser.
 */

import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const jobs = JSON.parse(process.argv[2]);
for (const [path, out, opts = {}] of jobs) {
  const p = await b.newPage({ viewport: { width: opts.w || 1440, height: opts.h || 1000 }, deviceScaleFactor: 2 });
  await p.goto('http://localhost:8811' + path, { waitUntil: 'networkidle' });
  // Reveal blocks are opacity 0 until an IntersectionObserver marks them.
  // A full page screenshot never scrolls, so nothing below the fold would
  // ever be shown. Force them all before capturing.
  await p.evaluate(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.setAttribute('data-shown', 'true'));
  });
  // Lazy loaded images below the fold never decode during a full page
  // screenshot. Force them eager and wait for the load, with a ceiling so a
  // single broken asset cannot hang the run.
  await p.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
  });
  await p.evaluate(() => new Promise((resolve) => {
    const done = () => resolve(true);
    setTimeout(done, 6000);
    const pending = [...document.images].filter((i) => !i.complete);
    if (!pending.length) return done();
    let left = pending.length;
    pending.forEach((i) => {
      const tick = () => { if (--left === 0) done(); };
      i.addEventListener('load', tick, { once: true });
      i.addEventListener('error', tick, { once: true });
    });
  }));
  if (opts.scroll) { await p.evaluate((y) => window.scrollTo(0, y), opts.scroll); }
  await p.waitForTimeout(900);
  await p.screenshot({ path: out, fullPage: !!opts.full });
  await p.close();
}
await b.close();
