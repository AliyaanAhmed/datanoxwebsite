import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export. Every route is emitted as fully rendered HTML so that
  // titles, meta, headings, copy and JSON-LD are present in the raw document
  // for every crawler, including the AI crawlers that do not execute JS.
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimisation does not run in a static export. Assets are
    // optimised at build time instead and served through <picture>.
    unoptimized: true,
  },
  typedRoutes: true,
};

export default nextConfig;
