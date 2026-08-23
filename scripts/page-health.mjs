import { chromium } from "playwright";
import fs from "node:fs";

/**
 * Page health sweep.
 *
 * Loads every built route at a viewport width and reports the defects that are
 * cheap to detect and expensive to find by eye: horizontal overflow, images
 * that never loaded, controls with no accessible name, and console errors.
 *
 * The browser is relaunched every few routes. A single long lived instance
 * in this sandbox dies after a handful of pages, and a crashed browser
 * halfway through a sweep reads as a clean run if it is not handled.
 *
 * Usage: node scripts/page-health.mjs [width] [start] [count]
 */

/** Set CHROMIUM_PATH when Playwright cannot find its own browser. */
const EXEC = process.env.CHROMIUM_PATH;
const BASE = "http://localhost:8811";
const CHUNK = 6;

const routes = JSON.parse(fs.readFileSync("/tmp/routes.json", "utf8"));
const width = Number(process.argv[2] || 1440);
const start = Number(process.argv[3] || 0);
const count = Number(process.argv[4] || routes.length);
const slice = routes.slice(start, start + count);

const problems = [];

async function sweep(batch) {
  const browser = await chromium.launch({ executablePath: EXEC || undefined });
  const page = await browser.newPage({ viewport: { width, height: 900 } });

  for (const route of batch) {
    const errors = [];
    const onConsole = (m) => {
      if (m.type() === "error") errors.push(m.text().slice(0, 140));
    };
    page.on("console", onConsole);

    try {
      await page.goto(BASE + route, { waitUntil: "load", timeout: 12000 });
      await page.evaluate(() => {
        document
          .querySelectorAll("[data-reveal]")
          .forEach((el) => el.setAttribute("data-shown", "true"));
        document
          .querySelectorAll('img[loading="lazy"]')
          .forEach((img) => {
            img.loading = "eager";
          });
      });
      await page.waitForTimeout(260);

      const res = await page.evaluate((vw) => {
        const out = { overflow: 0, offenders: [], badImages: [], unnamed: 0 };
        // Whether the page can actually be scrolled sideways, not whether
        // anything extends past the fold. A wide table inside its own scroll
        // container extends past the viewport by design and reports as
        // overflow on scrollWidth alone, which is a false alarm.
        window.scrollTo(vw, 0);
        const scrolled = window.scrollX;
        window.scrollTo(0, 0);
        out.overflow = scrolled;
        if (out.overflow > 1) {
          for (const el of document.querySelectorAll("main *")) {
            const rect = el.getBoundingClientRect();
            if (rect.right > vw + 1 && rect.width > 8) {
              out.offenders.push(
                `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)} right=${Math.round(rect.right)}`,
              );
              if (out.offenders.length > 2) break;
            }
          }
        }
        for (const img of document.images) {
          if (!img.complete || img.naturalWidth === 0) {
            out.badImages.push(img.getAttribute("src"));
          }
        }
        for (const el of document.querySelectorAll("main a, main button")) {
          const text = (el.innerText || el.getAttribute("aria-label") || "").trim();
          if (!text) out.unnamed += 1;
        }
        return out;
      }, width);

      const bad = [];
      if (res.overflow > 1) {
        bad.push(`overflows by ${res.overflow}px :: ${res.offenders.join(" | ")}`);
      }
      if (res.badImages.length) {
        bad.push(`broken images: ${res.badImages.join(", ")}`);
      }
      if (res.unnamed) bad.push(`${res.unnamed} control with no accessible name`);
      if (errors.length) bad.push(`console: ${errors.join(" / ")}`);
      if (bad.length) problems.push(`[${width}] ${route}\n     ${bad.join("\n     ")}`);
    } catch (error) {
      problems.push(
        `[${width}] ${route}\n     load failed: ${String(error.message).slice(0, 140)}`,
      );
    }

    page.off("console", onConsole);
    process.stdout.write(".");
  }

  await browser.close();
}

for (let i = 0; i < slice.length; i += CHUNK) {
  await sweep(slice.slice(i, i + CHUNK));
}

process.stdout.write("\n");
console.log(
  problems.length
    ? problems.join("\n")
    : `no problems across ${slice.length} routes at ${width}px`,
);
