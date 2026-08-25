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
   Insight panel
   ========================================================================== */

export function InsightPanel({
  eyebrow,
  title,
  children,
  icon = "layers",
  side,
  titleClassName = "text-d2",
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  icon?: IconName;
  side?: ReactNode;
  titleClassName?: string;
}) {
  return (
    <div
      data-interactive-card=""
      data-rich-card=""
      className="relative overflow-hidden rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-o-100 sm:p-8 lg:p-10"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5rem] top-[-6rem] h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--color-o-100)_0%,rgba(255,246,236,0.72)_42%,transparent_72%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-o-300 to-transparent opacity-80"
      />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.72fr)] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <IconChip name={icon} data-card-float="" />
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h2 className={`mt-7 max-w-[18ch] ${titleClassName}`}>{title}</h2>
          <div className="mt-6 max-w-[42rem] text-[1.0625rem] leading-relaxed text-body">
            {children}
          </div>
        </div>
        {side ? (
          <div className="relative">{side}</div>
        ) : (
          <div
            aria-hidden="true"
            className="relative hidden min-h-64 overflow-hidden rounded-lg border border-o-100 bg-gradient-to-br from-white to-o-50 p-6 shadow-[var(--shadow-soft)] lg:block"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,107,31,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(245,107,31,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className="relative flex h-full flex-col justify-between">
              <span className="h-2 w-24 rounded-pill bg-o-500/70" />
              <div className="space-y-3">
                {[0, 1, 2].map((item) => (
                  <span
                    key={item}
                    className="block h-12 rounded-md border border-o-100 bg-white/86 shadow-[0_14px_30px_rgba(122,62,12,0.08)]"
                  />
                ))}
              </div>
              <span className="ml-auto h-14 w-14 rounded-full border-[10px] border-o-500/80" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const ProductInsightPanel = InsightPanel;

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
  titleClassName = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  figure?: ReactNode;
  trail: { name: string; path: string }[];
  primaryCta?: { label: string; key: RouteKey };
  secondaryCta?: { label: string; key: RouteKey };
  meta?: { label: string; items: string[] };
  titleClassName?: string;
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
            <Reveal
              as="h1"
              mask
              delay={90}
              className={`mt-6 max-w-[12ch] text-d1 ${titleClassName}`}
            >
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
                <span className="text-[0.8125rem] font-semibold tracking-[0.01em] text-muted">
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
            <Reveal delay={200} from="scale" className="hero-media lg:pt-14">
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
                <div
                  data-interactive-card=""
                  data-rich-card=""
                  className="grid overflow-hidden rounded-xl shadow-[var(--shadow-soft)] ring-1 ring-rule lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)]"
                >
                  <div className="flex items-center gap-3.5 bg-gradient-to-br from-o-50 to-o-100 p-6 lg:p-7">
                    {item.icon ? <IconChip name={item.icon} size="sm" /> : null}
                    <span className="font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                      {item.who}
                    </span>
                  </div>

                  <div className="border-t border-rule bg-warm-1 p-6 lg:border-l lg:border-t-0 lg:p-7">
                    <p className="text-[0.75rem] font-semibold tracking-[0.01em] text-muted">
                      Today
                    </p>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed">
                      {item.problem}
                    </p>
                  </div>

                  <div className="border-t border-rule bg-surface p-6 lg:border-l lg:border-t-0 lg:p-7">
                    <p className="text-[0.75rem] font-semibold tracking-[0.01em] text-o-700">
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
                  data-interactive-card=""
                  data-rich-card=""
                  href={href(item.key) as Route}
                  className="group flex h-full flex-col rounded-lg bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-o-200"
                >
                  <span data-card-float="" className="font-display text-[1.0625rem] font-semibold text-ink">
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

          <ul data-proof-strip="" className="grid gap-5 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal as="li" key={stat.figure + stat.label} delay={index * 90}>
                <div
                  data-interactive-card=""
                  data-proof-card=""
                  className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-o-100 lg:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-7 top-7 grid h-8 w-8 place-items-center rounded-full bg-o-50 text-[0.75rem] font-semibold text-o-700 ring-1 ring-o-100"
                  >
                    {index + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    data-proof-orbit=""
                    className="pointer-events-none absolute right-[-4.5rem] top-[-4.5rem] h-44 w-44 rounded-full border border-o-200/70"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-7 top-7 h-2 w-2 rounded-full bg-o-500 shadow-[0_0_0_8px_var(--color-o-50)]"
                  />
                  <p className="relative mt-14 bg-gradient-to-br from-o-500 to-o-700 bg-clip-text font-display text-[4.25rem] leading-none text-transparent lg:text-[4.75rem]">
                    {stat.figure}
                  </p>
                  <div
                    aria-hidden="true"
                    className="relative mt-6 h-1.5 overflow-hidden rounded-full bg-o-50"
                  >
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-o-400 to-o-600 transition-transform duration-500 group-hover:scale-x-105"
                      style={{
                        width: `${index === 0 ? 78 : index === 1 ? 66 : 54}%`,
                      }}
                    />
                  </div>
                  <p className="relative mt-6 font-display text-[1.125rem] leading-snug text-ink">
                    {stat.label}
                  </p>
                  {stat.detail ? (
                    <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-muted">
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
