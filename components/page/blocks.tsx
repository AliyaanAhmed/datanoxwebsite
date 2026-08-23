import Link from "next/link";
import type { ReactNode } from "react";
import type { Route } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  Action,
  ArrowRight,
  Band,
  Card,
  Container,
  Eyebrow,
  Lead,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { href, routes, type RouteKey } from "@/lib/routes";
import { IconChip, type IconName } from "@/components/ui/icons";
import { SITE_URL } from "@/content/site";

/* ==========================================================================
   Breadcrumbs
   ========================================================================== */

export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-muted">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink-2">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path as Route}
                  className="transition-colors hover:text-o-700"
                >
                  {crumb.name}
                </Link>
              )}
              {last ? null : (
                <span aria-hidden="true" className="text-rule-strong">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ==========================================================================
   Page hero
   ========================================================================== */

export function PageHero({
  eyebrow,
  title,
  lead,
  figure,
  trail,
  primaryCta = { label: "Book a demo", key: "contact" as RouteKey },
  secondaryCta,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  figure?: ReactNode;
  trail: { name: string; path: string }[];
  primaryCta?: { label: string; key: RouteKey };
  secondaryCta?: { label: string; key: RouteKey };
  meta?: { label: string; items: string[] };
}) {
  return (
    <Band tone="canvas" block="hero" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-16%] top-[-26%] hidden h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,var(--color-o-100)_0%,var(--color-o-50)_46%,transparent_68%)] opacity-75 lg:block"
      />
      <Container wide className="relative">
        <div className="pt-8 lg:pt-10">
          <Breadcrumbs trail={trail} />
        </div>
        <div
          className={`grid items-start gap-12 pb-14 lg:gap-14 lg:pb-20 ${
            figure ? "lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]" : ""
          }`}
        >
          <div className={figure ? "" : "max-w-[46rem]"}>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal as="h1" mask delay={90} className="mt-6 max-w-[12ch] text-d1">
              {title}
            </Reveal>
            <Reveal delay={320} className="mt-6">
              <Lead>{lead}</Lead>
            </Reveal>
            <Reveal
              delay={420}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Action href={href(primaryCta.key)}>{primaryCta.label}</Action>
              {secondaryCta ? (
                <Action href={href(secondaryCta.key)} variant="ghost">
                  {secondaryCta.label}
                  <ArrowRight />
                </Action>
              ) : null}
            </Reveal>
            {meta ? (
              <Reveal
                delay={540}
                className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-7"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  {meta.label}
                </span>
                {meta.items.map((item) => (
                  <span key={item} className="text-[0.875rem] font-medium text-ink-2">
                    {item}
                  </span>
                ))}
              </Reveal>
            ) : null}
          </div>
          {figure ? (
            <Reveal delay={200} from="right" className="hero-media lg:pt-14">
              {figure}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Band>
  );
}

/* ==========================================================================
   Use cases, as a numbered sequence only where order carries meaning
   ========================================================================== */

export function UseCases({
  eyebrow,
  title,
  lead,
  items,
  tone = "canvas",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  items: { who: string; problem: string; outcome: string; icon?: IconName }[];
  tone?: "warm" | "canvas" | "warmer" | "peach";
}) {
  return (
    <Band tone={tone} block="usecases">
      <Container wide>
        <div className="py-band">
          <Reveal>
            <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
          </Reveal>

          {/* A before and after read, rather than three matching cards. The
              problem sits on tinted ground and the outcome on white, so the
              change is legible without a label saying "after". */}
          <ul className="mt-12 flex flex-col gap-4">
            {items.map((item, index) => (
              <Reveal as="li" key={item.who} delay={index * 80}>
                <div className="grid overflow-hidden rounded-xl shadow-[var(--shadow-soft)] ring-1 ring-rule lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="flex items-center gap-3.5 bg-gradient-to-br from-o-50 to-o-100 p-6 lg:p-7">
                    {item.icon ? <IconChip name={item.icon} size="sm" /> : null}
                    <span className="font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                      {item.who}
                    </span>
                  </div>

                  <div className="border-t border-rule bg-warm-1 p-6 lg:border-l lg:border-t-0 lg:p-7">
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                      Today
                    </p>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed">
                      {item.problem}
                    </p>
                  </div>

                  <div className="border-t border-rule bg-surface p-6 lg:border-l lg:border-t-0 lg:p-7">
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-o-700">
                      With Datanox
                    </p>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                      {item.outcome}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Band>
  );
}

/* ==========================================================================
   FAQ. Visible copy and FAQPage schema always come from the same array.
   ========================================================================== */

export type Faq = { question: string; answer: string };

export function FaqSection({
  items,
  title = "Questions people ask before a demo",
  eyebrow = "Answers",
  tone = "warm",
}: {
  items: Faq[];
  title?: string;
  eyebrow?: string;
  tone?: "warm" | "canvas" | "warmer";
}) {
  return (
    <Band tone={tone} block="faq">
      <Container>
        <div className="py-band">
          <Reveal>
            <SectionHead eyebrow={eyebrow} title={title} />
          </Reveal>
          <ul className="mt-12 flex flex-col gap-3">
            {items.map((item, index) => (
              <Reveal as="li" key={item.question} delay={index * 60}>
                <details
                  data-disclosure=""
                  className="group rounded-lg bg-surface px-6 py-5 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-shadow open:shadow-[var(--shadow-lift)] lg:px-8 lg:py-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.0625rem] font-semibold text-ink marker:hidden lg:text-[1.125rem]">
                    {item.question}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-o-50 text-o-700 ring-1 ring-o-100 transition-transform duration-200 group-open:rotate-45">
                      <svg
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M6 1.5v9M1.5 6h9" />
                      </svg>
                    </span>
                  </summary>
                  <div className="disclosure-body">
                    <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Band>
  );
}

/* ==========================================================================
   Related pages
   ========================================================================== */

export function RelatedPages({
  title = "Where this connects",
  items,
}: {
  title?: string;
  items: { key: RouteKey; blurb: string }[];
}) {
  return (
    <Band tone="canvas" block="related">
      <Container wide>
        <div className="border-t border-rule py-band">
          <Reveal>
            <h2 className="text-d3">{title}</h2>
          </Reveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {items.map((item, index) => (
              <Reveal as="li" key={item.key} delay={index * 80}>
                <Link
                  href={href(item.key) as Route}
                  className="group flex h-full flex-col rounded-lg bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-o-200"
                >
                  <span className="font-display text-[1.0625rem] font-semibold text-ink">
                    {routes[item.key].label}
                  </span>
                  <span className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                    {item.blurb}
                  </span>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-[0.8125rem] font-medium text-o-700">
                    Open
                    <ArrowRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Band>
  );
}

/* ==========================================================================
   Closing call to action
   ========================================================================== */

export function ClosingCta({
  title,
  lead,
  primary = { label: "Book a demo", key: "contact" as RouteKey },
  secondary = { label: "Read a white paper first", key: "resources" as RouteKey },
}: {
  title: string;
  lead: string;
  primary?: { label: string; key: RouteKey };
  secondary?: { label: string; key: RouteKey };
}) {
  return (
    <Band tone="peach" block="cta">
      <Container wide>
        <div className="py-band">
          <Reveal>
            <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-lift)] ring-1 ring-o-100">
              <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:p-16">
                <div>
                  <Eyebrow>Next step</Eyebrow>
                  <h2 className="mt-6 max-w-[22ch] text-d2">{title}</h2>
                  <Lead className="mt-6">{lead}</Lead>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Action href={href(primary.key)} className="w-full sm:w-auto">
                    {primary.label}
                  </Action>
                  <Action
                    href={href(secondary.key)}
                    variant="ghost"
                    className="w-full sm:w-auto"
                  >
                    {secondary.label}
                    <ArrowRight />
                  </Action>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Band>
  );
}

/* ==========================================================================
   Proof tiles

   Warm tiles rather than a reversed band. The numbers are the warmest thing
   on the page, so putting them on ink was working against them.
   ========================================================================== */

export function ProofStrip({
  stats,
  eyebrow,
  title,
  tone = "warm",
}: {
  stats: { figure: string; label: string; detail?: string }[];
  eyebrow?: string;
  title?: string;
  tone?: "warm" | "canvas" | "warmer" | "peach";
}) {
  return (
    <Band tone={tone} block="proof">
      <Container wide>
        <div className="py-band">
          {eyebrow || title ? (
            <Reveal className="mb-12">
              <SectionHead
                eyebrow={eyebrow ?? "By the numbers"}
                title={title ?? "What the work produced"}
              />
            </Reveal>
          ) : null}

          <ul className="grid gap-5 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal as="li" key={stat.figure + stat.label} delay={index * 90}>
                <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-white to-o-50 p-8 shadow-[var(--shadow-soft)] ring-1 ring-o-100 lg:p-9">
                  {/* a warm glow in the corner, so the tile has depth without
                      needing a border or a second colour */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-36 w-36 rounded-full bg-[radial-gradient(circle,var(--color-o-200)_0%,transparent_70%)] opacity-60"
                  />
                  <p className="relative bg-gradient-to-br from-o-500 to-o-700 bg-clip-text font-display text-[3rem] leading-none text-transparent">
                    {stat.figure}
                  </p>
                  <span
                    aria-hidden="true"
                    className="relative mt-5 block h-0.5 w-10 rounded-full bg-gradient-to-r from-o-500 to-o-600"
                  />
                  <p className="relative mt-5 font-display text-[1.0625rem] leading-snug text-ink">
                    {stat.label}
                  </p>
                  {stat.detail ? (
                    <p className="relative mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                      {stat.detail}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Band>
  );
}

export { TextLink, SITE_URL };
