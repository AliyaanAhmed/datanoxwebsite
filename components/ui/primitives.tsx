import Link from "next/link";
import type { ReactNode } from "react";
import type { Route } from "next";

/* ==========================================================================
   Layout
   ========================================================================== */

type Tone = "canvas" | "warm" | "warmer" | "peach" | "ink";

const toneClass: Record<Tone, string> = {
  canvas: "bg-canvas text-body",
  warm: "bg-warm-1 text-body",
  warmer: "bg-warm-2 text-body",
  peach: "bg-peach text-body",
  ink: "bg-ink text-o-100",
};

export function Band({
  tone = "canvas",
  children,
  className = "",
  id,
  block,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  id?: string;
  /**
   * Names the kind of block this band is, so guard 9 can read each route's
   * block sequence out of the built HTML and report when too many pages run
   * the identical skeleton. Costs one attribute and makes sameness
   * measurable instead of a matter of opinion.
   */
  block?: string;
}) {
  return (
    <section
      id={id}
      data-block={block}
      className={`relative isolate ${toneClass[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${
        wide ? "max-w-[88rem]" : "max-w-[76rem]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   Type
   ========================================================================== */

/**
 * The eyebrow is a pill badge with a small mark, matching the language the
 * brand already uses, rather than a bare tracked label.
 */
export function Eyebrow({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill py-1.5 pl-2 pr-3.5 text-eyebrow font-medium ${
        tone === "dark"
          ? "bg-white/10 text-o-200"
          : "bg-o-50 text-o-700 ring-1 ring-o-100"
      } ${className}`}
    >
      <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-o-500 to-o-600">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      {children}
    </span>
  );
}

export function Lead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-lead measure ${className}`}>{children}</p>;
}

/* ==========================================================================
   Actions
   ========================================================================== */

type ButtonVariant = "primary" | "ghost" | "onDark";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-pill font-sans text-[0.9375rem] font-medium leading-none transition-all duration-200 px-6 py-3.5";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-o-500 to-o-600 text-white shadow-[var(--shadow-glow)] hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "bg-white text-ink ring-1 ring-rule-strong hover:ring-o-300 hover:-translate-y-0.5 active:translate-y-0",
  onDark:
    "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/16 hover:-translate-y-0.5",
};

export function Action({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href as Route} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href as Route}
      className={`link-sweep group inline-flex items-center gap-2 font-medium text-o-700 transition-colors hover:text-o-800 ${className}`}
    >
      {children}
      <ArrowRight />
    </Link>
  );
}

/* ==========================================================================
   Section heading
   ========================================================================== */

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`text-d2 max-w-[20ch] ${tone === "dark" ? "!text-white" : ""}`}
      >
        {title}
      </h2>
      {lead ? (
        <Lead
          className={`${align === "center" ? "mx-auto" : ""} ${
            tone === "dark" ? "text-o-100/80" : ""
          }`}
        >
          {lead}
        </Lead>
      ) : null}
    </div>
  );
}

/* ==========================================================================
   Card
   ========================================================================== */

export function Card({
  children,
  className = "",
  hoverable = false,
}: {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <div
      data-interactive-card=""
      data-rich-card=""
      className={`rounded-lg bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-8 ${
        hoverable
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-o-200"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
