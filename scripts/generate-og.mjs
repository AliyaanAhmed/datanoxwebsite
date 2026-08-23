/**
 * Generates one Open Graph image per route into public/og.
 *
 * Rendered from an SVG template in the site's own palette and typefaces, so a
 * shared link looks like the site rather than like a generic card. The live
 * site reuses one truncated description across every page's og:description
 * and has no og:image at all, so every share and every AI preview looks the
 * same and reads as broken.
 *
 * Runs before next build. Uses the Chromium already present for Playwright,
 * so there is no extra image dependency in the project.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const ROOT = process.cwd();
const OUT = join(ROOT, "public", "og");
mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 630;

/* ------------------------------------------------------------------ */
/* Fonts, inlined once                                                 */
/*                                                                     */
/* Fetching Google Fonts per card is slow and makes the build depend on */
/* a network round trip for every image. The two faces are fetched once */
/* and embedded as data URLs, so rendering is offline after this.       */
/* ------------------------------------------------------------------ */

const FONT_CACHE = join(ROOT, "node_modules", ".cache", "og-fonts");
mkdirSync(FONT_CACHE, { recursive: true });

async function fontDataUrl(cssUrl, cacheName) {
  const cached = join(FONT_CACHE, cacheName);
  if (existsSync(cached)) {
    return `data:font/woff2;base64,${readFileSync(cached).toString("base64")}`;
  }
  const css = await fetch(cssUrl, {
    headers: {
      // asking as a modern browser gets woff2 rather than ttf
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    },
  }).then((r) => r.text());
  const url = (css.match(/url\((https:[^)]+\.woff2)\)/) || [])[1];
  if (!url) throw new Error(`No woff2 found for ${cacheName}`);
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  writeFileSync(cached, buf);
  return `data:font/woff2;base64,${buf.toString("base64")}`;
}

const displayFont = await fontDataUrl(
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&display=block",
  "jakarta.woff2",
);
const monoFont = await fontDataUrl(
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=block",
  "plexmono.woff2",
);

/* ------------------------------------------------------------------ */
/* What to generate                                                    */
/* ------------------------------------------------------------------ */

