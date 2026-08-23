import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { routes } from "@/lib/routes";
import { getAllPosts } from "@/lib/posts";

/**
 * Generated from the route registry, not maintained by hand.
 *
 * This is the mechanism that makes a canonical and a sitemap entry unable to
 * disagree. On the WordPress site they drifted far enough apart that the
 * flagship product page ended up canonical at a URL with a typo in it.
 * Utility pages are excluded here and marked noindex in their metadata.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = Object.values(routes)
    .filter((route) => !route.utility)
    .map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency ?? ("monthly" as const),
      priority: route.priority ?? 0.5,
    }));

  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(`${post.updated}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}

export const dynamic = "force-static";
