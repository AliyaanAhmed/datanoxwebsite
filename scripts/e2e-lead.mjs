/**
 * End to end check of both lead capture forms.
 *
 * Run a stub endpoint that answers 200 with a permissive cross origin header,
 * build with NEXT_PUBLIC_LEAD_ENDPOINT pointing at it, then run this. It
 * fills the white paper gate, confirms the download is released, confirms a
 * second paper does not ask again, and submits the contact form.
 *
 * The thing worth testing here is the failure path: build without the
 * endpoint and both forms must show an error rather than a false
 * confirmation.
 */

import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, acceptDownloads: true });
const p = await ctx.newPage();

// --- paper gate, success path
await p.goto('http://localhost:8811/resources/', { waitUntil: 'networkidle' });
await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach(e => e.setAttribute('data-shown','true')));
await p.getByRole('button', { name: 'Get the paper' }).first().click();
await p.fill('#name', 'Test Person');
await p.fill('#email', 'test@example.com');
await p.selectOption('#industry', 'Education');
await p.getByRole('button', { name: /Send and open/ }).click();
await p.waitForTimeout(900);
await p.screenshot({ path: '/tmp/gate-ok.png' });
console.log('released?', await p.getByRole('link', { name: /Download the PDF/ }).isVisible());
console.log('stored:', await p.evaluate(() => localStorage.getItem('dx.paper.identified')));

// --- second paper should not ask again
await p.keyboard.press('Escape');
await p.waitForTimeout(400);
await p.getByRole('button', { name: 'Get the paper' }).nth(2).click();
await p.waitForTimeout(500);
await p.screenshot({ path: '/tmp/gate-remembered.png' });
console.log('remembered?', await p.getByRole('link', { name: /Download the PDF/ }).isVisible());

// --- contact form
await p.goto('http://localhost:8811/contact/', { waitUntil: 'networkidle' });
await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach(e => e.setAttribute('data-shown','true')));
await p.fill('#name', 'Jane Buyer');
await p.fill('#email', 'jane@council.gov.au');
await p.fill('#organisation', 'A Council');
await p.selectOption('#product', 'Governance and Performance');
await p.selectOption('#sector', 'Government and public sector');
await p.fill('#message', 'Our quarterly pack takes a week.');
await p.getByRole('button', { name: /Send this to the team/ }).click();
await p.waitForTimeout(900);
await p.screenshot({ path: '/tmp/contact-ok.png' });
console.log('contact confirmed?', (await p.locator('[role="status"]').innerText()).slice(0,80));
await b.close();
