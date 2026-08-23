import { Reveal } from "@/components/ui/reveal";
import { Band, Container, SectionHead } from "@/components/ui/primitives";
import { Icon, IconChip, type IconName } from "@/components/ui/icons";

/**
 * Capability blocks, in four layouts.
 *
 * A three card grid on every page makes a site read as one template repeated.
 * The layout should follow the shape of the content: a set of peers is a grid,
 * a set of related mechanics is a list, a pair with one dominant item is a
 * feature, and a long set is a ledger. Each page picks the one that matches.
 */

export type Capability = {
  name: string;
  body: string;
  detail?: string;
  icon: IconName;
};

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  items: Capability[];
  tone?: "warm" | "canvas" | "warmer" | "peach";
  variant?: "grid" | "list" | "feature" | "ledger";
  align?: "left" | "center";
};

export function Capabilities({
  eyebrow,
  title,
  lead,
  items,
  tone = "warm",
  variant = "grid",
  align = "left",
}: Props) {
  return (
    <Band tone={tone} block="capabilities">
      <Container wide>
        <div className="py-band">
          <Reveal>
            <SectionHead
              eyebrow={eyebrow}
              title={title}
              lead={lead}
              align={align}
              className={align === "center" ? "mx-auto max-w-[46rem]" : ""}
            />
          </Reveal>

          {variant === "grid" ? <GridLayout items={items} /> : null}
          {variant === "list" ? <ListLayout items={items} /> : null}
          {variant === "feature" ? <FeatureLayout items={items} /> : null}
          {variant === "ledger" ? <LedgerLayout items={items} /> : null}
        </div>
      </Container>
    </Band>
  );
}

/* -------------------------------------------------------------------------
   Grid. A set of peers, none more important than another.
   ------------------------------------------------------------------------- */

function GridLayout({ items }: { items: Capability[] }) {
  return (
    <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal as="li" key={item.name} delay={index * 80}>
          <div
            data-interactive-card=""
            data-rich-card=""
            className="group flex h-full flex-col rounded-lg bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-o-200 lg:p-8"
          >
            <IconChip name={item.icon} data-card-float="" />
            <h3 data-card-float="" className="mt-5 text-d4">{item.name}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed">{item.body}</p>
            {item.detail ? (
              <p className="mt-auto pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-o-700">
                {item.detail}
              </p>
            ) : null}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------
   List. Related mechanics that read in sequence, with room for longer copy.
   ------------------------------------------------------------------------- */

function ListLayout({ items }: { items: Capability[] }) {
  return (
    <ul className="mt-12 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-soft)] ring-1 ring-rule">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.name}
          delay={index * 60}
          className={index > 0 ? "border-t border-rule" : ""}
        >
          <div
            data-interactive-card=""
            data-rich-card=""
            className="group grid gap-4 p-7 transition-colors hover:bg-o-50/50 lg:grid-cols-[auto_minmax(0,15rem)_minmax(0,1fr)_auto] lg:items-start lg:gap-8 lg:p-8"
          >
            <IconChip name={item.icon} data-card-float="" />
            <h3 className="text-d4 lg:pt-1.5">{item.name}</h3>
            <p className="text-[0.9375rem] leading-relaxed lg:pt-2">
              {item.body}
            </p>
            {item.detail ? (
              <p className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-o-700 lg:pt-3 lg:text-right">
                {item.detail}
              </p>
            ) : null}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------
   Feature. The first item carries the argument, the rest support it.
   ------------------------------------------------------------------------- */

function FeatureLayout({ items }: { items: Capability[] }) {
  const [lead, ...rest] = items;
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_1.35fr]">
      <Reveal>
        <div
          data-interactive-card=""
          className="relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-o-500 to-o-700 p-8 shadow-[var(--shadow-glow)] lg:p-10"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-56 w-56 rounded-full bg-white/12"
          />
          <span
            aria-hidden="true"
            className="relative grid h-14 w-14 shrink-0 place-items-center rounded-md bg-white/20 p-3.5 text-white ring-1 ring-white/30"
          >
            <Icon name={lead.icon} className="h-full w-full" />
          </span>
          <h3 className="relative mt-6 text-d3 !text-white">{lead.name}</h3>
          <p className="relative mt-4 text-[1rem] leading-relaxed text-white/85">
            {lead.body}
          </p>
          {lead.detail ? (
            <p className="relative mt-auto pt-7 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white/70">
              {lead.detail}
            </p>
          ) : null}
        </div>
      </Reveal>

      <ul className="grid gap-5 sm:grid-cols-2">
        {rest.map((item, index) => (
          <Reveal as="li" key={item.name} delay={index * 70}>
            <div
              data-interactive-card=""
              data-rich-card=""
              className="flex h-full flex-col rounded-lg bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-7"
            >
              <IconChip name={item.icon} size="sm" data-card-float="" />
              <h3 className="mt-4 font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                {item.name}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Ledger. A long set, read like a specification rather than browsed.
   ------------------------------------------------------------------------- */

function LedgerLayout({ items }: { items: Capability[] }) {
  return (
    <ul className="mt-12 grid gap-x-12 gap-y-0 lg:grid-cols-2">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.name}
          delay={index * 60}
          className="border-b border-rule"
        >
          <div
            data-interactive-card=""
            data-rich-card=""
            className="group flex gap-5 rounded-lg px-4 py-7 shadow-[var(--shadow-soft)] ring-1 ring-transparent transition-colors hover:ring-o-100"
          >
            <IconChip name={item.icon} size="sm" className="mt-0.5" data-card-float="" />
            <div>
              <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-[1.125rem] font-semibold text-ink">
                {item.name}
                {item.detail ? (
                  <span className="font-mono text-[0.625rem] font-normal uppercase tracking-[0.12em] text-o-700">
                    {item.detail}
                  </span>
                ) : null}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed">
                {item.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
