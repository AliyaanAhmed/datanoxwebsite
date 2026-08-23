import Link from "next/link";
import type { Route } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  Action,
  ArrowRight,
  Band,
  Container,
  Eyebrow,
  Lead,
} from "@/components/ui/primitives";
import { IconChip, type IconName } from "@/components/ui/icons";
import { href, routes, type RouteKey } from "@/lib/routes";

/**
 * The 404.
 *
 * An empty screen is an invitation to act, so this one lists the six places
 * people actually arrive looking for. Several URLs on the old site changed
 * slug, and anything the redirect map misses lands here rather than nowhere.
 */

const suggestions: { key: RouteKey; blurb: string; icon: IconName }[] = [
  { key: "governance", blurb: "Budgeting, KPI reporting and maturity assessment", icon: "budget" },
  { key: "intelliForm", blurb: "Forms that write straight into Dataverse", icon: "drag" },
  { key: "intelliAssessment", blurb: "Rubrics, evaluation and outcomes", icon: "rubric" },
  { key: "insurance", blurb: "InsureOS and BrokerOS", icon: "shield" },
  { key: "blog", blurb: "Writing on governance, forms and decisions", icon: "book" },
  { key: "contact", blurb: "Talk to the people who build it", icon: "handshake" },
];

export default function NotFound() {
  return (
    <Band tone="canvas" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-16%] top-[-26%] hidden h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,var(--color-o-100)_0%,var(--color-o-50)_46%,transparent_68%)] opacity-75 lg:block"
      />
      <Container wide className="relative">
        <div className="grid gap-12 py-band lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Page not found</Eyebrow>
            </Reveal>
            <Reveal as="h1" mask delay={90} className="mt-6 text-d1">
              <span>
                <span>That page has</span>
              </span>
              <span>
                <span>moved or never</span>
              </span>
              <span>
                <span>existed.</span>
              </span>
            </Reveal>
            <Reveal delay={320} className="mt-6">
              <Lead>
                Several addresses on the previous version of this site changed
                when it was rebuilt. Most of them redirect. If you followed a
                link and landed here, one of these is probably what you wanted.
              </Lead>
            </Reveal>
            <Reveal delay={420} className="mt-8">
              <Action href="/">Back to the homepage</Action>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {suggestions.map((item) => (
                <li key={item.key}>
                  <Link
                    href={href(item.key) as Route}
                    className="group flex h-full items-start gap-3.5 rounded-lg bg-surface p-5 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] hover:ring-o-200"
                  >
                    <IconChip name={item.icon} size="sm" />
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 font-display text-[0.9375rem] font-semibold text-ink">
                        {routes[item.key].label}
                        <ArrowRight className="text-o-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                      <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                        {item.blurb}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Band>
  );
}
