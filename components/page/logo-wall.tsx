import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { Band, Container } from "@/components/ui/primitives";
import { clients, partners, type Client, type Partner } from "@/content/clients";

/**
 * Real logos, at last.
 *
 * The previous strip rendered organisation names as wordmark chips because no
 * logo files had been cleared. They have been now, so the marks themselves do
 * the work: a logo is recognised in a glance and a name has to be read.
 *
 * Every mark ships at a fixed row height with its own intrinsic width, which
 * keeps a tall square mark and a long horizontal lockup optically equal
 * without any of them being stretched.
 */

/**
 * A mark inside a fixed optical box.
 *
 * Constraining height alone is what makes a logo wall look wrong: a wide
 * horizontal lockup ends up three times the visual weight of a stacked one.
 * Bounding both dimensions and letting the image contain itself inside that
 * box gives every mark the same presence regardless of its proportions.
 */
function LogoMark({
  item,
  boxW = 150,
  boxH = 44,
}: {
  item: Pick<Client, "name" | "slug" | "w" | "h">;
  boxW?: number;
  boxH?: number;
}) {
  const scale = Math.min(boxW / item.w, boxH / item.h);
  return (
    <img
      src={`/logos/${item.slug}.png`}
      alt={item.name}
      width={Math.round(item.w * scale)}
      height={Math.round(item.h * scale)}
      loading="lazy"
      decoding="async"
      className="shrink-0 object-contain"
      style={{ maxWidth: `${boxW}px`, maxHeight: `${boxH}px` }}
    />
  );
}

/** One marquee item: the mark centred in a tile of constant width. */
function LogoTile({ item }: { item: Client }) {
  return (
    <span className="flex h-[5.5rem] w-[13.5rem] shrink-0 items-center justify-center rounded-lg bg-surface px-6 shadow-[var(--shadow-soft)] ring-1 ring-rule">
      <LogoMark item={item} />
    </span>
  );
}

/**
 * The homepage strip. Client logos only.
 *
 * The platform marquee that used to sit under this one is gone. Naming the
 * Microsoft products under a row of client logos put a vendor's brands where
 * the visitor was looking for evidence, and the platforms are already stated
 * in the hero and on every product page.
 */
export function ClientLogos() {
  const half = Math.ceil(clients.length / 2);
  const rowOne = clients.slice(0, half);
  const rowTwo = clients.slice(half);

  return (
    <Band tone="warm" block="clients">
      <div className="py-band">
        <Container wide>
          <Reveal className="flex flex-col items-center gap-3 text-center">
            <p className="font-mono text-[0.8125rem] tracking-[0.02em] text-o-700">
              Organisations we have delivered for
            </p>
            <h2 className="max-w-[24ch] text-d3">
              Governments, universities, insurers and charities
            </h2>
          </Reveal>
        </Container>

        <Reveal delay={120} className="mt-12">
          <Marquee speed={68}>
            {rowOne.map((client) => (
              <LogoTile key={client.slug} item={client} />
            ))}
          </Marquee>
        </Reveal>

        <Reveal delay={200} className="mt-4">
          <Marquee speed={78} reverse>
            {rowTwo.map((client) => (
              <LogoTile key={client.slug} item={client} />
            ))}
          </Marquee>
        </Reveal>

        <Container wide>
          <Reveal delay={260} className="mt-10 text-center">
            <p className="mx-auto max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted">
              Twenty five implementations across five sectors and four regions.
              Some engagements are covered by non disclosure agreements and are
              not shown here.
            </p>
          </Reveal>
        </Container>
      </div>
    </Band>
  );
}

/** A quieter single row, for pages that need the signal but not the section. */
export function ClientStrip({ tone = "warm" }: { tone?: "warm" | "canvas" | "warmer" }) {
  return (
    <Band tone={tone} block="clientstrip">
      <div className="py-12">
        <Container wide>
          <Reveal className="mb-7 text-center">
            <p className="font-mono text-[0.8125rem] tracking-[0.02em] text-o-700">
              Delivered for
            </p>
          </Reveal>
        </Container>
        <Reveal delay={80}>
          <Marquee speed={72}>
            {clients.map((client) => (
              <span
                key={client.slug}
                className="flex h-14 w-40 shrink-0 items-center justify-center px-4 opacity-80"
              >
                <LogoMark item={client} boxW={120} boxH={32} />
              </span>
            ))}
          </Marquee>
        </Reveal>
      </div>
    </Band>
  );
}

/**
 * A still grid of marks, for the clients page.
 *
 * The marquee is right on a homepage, where the row is a signal glanced at on
 * the way past. It is wrong on a page whose whole purpose is that a visitor
 * can look for their own sector and read the names in it, so this version
 * does not move and every mark holds still long enough to be recognised.
 */
export function ClientGrid({
  items,
  maxColumns = 4,
}: {
  items: Client[];
  /** Lower this where the grid sits inside a narrower column. */
  maxColumns?: 2 | 3 | 4;
}) {
  // Column count follows the number of marks up to the cap. A sector with two
  // named organisations laid out on a four column track leaves half the row
  // empty, which reads as missing content rather than as a short list.
  const columns = Math.min(items.length, maxColumns) as 1 | 2 | 3 | 4;
  const track = {
    1: "sm:grid-cols-1 lg:grid-cols-1",
    2: "sm:grid-cols-2 lg:grid-cols-2",
    3: "sm:grid-cols-3 lg:grid-cols-3",
    4: "sm:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid grid-cols-2 gap-3 ${track}`}>
      {items.map((client, index) => (
        <Reveal key={client.slug} delay={Math.min(index, 7) * 55}>
          <span
            data-interactive-card=""
            data-rich-card=""
            className="flex h-[6.25rem] items-center justify-center rounded-lg bg-surface px-5 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
          >
            <LogoMark item={client} boxW={148} boxH={46} />
          </span>
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Partner marks.
 *
 * Two forms. The full one, with the description of what each partnership
 * covers, belongs on the partners page and nowhere else: that paragraph is
 * written once and repeating it on the clients and company pages meant three
 * routes carrying identical copy, which is exactly the pattern the repetition
 * guards exist to catch.
 *
 * Everywhere else gets the compact form, which is the mark and the market.
 * That is all those pages need it to say.
 */
export function PartnerLogos({
  items = partners,
  compact = false,
}: {
  items?: Partner[];
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map((partner, index) => (
          <Reveal key={partner.slug} delay={index * 70}>
            <div
              data-interactive-card=""
              data-rich-card=""
              className="flex h-full flex-col items-center justify-center gap-4 rounded-lg bg-surface px-5 py-7 shadow-[var(--shadow-soft)] ring-1 ring-rule"
            >
              <LogoMark item={partner} boxW={148} boxH={40} />
              <p className="font-mono text-[0.75rem] tracking-[0.02em] text-muted">
                {partner.region}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((partner, index) => (
        <Reveal key={partner.slug} delay={index * 80}>
          <div
            data-interactive-card=""
            data-rich-card=""
            className="flex h-full flex-col rounded-xl bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-8"
          >
            <span className="flex h-14 items-center">
              <LogoMark item={partner} boxW={190} boxH={48} />
            </span>
            <p className="mt-6 border-t border-rule pt-5 font-mono text-[0.8125rem] tracking-[0.02em] text-o-700">
              {partner.region}
            </p>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
              {partner.blurb}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
