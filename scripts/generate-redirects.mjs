/**
 * Turns content/redirects.ts into the config each host expects.
 *
 * Writes all four so the cutover does not depend on which host is chosen, and
 * so nothing is hand typed twice. Output lands in out/ alongside the built
 * site, except .htaccess which also lands at the repo root for reference.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const src = readFileSync(join(ROOT, "content", "redirects.ts"), "utf8");

/* Parse the literal entries. */
const entries = [];
for (const m of src.matchAll(
  /\{\s*from:\s*"([^"]+)",\s*to:\s*"([^"]+)",/g,
)) {
  entries.push({ from: m[1], to: m[2] });
}

/* Expand the blog slug list. */
const slugBlock = src.match(/\.\.\.\[([\s\S]*?)\]\.map/);
if (slugBlock) {
  for (const m of slugBlock[1].matchAll(/"([^"]+)"/g)) {
    entries.push({ from: `/${m[1]}/`, to: `/blog/${m[1]}/` });
  }
}

const seen = new Set();
const redirects = entries.filter((r) => {
  if (seen.has(r.from)) return false;
  seen.add(r.from);
  return true;
});

const OUT = join(ROOT, "out");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const stamp = "# Generated from content/redirects.ts. Do not edit by hand.";

/* ---- Netlify and Cloudflare Pages ---------------------------------- */
writeFileSync(
  join(OUT, "_redirects"),
  [stamp, ...redirects.map((r) => `${r.from}  ${r.to}  301!`), ""].join("\n"),
);

/* ---- Vercel --------------------------------------------------------- */
writeFileSync(
  join(ROOT, "vercel.json"),
  JSON.stringify(
    {
      $schema: "https://openapi.vercel.sh/vercel.json",
      cleanUrls: true,
      trailingSlash: true,
      redirects: redirects.map((r) => ({
        source: r.from.replace(/\/$/, ""),
        destination: r.to,
        permanent: true,
      })),
      headers: [
        {
          source: "/(.*)",
          headers: [
            { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "SAMEORIGIN" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ],
        },
        {
          source: "/_next/static/(.*)",
          headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        },
      ],
    },
    null,
    2,
  ) + "\n",
);

/* ---- Apache, which is what datanox.io runs today -------------------- */
const htaccess = [
  stamp,
  "",
  "# Security headers. The live site currently sends none of these.",
  "<IfModule mod_headers.c>",
  '  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"',
  '  Header always set X-Content-Type-Options "nosniff"',
  '  Header always set X-Frame-Options "SAMEORIGIN"',
  '  Header always set Referrer-Policy "strict-origin-when-cross-origin"',
  '  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"',
  "</IfModule>",
  "",
  "<IfModule mod_expires.c>",
  "  ExpiresActive On",
  '  ExpiresByType image/png "access plus 1 year"',
  '  ExpiresByType font/woff2 "access plus 1 year"',
  '  ExpiresByType text/css "access plus 1 year"',
  '  ExpiresByType application/javascript "access plus 1 year"',
  "</IfModule>",
  "",
  "<IfModule mod_rewrite.c>",
  "  RewriteEngine On",
  "",
  ...redirects.flatMap((r) => [
    `  RewriteRule ^${r.from.replace(/^\//, "").replace(/\/$/, "")}/?$ ${r.to} [R=301,L]`,
  ]),
  "</IfModule>",
  "",
];
writeFileSync(join(ROOT, ".htaccess.example"), htaccess.join("\n"));
writeFileSync(join(OUT, ".htaccess"), htaccess.join("\n"));

/* ---- A readable table for the runbook -------------------------------- */
const table = [
  "| From | To |",
  "|---|---|",
  ...redirects.map((r) => `| \`${r.from}\` | \`${r.to}\` |`),
  "",
];
writeFileSync(join(ROOT, "REDIRECTS.md"), [
  "# Redirect map",
  "",
  `Generated from \`content/redirects.ts\`. ${redirects.length} permanent redirects.`,
  "",
  ...table,
].join("\n"));

console.log(`redirects written: ${redirects.length} entries, 4 formats`);
