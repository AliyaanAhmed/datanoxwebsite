import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { routes } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  const utility = Object.values(routes)
    .filter((route) => route.utility)
    .map((route) => route.path);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: utility,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

export const dynamic = "force-static";
