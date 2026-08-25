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

      {segments.map((segment, index) => {
        const mirrored = index % 2 === 1;
        const hasFigure = Boolean(segment.figure);
        const variant = index % 3;
        const [firstBlock, ...restBlocks] = segment.blocks;

        return (
        <Band
          key={segment.tag}
          tone={index % 2 === 0 ? "canvas" : "warm"}
          block="segment"
          className="overflow-hidden"
        >
          <Container wide>
            <div
              className={`grid gap-10 py-14 lg:gap-16 lg:py-20 ${
                hasFigure ? "lg:grid-cols-[0.82fr_1.18fr]" : "lg:grid-cols-[0.78fr_1.22fr]"
              }`}
            >
              <Reveal
                from={mirrored ? "right" : "left"}
                className={`${hasFigure ? "lg:sticky lg:top-28 lg:self-start" : ""} ${
                  mirrored ? "lg:order-2" : ""
                }`}
              >
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-o-500 via-o-200 to-transparent"
                  />
                  <div className="pl-6">
                    <span className="inline-flex w-fit items-center rounded-pill bg-o-50 px-3 py-1.5 text-[0.8125rem] font-medium tracking-[0.02em] text-o-700 ring-1 ring-o-100">
                      {segment.tag}
                    </span>
                    <h3 className="mt-5 max-w-[20ch] text-d3">{segment.title}</h3>
                    <p className="mt-4 measure text-[1.0625rem] leading-relaxed">
                      {segment.intro}
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className={`flex flex-col gap-5 ${mirrored ? "lg:order-1" : ""}`}>
                {segment.figure ? (
                  <Reveal delay={120}>
                    <div
                      data-interactive-card=""
                      data-rich-card=""
                      className="rounded-xl bg-surface p-5 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-8"
                    >
                      {segment.figure}
                    </div>
                  </Reveal>
                ) : null}

                {variant === 0 ? (
                  <Reveal delay={160} from="scale">
                    <ol
                      data-interactive-card=""
                      data-rich-card=""
                      className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-soft)] ring-1 ring-rule"
                    >
                      {segment.blocks.map((block, blockIndex) => (
                        <li
                          key={block.heading}
                          className="grid gap-4 border-b border-rule p-6 last:border-b-0 sm:grid-cols-[4rem_1fr] lg:p-7"
                        >
                          <span className="font-display text-[2rem] font-semibold leading-none text-o-200">
                            {String(blockIndex + 1).padStart(2, "0")}
                          </span>
                          <span>
                            <span className="block text-d4">{block.heading}</span>
                            <span className="mt-2 block text-[0.9375rem] leading-relaxed">
                              {block.body}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                ) : null}

                {variant === 1 && firstBlock ? (
                  <Reveal delay={160} from="scale">
                    <div
                      data-interactive-card=""
                      data-rich-card=""
                      className="grid gap-0 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-soft)] ring-1 ring-rule lg:grid-cols-[0.9fr_1.1fr]"
                    >
                      <div className="bg-gradient-to-br from-o-500 to-o-700 p-6 text-white lg:p-8">
                        <p className="text-[0.8125rem] font-semibold text-white/75">
                          {segment.tag}
                        </p>
                        <h4 className="mt-5 font-display text-[1.625rem] font-semibold leading-tight text-white">
                          {firstBlock.heading}
                        </h4>
                        <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/84">
                          {firstBlock.body}
                        </p>
                      </div>
                      <div className="divide-y divide-rule">
                        {restBlocks.map((block, blockIndex) => (
                          <div key={block.heading} className="p-6 lg:p-7">
                            <p className="flex items-baseline gap-3 text-d4">
                              <span className="text-[0.875rem] font-semibold text-o-500">
                                {String(blockIndex + 2).padStart(2, "0")}
                              </span>
                              {block.heading}
                            </p>
                            <p className="mt-2 text-[0.9375rem] leading-relaxed">
                              {block.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ) : null}

                {variant === 2 ? (
                  <Reveal delay={160} from="scale">
                    <div
                      data-interactive-card=""
                      data-rich-card=""
                      className="relative overflow-hidden rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-8"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-8 top-8 w-px bg-gradient-to-b from-o-500 via-o-200 to-transparent"
                      />
                      <ul className="grid gap-7">
                        {segment.blocks.map((block) => (
                          <li key={block.heading} className="relative pl-10">
                            <span
                              aria-hidden="true"
                              className="absolute left-[0.42rem] top-2 h-3 w-3 rounded-full bg-o-500 ring-4 ring-o-50"
                            />
                            <h4 className="text-d4">{block.heading}</h4>
                            <p className="mt-2 text-[0.9375rem] leading-relaxed">
                              {block.body}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ) : null}

                {segment.proof ? (
                  <Reveal delay={160}>
                    <div
                      data-interactive-card=""
                      data-rich-card=""
                      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-o-50 to-peach p-6 ring-1 ring-o-200 lg:p-7"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[-2.5rem] top-[-2.5rem] h-32 w-32 rounded-full bg-[radial-gradient(circle,var(--color-o-200)_0%,transparent_70%)] opacity-70"
                      />
                      <p className="relative text-[0.8125rem] font-semibold tracking-[0.01em] text-o-700">
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
        );
      })}
    </>
  );
}
