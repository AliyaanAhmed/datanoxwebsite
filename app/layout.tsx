import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { RevealScript } from "@/components/ui/reveal";
import { Analytics } from "@/components/chrome/analytics";
import { SITE_URL, site } from "@/content/site";
import { graph, organization, website } from "@/lib/schema";

/**
 * Three faces, three roles.
 *
 * Plus Jakarta Sans carries the display voice. It replaced Bricolage
 * Grotesque, which had real character but read as editorial rather than
 * enterprise: the buyers here are government procurement leads, university
 * registrars and insurance operations directors, and the headline face has
 * to look like a company they can put on a tender document. Jakarta is
 * geometric and confident with a slight warmth in the round letterforms,
 * which keeps it from going cold against the orange palette.
 *
 * Inter Tight stays as the body face, which preserves continuity with the
 * existing brand. IBM Plex Mono handles eyebrows, labels and data.
 * All self hosted, so there is no render blocking request and no layout shift.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  // Variable across 200 to 800, so the weight axis is continuous and the
  // display scale can sit at 620 without snapping to a static cut.
  variable: "--font-jakarta",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFFDFB",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Retired the Dataverse tagline in August 2026, then this line in turn,
    // because "partner" describes a status and not what anybody buys.
    default: `${site.name} | Enterprise Apps for the Microsoft Ecosystem`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDefinition,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, address: false, email: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${interTight.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Organization and WebSite ship once, sitewide, from typed builders.
            Nothing is inherited from a plugin, so the homepage cannot end up
            typed as an Article authored by a Person called admin. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: graph(organization(), website()) }}
        />
        {/* Without JavaScript every revealed element renders in place, so the
            page is fully readable rather than blank. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}
[data-spine-line]{transform:scaleY(1)!important}
[data-spine-node]{transform:scaleX(1)!important}
[data-spine-node]::before{opacity:1!important}
.reveal-mask > span > span{transform:none!important}
[data-converge] [data-node]{opacity:1!important;transform:none!important}
[data-converge] [data-stub],[data-converge] [data-drop],[data-converge] [data-mobile-rail]{transform:scaleY(1)!important}
[data-converge] [data-rail]{transform:scaleX(1)!important}
[data-converge] [data-rail]::after{opacity:1!important}`}</style>
        </noscript>
        <RevealScript />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-flame focus:px-4 focus:py-2.5 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
