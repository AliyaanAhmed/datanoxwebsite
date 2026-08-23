# Cutover runbook

Moving datanox.io from WordPress to this static build. Written to be followed in order. The risky part is not the deploy, it is the redirects, so that section comes first and is checked twice.

---

## Before anything

**Confirm these facts.** Each one is currently absent from the site because it was never verified, and each one has a single place to change.

| Fact | Where it goes | Status |
|---|---|---|
| Founding year | `content/site.ts` → `unconfirmed.foundingDate` | Not confirmed, rendered nowhere |
| Headquarters | `content/site.ts` → `unconfirmed.headquarters` | Not confirmed, rendered nowhere |
| Additional office | `content/site.ts` → `unconfirmed.additionalOffice` | Not confirmed, rendered nowhere |
| Company LinkedIn | `content/site.ts` → `unconfirmed.companyLinkedIn` | Not confirmed, absent from `sameAs` |
| Microsoft partner tier | `content/site.ts` → `unconfirmed.microsoftPartnerTier` | Confirmed, held back on instruction |
| Engineering hub location | `content/site.ts` → `unconfirmed.engineeringHub` | Confirmed, held back on instruction |
| Contact email address | `content/site.ts` → `unconfirmed.contactEmail` | **Needed.** Both forms fall back to "try again" without it |
| UNSW, University of Melbourne, Melbourne Business School | `app/education/page.tsx` | Confirmed 21 August 2026, now named on the page |

Moving a value out of `unconfirmed` and into the main object publishes it to the Organization schema, `llms.txt`, the footer and the relevant page copy in one commit.

**Point the forms somewhere.** Both the enquiry form and the white paper gate post to a Power Automate flow. Build the flow, then put its URL in `NEXT_PUBLIC_LEAD_ENDPOINT`. The full setup, including the Response action headers the forms depend on, is in `LEAD-CAPTURE.md`.

Until that is done the site still builds and deploys. Both forms simply tell a visitor the submission failed, which is the correct behaviour and better than a confirmation that is not true.

---

## 1. Build

```
npm install
npm run assets      # regenerates the 43 Open Graph cards, needs Chromium
npm run build       # llms.txt, next build, redirects, then the guards
npm run verify      # writes VERIFICATION.md
```

`npm run build` fails if any guard fails. The guards are not advisory.

Output lands in `out/`. That directory is the whole site.

---

## 2. Redirects, the part that protects your rankings

27 permanent redirects are generated from `content/redirects.ts` into four formats. Use the one your host wants.

| Host | File | Location |
|---|---|---|
| Netlify, Cloudflare Pages | `_redirects` | `out/_redirects` |
| Vercel | `vercel.json` | repo root |
| Apache, which datanox.io runs today | `.htaccess` | `out/.htaccess`, and `.htaccess.example` at the root |
| Human readable | `REDIRECTS.md` | repo root |

**The four that matter most**, because each one currently points the wrong way:

| From | To | Why |
|---|---|---|
| `/governance-performancee/` | `/governance-performance/` | The live canonical has a typo and the clean URL redirects into it. This reverses that. |
| `/company-2/` | `/company/` | WordPress duplicate slug artifact, currently canonical. |
| `/category/blog/` | `/blog/` | Carries 48 internal links today and appears in no sitemap. |
| Twelve post URLs at the root | `/blog/<slug>/` | Slugs preserved, so each URL stays recognisable. |

**Verify before switching DNS.** Deploy to a preview URL first and run:

```
for u in /governance-performancee/ /company-2/ /category/blog/ /highlights/ \
         /insurance/ /home/ /kpi-reporting-software-power-bi/ ; do
  curl -sS -o /dev/null -w "%{http_code}  %{redirect_url}  <- $u\n" "https://PREVIEW$u"
done
```

Every line must read `301`. A `200` means the redirect is not firing and that URL will lose its ranking.

---

## 3. Security headers

The live site sends none of the four standard headers. The generated `vercel.json` and `.htaccess` both set HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy`. If you deploy somewhere else, copy them across. Check with:

```
curl -sSI https://datanox.io/ | grep -iE "strict-transport|x-content-type|x-frame|referrer-policy"
```

---

## 4. Analytics

The existing Google Tag `GT-5MXXWKLR` carries over in `content/site.ts`, so measurement history is preserved. It loads after first paint rather than in the head.

Named events now fire: `cta_click`, `form_start`, `form_submit_demo` with product, sector and role, `paper_download`, `compare_view_click` and `scroll_depth`. Mark `form_submit_demo` as a key event in GA4 Admin so it appears as a conversion.

Worth doing at the same time: in GA4, enable the AI Assistants channel group, and add a manual segment for `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com` and `gemini.google.com`. That is how you will see whether the GEO work is producing citations.

---

## 5. Search Console, on the day

1. Verify the property if it is not already. The audit found it was never connected.
2. Submit `https://datanox.io/sitemap.xml`. Note the direction change: Rank Math served the index at `sitemap_index.xml` and redirected `/sitemap.xml` into it. This build does the reverse, and the redirect map handles the old address.
3. Use URL Inspection on `/governance-performance/` and `/company/` to confirm the corrected slugs are the canonical.
4. Watch Coverage for 48 to 72 hours. Expect a temporary dip as the redirects are processed. That is normal and recovers.

---

## 6. What to keep from the old site

- The six white papers are in `public/papers/`, renamed from *White Pager* and recompressed from 37 MB to 20 MB.
- Nothing else on the WordPress install is referenced by this build. The `wp-content` upload directory can stay in place during a transition period without affecting anything.

---

## 7. After cutover

Run `npm run verify` against the deployed site by pointing `OUT` at a fresh crawl, or simply re-run it on `out/` before each deploy. `VERIFICATION.md` is regenerated each time and is the record that the defects found in the audit are still fixed.

Spot check the things that were broken:

```
curl -sS https://datanox.io/llms.txt | head -5
curl -sS https://datanox.io/robots.txt
curl -sSI https://datanox.io/ | grep -i content-type
```

---

## Where things live

| What | Where |
|---|---|
| Company facts, one source | `content/site.ts` |
| Routes, nav, sitemap | `lib/routes.ts` |
| Redirect map | `content/redirects.ts` |
| Blog posts | `content/posts/*.md` |
| Structured data builders | `lib/schema.ts` |
| Metadata and OG resolution | `lib/seo.ts` |
| Design tokens | `app/globals.css` |
| Infographics | `components/figures/` |
| Build guards | `scripts/guards.mjs` |

Adding a page means adding a route to `lib/routes.ts` and a directory under `app/`. The sitemap, navigation and breadcrumbs follow automatically, which is the mechanism that stopped the canonical and the sitemap drifting apart on the old site.
