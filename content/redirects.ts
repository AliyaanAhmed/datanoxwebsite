/**
 * The cutover redirect map.
 *
 * Every URL the live WordPress site currently serves that will not exist at
 * the same address after cutover. Losing these loses the ranking and the
 * inbound links attached to them, so this is the single highest risk part of
 * the migration and the reason it is expressed as data rather than as prose
 * in a runbook.
 *
 * scripts/generate-redirects.mjs turns this into the config file each host
 * expects. Nothing is hand typed twice.
 *
 * Status is 301 throughout. These are permanent moves, and a 302 would leave
 * the old URL indexed.
 */

export type Redirect = {
  from: string;
  to: string;
  /** Why this exists, so a future reader does not delete it as clutter. */
  reason: string;
};

export const redirects: Redirect[] = [
  /* ---- Slug corrections, the highest value entries ------------------- */
  {
    from: "/governance-performancee/",
    to: "/governance-performance/",
    reason:
      "The live canonical URL has a typo, three letter e endings, and the clean URL currently redirects into it. This reverses that.",
  },
  {
    from: "/company-2/",
    to: "/company/",
    reason:
      "WordPress duplicate slug artifact. The live canonical is company-2 and /company/ redirects into it.",
  },

  /* ---- Already correct on the live site, preserved ------------------- */
  {
    from: "/insurance/",
    to: "/insurance-brokers-management-system/",
    reason: "Already redirects correctly on the live site. Keep it.",
  },
  {
    from: "/home/",
    to: "/",
    reason: "Duplicate homepage, already redirected on the live site. Keep it.",
  },

  /* ---- Content hub consolidation, four indexes into one -------------- */
  {
    from: "/category/blog/",
    to: "/blog/",
    reason:
      "The de facto content hub on the live site, carrying 48 internal links but absent from every sitemap.",
  },
  {
    from: "/highlights/",
    to: "/blog/",
    reason:
      "In the live sitemap but linked from nowhere. Consolidated into the single hub.",
  },
  {
    from: "/rs_elements/blogs-tab/",
    to: "/blog/",
    reason:
      "Elementor template that /blog/ currently redirects into. Publicly indexable with placeholder title and meta.",
  },
  {
    from: "/rs_elements/all-bogs-tab/",
    to: "/blog/",
    reason: "Elementor template, indexable, and the slug misspells blogs.",
  },
  {
    from: "/rs_elements/blogs-tab-highlights-page/",
    to: "/blog/",
    reason: "Elementor template, indexable.",
  },
  {
    from: "/rs_elements/all-bogs-tab-highlights-page/",
    to: "/blog/",
    reason: "Elementor template, indexable, and the slug misspells blogs.",
  },
  {
    from: "/rs_elements/news-tab/",
    to: "/blog/",
    reason: "Elementor template, indexable.",
  },
  {
    from: "/rs_elements/case-study-blogs/",
    to: "/case-studies/",
    reason: "Elementor template, indexable. Closest real destination.",
  },

  /* ---- Broken today ------------------------------------------------- */
  {
    from: "/why-organizations-needs-a-business-rules-repository/",
    to: "/blog/",
    reason:
      "Returns 404 on the live site but is linked from three pages. Sending it to the hub is better than leaving the 404.",
  },

  /* ---- Blog posts move under /blog/ ---------------------------------- */
  ...[
    "no-code-enterprise-forms-that-actually-scale",
    "what-maturity-index-tracking-software-should-do",
    "the-missing-link-in-ms-dynamics365-case-management",
    "kpi-reporting-software-power-bi",
    "enterprise-planning-app-microsoft",
    "power-platform-budgeting-software-that-fits",
    "how-dynamics-365-power-platform-and-ai-fit-together",
    "businesses-dont-lack-data-they-lack-decision-structure",
    "from-human-judgement-to-machine-assisted-decisions-where-ai-actually-fits",
    "ismail-lahore-event",
    "ismail-a-short-documentary",
    "datanox-annual-event-karachi",
  ].map((slug) => ({
    from: `/${slug}/`,
    to: `/blog/${slug}/`,
    reason:
      "Posts sit at the site root on WordPress and move under /blog/. The slug is preserved so the URL stays recognisable.",
  })),

  /* ---- WordPress plumbing that should stop resolving ----------------- */
  {
    from: "/feed/",
    to: "/blog/",
    reason: "WordPress RSS endpoint with no equivalent on a static site.",
  },
  {
    from: "/sitemap_index.xml",
    to: "/sitemap.xml",
    reason:
      "Rank Math serves the index at sitemap_index.xml and redirects /sitemap.xml into it. Next generates /sitemap.xml, so this reverses the direction.",
  },
];
