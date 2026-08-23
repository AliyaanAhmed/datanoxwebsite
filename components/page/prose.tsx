import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { Band, Container, Eyebrow } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/page/blocks";

/**
 * A prose page. Legal notices and anything else that is read rather than
 * scanned. One column, generous measure, no cards.
 */
export function ProsePage({
  eyebrow,
  title,
  standfirst,
  updated,
  trail,
  children,
}: {
  eyebrow: string;
  title: string;
  standfirst: string;
  updated: string;
  trail: { name: string; path: string }[];
  children: ReactNode;
}) {
  return (
    <Band tone="canvas">
      <Container>
        <div className="pt-8 lg:pt-10">
          <Breadcrumbs trail={trail} />
        </div>
        <div className="pb-band">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-[18ch] text-d1">{title}</h1>
            <p className="mt-6 measure text-lead">{standfirst}</p>
            <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
              Last updated {updated}
            </p>
          </Reveal>

          <Reveal
            delay={120}
            className="mt-12 flex max-w-[62ch] flex-col gap-8 border-t border-rule pt-12"
          >
            {children}
          </Reveal>
        </div>
      </Container>
    </Band>
  );
}

export function Clause({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-d4">{heading}</h2>
      <div className="flex flex-col gap-3 text-[1rem] leading-relaxed">
        {children}
      </div>
    </section>
  );
}
