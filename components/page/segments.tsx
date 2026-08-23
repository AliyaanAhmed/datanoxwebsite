import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { Band, Container, Eyebrow } from "@/components/ui/primitives";

export type Segment = {
  /** The audience or service line, used as the eyebrow. */
  tag: string;
  title: string;
  intro: string;
  blocks: { heading: string; body: string }[];
  /** An optional named proof point, only where one is real. */
  proof?: { label: string; body: string };
  figure?: ReactNode;
};

/**
 * Segments.
 *
 * Some verticals are not one offer but several. Not for profit covers
 * fundraising, professional associations, NDIS and health, and each has its
 * own buyer. Flattening them into a feature grid loses the distinction that
 * makes each one persuasive, so each gets its own block with its own proof.
 */
export function Segments({
  eyebrow,
  title,
  lead,
  segments,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  segments: Segment[];
}) {
  return (
    <>
      <Band tone="canvas">
        <Container wide>
          <div className="pt-band">
            <Reveal>
              {/* items-start, or the eyebrow pill stretches to the full
                  column width and stops reading as a label. */}
              <div className="flex max-w-[46rem] flex-col items-start gap-5">
                <Eyebrow>{eyebrow}</Eyebrow>
                <h2 className="text-d2">{title}</h2>
                {lead ? <p className="text-lead measure">{lead}</p> : null}
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      {segments.map((segment, index) => (
        <Band
          key={segment.tag}
          tone={index % 2 === 0 ? "canvas" : "warm"}
        >
          <Container wide>
            <div
              className={`grid gap-10 py-14 lg:gap-16 lg:py-20 ${
                segment.figure ? "lg:grid-cols-[0.82fr_1.18fr]" : ""
              }`}
            >
              <Reveal className={segment.figure ? "lg:sticky lg:top-28 lg:self-start" : ""}>
                <span className="inline-flex w-fit items-center rounded-pill bg-o-50 px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-o-700 ring-1 ring-o-100">
                  {segment.tag}
                </span>
                <h3 className="mt-5 max-w-[20ch] text-d3">{segment.title}</h3>
                <p className="mt-4 measure text-[1.0625rem] leading-relaxed">
                  {segment.intro}
                </p>
              </Reveal>

              <div className="flex flex-col gap-5">
                {segment.figure ? (
                  <Reveal delay={120}>
                    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-8">
                      {segment.figure}
                    </div>
                  </Reveal>
                ) : null}

                <ul className="grid gap-5 sm:grid-cols-2">
                  {segment.blocks.map((block, blockIndex) => (
                    <Reveal
                      as="li"
                      key={block.heading}
                      delay={blockIndex * 80}
                      className="h-full"
                    >
                      <div className="h-full rounded-lg bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-7">
                        <h4 className="text-d4">{block.heading}</h4>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed">
                          {block.body}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </ul>

                {segment.proof ? (
                  <Reveal delay={160}>
                    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-o-50 to-peach p-6 ring-1 ring-o-200 lg:p-7">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[-2.5rem] top-[-2.5rem] h-32 w-32 rounded-full bg-[radial-gradient(circle,var(--color-o-200)_0%,transparent_70%)] opacity-70"
                      />
                      <p className="relative font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-o-700">
                        {segment.proof.label}
                      </p>
                      <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                        {segment.proof.body}
                      </p>
                    </div>
                  </Reveal>
                ) : null}
              </div>
            </div>
          </Container>
        </Band>
      ))}
    </>
  );
}
