import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";

import { Logo } from "@/components/brand/logo";
import { Reveal } from "@/components/ui/reveal";
import { Action, ArrowRight, Band, Container } from "@/components/ui/primitives";
import { IconChip, type IconName } from "@/components/ui/icons";
import { href, routes, type RouteKey } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

const PATH = "/qrlandingpage/";

/**
 * The QR campaign landing page. Noindex, because a campaign page scanned from
 * printed material should not compete for organic index space or surface an
 * unbranded URL in search results. On the live site it is publicly indexable,
 * has no h1 at all, and every one of its twenty images is missing alt text.
 */
export const metadata: Metadata = pageMetadata({
  title: "Datanox",
  description: "Everything from the card you just scanned, in one place.",
  path: PATH,
  noindex: true,
});

const links: { key: RouteKey; blurb: string; icon: IconName }[] = [
  { key: "governance", blurb: "Budgeting, KPI reporting and maturity assessment", icon: "budget" },
  { key: "intelliForm", blurb: "Forms that write straight into Dataverse", icon: "drag" },
  { key: "intelliAssessment", blurb: "Rubrics, evaluation and outcomes", icon: "rubric" },
  { key: "insurance", blurb: "InsureOS and BrokerOS", icon: "shield" },
  { key: "resources", blurb: "Six white papers, no form in front of them", icon: "book" },
  { key: "contact", blurb: "Pick up where the conversation left off", icon: "handshake" },
];

export default function QrLandingPage() {
  return (
    <Band tone="canvas" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-o-100)_0%,var(--color-o-50)_46%,transparent_68%)] opacity-80"
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-[36rem] flex-col items-center py-16 text-center lg:py-24">
          <Reveal>
            <Logo className="h-6 w-auto text-ink" />
          </Reveal>
          <Reveal as="h1" delay={90} className="mt-9 text-d2">
            Everything from the card you just scanned
          </Reveal>
          <Reveal delay={200} className="mt-5">
            <p className="text-lead">{site.shortDefinition}</p>
          </Reveal>

          <Reveal delay={280} className="mt-10 w-full">
            <ul className="flex w-full flex-col gap-3">
              {links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={href(link.key) as Route}
                    className="group flex items-center gap-4 rounded-lg bg-surface p-4 text-left shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] hover:ring-o-200"
                  >
                    <IconChip name={link.icon} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[1rem] font-semibold text-ink">
                        {routes[link.key].label}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">
                        {link.blurb}
                      </span>
                    </span>
                    <ArrowRight className="text-o-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={360} className="mt-9 w-full">
            <Action href={href("contact")} className="w-full">
              Book a demo
            </Action>
          </Reveal>
        </div>
      </Container>
    </Band>
  );
}
