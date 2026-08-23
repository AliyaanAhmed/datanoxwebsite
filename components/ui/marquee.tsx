import type { ReactNode } from "react";

/**
 * Infinite marquee.
 *
 * Pure CSS. The track is rendered twice and translated by exactly half its
 * width, which makes the loop seamless without measuring anything at runtime,
 * so there is no JavaScript and no jump on the wrap.
 *
 * It pauses on hover and on keyboard focus, and stops entirely under
 * prefers reduced motion, where it becomes a plain wrapping row instead.
 */
export function Marquee({
  children,
  speed = 42,
  reverse = false,
  className = "",
}: {
  /** One pass of the content. It is duplicated internally for the loop. */
  children: ReactNode;
  /** Seconds for a full pass. Longer is slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      data-marquee=""
      className={`group relative flex overflow-hidden ${className}`}
      style={
        {
          "--speed": `${speed}s`,
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        } as React.CSSProperties
      }
    >
      <div
        data-marquee-track=""
        data-reverse={reverse ? "true" : undefined}
        className="flex w-max shrink-0 items-center gap-4 pr-4"
      >
        {children}
        {/* the duplicate that makes the loop seamless */}
        <span aria-hidden="true" className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}

/** A single item in a marquee: an organisation, a platform, a partner. */
export function MarqueeChip({
  label,
  sub,
  icon,
}: {
  label: string;
  sub?: string;
  icon?: ReactNode;
}) {
  return (
    <span className="flex shrink-0 items-center gap-3 rounded-lg bg-surface px-6 py-4 shadow-[var(--shadow-soft)] ring-1 ring-rule">
      {icon ? (
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-o-50 to-o-100 p-1.5 text-o-700 ring-1 ring-o-100">
          {icon}
        </span>
      ) : null}
      <span className="flex flex-col">
        <span className="whitespace-nowrap font-display text-[1.0625rem] font-semibold leading-none text-ink">
          {label}
        </span>
        {sub ? (
          <span className="mt-1.5 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
            {sub}
          </span>
        ) : null}
      </span>
    </span>
  );
}
