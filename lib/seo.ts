import type { Metadata } from "next";
import { SITE_URL, site } from "@/content/site";

export const OG_IMAGE_DEFAULT = "/og/default.png";

/**
 * Resolves a route to its own Open Graph card.
 *
 * Derived from the path rather than passed per page, so adding a route cannot
 * silently fall back to the generic card. scripts/generate-og.mjs writes one
 * file per entry here plus one per blog post.
 */
const OG_BY_PATH: Record<string, string> = {
  "/": "home",
  "/services/": "services",
  "/services/dynamics-365/": "services-dynamics-365",
  "/services/power-platform/": "services-power-platform",
  "/services/ai-and-copilot/": "services-ai-and-copilot",
  "/services/cloud-migration/": "services-cloud-migration",
  "/staff-augmentation/": "staff-augmentation",
  "/governance-performance/": "governance-performance",
  "/intelli-form/": "intelli-form",
  "/intelli-assessment/": "intelli-assessment",
  "/insurance-brokers-management-system/": "insurance",
  "/insurance-brokers-management-system/insureos/": "insureos",
  "/insurance-brokers-management-system/brokeros/": "brokeros",
  "/government/": "government",
  "/financial-services/": "financial-services",
  "/not-for-profit/": "not-for-profit",
  "/education/": "education",
  "/company/": "company",
  "/clients/": "clients",
  "/partners/": "partners",
  "/contact/": "contact",
  "/compare/power-pages-vs-jotform-formstack-kissflow/": "compare",
  "/resources/": "resources",
  "/case-studies/": "case-studies",
  "/blog/": "blog",
  "/privacy/": "privacy",
  "/terms/": "terms",
  "/qrlandingpage/": "qrlandingpage",
  "/case-studies/community-work-australia/": "case-community-work-australia",
};

export function ogImageFor(path: string): string {
  const named = OG_BY_PATH[path];
  if (named) return `/og/${named}.png`;

  const post = path.match(/^\/blog\/([^/]+)\/$/);
  if (post) return `/og/blog-${post[1]}.png`;

  return OG_IMAGE_DEFAULT;
}

type PageSeo = {
  title: string;
  description: string;
  /** Path with leading and trailing slash, for example "/intelli-form/". */
  path: string;
  ogImage?: string;
  /** Utility pages that should stay out of the index. */
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Single factory for page metadata.
 *
 * Canonical URLs are derived from the route path rather than typed by hand,
 * which is the mechanism that stops a canonical and a sitemap entry from
 * disagreeing the way they did on the WordPress site.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  noindex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage ?? ogImageFor(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630, alt: title }],
      locale: "en",
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${image}`],
    },
  };
}
