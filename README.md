# Datanox website

The datanox.io rebuild. Next.js 16, React 19, TypeScript, Tailwind v4, exported as a static site.

---

## Running it on your machine

You need **Node.js 20 or newer**. Check what you have:

```
node --version
```

If that errors or shows anything below 20, install the LTS build from [nodejs.org](https://nodejs.org). On Windows the installer handles everything, including adding Node to your PATH. Open a new terminal afterwards so the change takes effect.

### 1. Unpack

Extract `datanox-source.tar.gz` somewhere sensible, then extract `datanox-assets.tar.gz` **inside the same folder**. The second archive contains `public/og` and `public/papers`, so it has to land alongside the source rather than beside it.

You should end up with:

```
datanox/
  app/  components/  content/  lib/  scripts/
  public/
    og/        34 png files
    papers/    6 pdf files
  package.json
```

If `public/og` is missing the site still runs, but social preview images will 404.

### 2. Install dependencies

```
cd datanox
npm install
```

This takes a couple of minutes the first time and writes a `node_modules` folder of roughly 500 MB. It is not in the archive because it is entirely reproducible from `package.json`.

### 3. Start the dev server

```
npm run dev
```

Then open **http://localhost:3000**.

Edits to any file under `app/`, `components/` or `content/` appear in the browser without a restart. Editing `content/posts/*.md` updates the blog immediately.

Stop the server with `Ctrl` and `C`.

---

## Building the production site

```
npm run build
```

This runs four things in order:

1. `generate-llms.mjs`, which writes `public/llms.txt` from `content/site.ts` and `lib/routes.ts`
2. `next build`, which exports every route as static HTML into `out/`
3. `generate-redirects.mjs`, which writes the redirect config in four formats
4. `guards.mjs`, which fails the build if any of five checks fail

**The build fails on a guard failure.** That is deliberate. The five guards are: no dash characters in visitor facing copy, no `href="#"`, exactly one `h1` per route, no image without alt text, and every internal link resolving to a real route.

To preview the built output rather than the dev server:

```
npx serve out
```

### Optional: regenerating the social cards

```
npx playwright install chromium    # once
npm run assets
```

Only needed if you change a page title or add a route. The 34 existing cards are already in `public/og`.

### The verification report

```
npm run verify
```

Writes `VERIFICATION.md`: every defect the original audit found, measured against the built output rather than asserted.

---

## Where to change things

| What you want to change | File |
|---|---|
| Company facts, founder, platforms | `content/site.ts` |
| A page's URL, label, or nav position | `lib/routes.ts` |
| A blog post | `content/posts/<slug>.md` |
| Colours, type scale, spacing, motion | `app/globals.css` |
| A redirect | `content/redirects.ts` |
| The form endpoint | `components/page/contact-form.tsx` |
| An infographic | `components/figures/` |
| Page copy | the page's own file under `app/` |

**Adding a page** means adding an entry to `lib/routes.ts` and a folder under `app/`. The sitemap, navigation, breadcrumbs and internal link checking all follow from that one entry, which is what stops a canonical and a sitemap drifting apart.

---

## Two writing rules the build enforces

**No dash characters in anything a visitor reads.** No hyphens, en dashes or em dashes. Write *no code*, *drag and drop*, *not for profit*, *end to end*. Kebab case in URLs and CSS is fine, because that is code rather than prose. The guard checks the rendered HTML, so it never confuses a class name for a sentence.

**The `h1` comes from the template, never from the markdown.** A blog post's title lives in frontmatter and the template renders it. That is why it is impossible to publish a post without an `h1`, which was the state of eleven of the twelve posts on the WordPress site.

---

## Deploying

See `CUTOVER.md`. The short version: `out/` is the entire site and can go on any static host. The redirects matter more than the deploy, so read that section twice.