const routesSrc = readFileSync(join(ROOT, "lib", "routes.ts"), "utf8");
const routes = {};
for (const m of routesSrc.matchAll(
  /(\w+):\s*\{\s*\n?\s*path:\s*"([^"]+)",\s*\n?\s*label:\s*"([^"]+)"/g,
)) {
  routes[m[1]] = { path: m[2], label: m[3] };
}

const cards = [
  { file: "default", eyebrow: "Microsoft business applications", title: "Excellence in Microsoft business applications." },
  { file: "home", eyebrow: "Microsoft business applications", title: "Excellence in Microsoft business applications." },
  { file: "privacy", eyebrow: "Legal", title: "Privacy notice" },
  { file: "terms", eyebrow: "Legal", title: "Terms of use" },
  { file: "qrlandingpage", eyebrow: "Datanox", title: "Everything from the card you just scanned" },
  { file: "case-community-work-australia", eyebrow: "Case study", title: "Assessment that holds up across intake periods." },
  { file: "not-found", eyebrow: "Page not found", title: "That page has moved or never existed." },
  { file: "governance-performance", eyebrow: "Governance and Performance", title: "Budget, report and score, in one model." },
  { file: "intelli-form", eyebrow: "Intelli Form", title: "Forms that write straight into Dataverse." },
  { file: "intelli-assessment", eyebrow: "Intelli Assessment", title: "Scoring two evaluators can agree on." },
  { file: "insurance", eyebrow: "Insurance platform", title: "Everyone has a system. Nothing is connected." },
  { file: "insureos", eyebrow: "InsureOS, for insurers", title: "Say yes to an API request instantly." },
  { file: "brokeros", eyebrow: "BrokerOS, for brokers", title: "Quote in minutes, not days." },
  { file: "not-for-profit", eyebrow: "Not for Profit, Australia", title: "Prove the impact, not just the donation." },
  { file: "education", eyebrow: "Education", title: "Used by UNSW and the University of Melbourne." },
  { file: "company", eyebrow: "Our story", title: "We did not start with a product." },
  { file: "partners", eyebrow: "Partner network", title: "We build the engine. Partners drive the car." },
  { file: "contact", eyebrow: "Book a demo", title: "Show us one real process." },
  { file: "compare", eyebrow: "Comparison", title: "Power Pages against the standalone form tools." },
  { file: "resources", eyebrow: "White papers", title: "Read it before you talk to anyone." },
  { file: "case-studies", eyebrow: "Case studies", title: "Named organisations. Stated outcomes." },
  { file: "blog", eyebrow: "Writing", title: "Longer answers than a product page allows." },
  { file: "services", eyebrow: "Services", title: "Microsoft business applications, designed and delivered." },
  { file: "staff-augmentation", eyebrow: "Staff augmentation", title: "You are not hiring a contractor." },
  { file: "services-dynamics-365", eyebrow: "Dynamics 365", title: "Configured, extended, and made to fit." },
  { file: "services-power-platform", eyebrow: "Power Platform", title: "We build our own products on it." },
  { file: "services-ai-and-copilot", eyebrow: "AI and Copilot", title: "It advises. It never decides." },
  { file: "services-cloud-migration", eyebrow: "Cloud migration", title: "Know what is in the estate before it moves." },
  { file: "clients", eyebrow: "Clients", title: "Look for an organisation that resembles yours." },
  { file: "government", eyebrow: "Government and public sector", title: "Explain how the number was reached." },
  { file: "financial-services", eyebrow: "Financial services and insurance", title: "Regulated work, and a record that holds up later." },
];

/** One card per blog post, from the markdown frontmatter. */
const postsDir = join(ROOT, "content", "posts");
if (existsSync(postsDir)) {
  for (const f of readdirSync(postsDir).filter((n) => n.endsWith(".md"))) {
    const src = readFileSync(join(postsDir, f), "utf8");
    const title = (src.match(/^title: "(.*)"$/m) || [])[1];
    const category = (src.match(/^category: "(.*)"$/m) || [])[1] || "Blog";
    if (title) {
      cards.push({
        file: `blog-${f.replace(/\.md$/, "")}`,
        eyebrow: category,
        title,
      });
    }
  }
}

/* ------------------------------------------------------------------ */
/* The template                                                        */
/* ------------------------------------------------------------------ */

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function card({ eyebrow, title }) {
  return `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face { font-family:'Display'; src:url('${displayFont}') format('woff2'); font-weight:100 900; font-display:block; }
  @font-face { font-family:'Mono'; src:url('${monoFont}') format('woff2'); font-weight:100 900; font-display:block; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:${W}px; height:${H}px; position:relative; overflow:hidden;
    background:#FFFDFB; font-family:'Display',sans-serif;
    display:flex; flex-direction:column; justify-content:space-between;
    padding:72px 76px;
  }
  .glow {
    position:absolute; right:-180px; top:-220px; width:760px; height:760px;
    border-radius:999px;
    background:radial-gradient(circle,#FFE8D2 0%,#FFF6EC 46%,transparent 68%);
  }
  .rule { position:absolute; left:0; top:0; width:100%; height:10px;
    background:linear-gradient(90deg,#F0991E,#F56B1F); }
  .top { position:relative; display:flex; align-items:center; gap:18px; }
  .mark { height:30px; }
  .eyebrow {
    position:relative; font-family:'Mono',monospace; font-size:19px;
    font-weight:500; letter-spacing:0.14em; text-transform:uppercase;
    color:#E2560F;
  }
  h1 {
    position:relative; font-size:${title.length > 46 ? 66 : 78}px;
    line-height:1.02; letter-spacing:-0.032em; font-weight:650;
    color:#1C1A17; max-width:20ch;
  }
  .foot { position:relative; display:flex; align-items:center;
    justify-content:space-between; }
  .foot span { font-family:'Mono',monospace; font-size:19px;
    letter-spacing:0.1em; text-transform:uppercase; color:#8B8378; }
  .dots { display:flex; gap:9px; }
  .dot { width:11px; height:11px; border-radius:3px; background:#FFD0A6; }
  .dot:last-child { background:linear-gradient(135deg,#F0991E,#F56B1F); }
</style></head>
<body>
  <div class="rule"></div><div class="glow"></div>
  <div class="top">
    <svg class="mark" viewBox="0 0 120 24" fill="none">
      <path fill="#F56B1F" d="M17.11 23.72 17.1 0l-4.18 2.53v5.81a6.3 6.3 0 0 0-2.42-1.64 8.2 8.2 0 0 0-.56-.19 7.2 7.2 0 0 0-4.26 0c-.33.1-.6.21-.83.3a7.4 7.4 0 0 0-1.74 1.02A6.1 6.1 0 0 0 1.33 9.96 8.8 8.8 0 0 0 .03 14.33a11 11 0 0 0 .5 4.02 7.4 7.4 0 0 0 3.5 4.2 8 8 0 0 0 3.83.93c1.5.02 2.77-.36 3.7-.78a8.6 8.6 0 0 0 1.36-.78v1.8h4.2ZM8.6 19.9a4.98 4.98 0 1 1 0-9.96 4.98 4.98 0 0 1 0 9.96Z"/>
      <text x="24" y="19" font-family="Display" font-size="21" font-weight="700" fill="#1C1A17">datanox</text>
    </svg>
    <span class="eyebrow">${escape(eyebrow)}</span>
  </div>
  <h1>${escape(title)}</h1>
  <div class="foot">
    <span>datanox.io</span>
    <div class="dots"><i class="dot"></i><i class="dot"></i><i class="dot"></i></div>
  </div>
</body></html>`;
}

/* ------------------------------------------------------------------ */

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const context = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

for (const c of cards) {
  await page.setContent(card(c), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(120);
  await page.screenshot({ path: join(OUT, `${c.file}.png`), type: "png" });
}

await browser.close();
console.log(`og images written: ${cards.length}`);
