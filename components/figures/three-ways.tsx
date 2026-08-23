import { FigureDefs } from "./defs";

/**
 * Figure 11. Three ways to buy, standing on one Microsoft practice.
 *
 * Replaces the convergence diagram that occupied this slot until August 2026.
 * That figure drew three products flowing into a single Dataverse slab, which
 * said the products are a suite. They are not: they are separate software sold
 * separately, and two thirds of what Datanox sells is not software at all.
 *
 * What this figure says instead is the true shape of the business. Three
 * commercial lines, one engineering practice underneath all of them. The
 * foundation is the shared thing, not the data model.
 *
 * The viewBox is close to square on purpose, so the figure holds its own
 * against a three line display headline rather than sitting as a thin band.
 */

const ID = "f11";

const W = 188;

const COLUMNS = [
  {
    x: 20,
    eyebrow: "PRODUCTS",
    title: "License it",
    sub: "Five, each sold on its own",
    /** Five bars, because five is the count and three read as a trinity. */
    motif: "bars" as const,
  },
  {
    x: 236,
    eyebrow: "SERVICES",
    title: "We build it",
    sub: "Projects we design and build",
    motif: "layers" as const,
  },
  {
    x: 452,
    eyebrow: "PEOPLE",
    title: "We join you",
    sub: "Our consultants in your team",
    motif: "team" as const,
  },
];

function Motif({
  kind,
  x,
  delay,
}: {
  kind: "bars" | "layers" | "team";
  x: number;
  delay: number;
}) {
  if (kind === "bars") {
    return (
      <g>
        {[116, 92, 132, 76, 104].map((w, i) => (
          <rect
            key={w}
            x={x + 26}
            y={180 + i * 18}
            width={w}
            height="9"
            rx="4.5"
            fill={i === 2 ? `url(#${ID}-brand)` : "var(--color-o-200)"}
            data-scale=""
            style={
              {
                transformOrigin: `${x + 26}px 0px`,
                "--d": delay + i * 70,
              } as React.CSSProperties
            }
          />
        ))}
      </g>
    );
  }

  if (kind === "layers") {
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={x + 26 + i * 9}
            y={244 - i * 26}
            width="112"
            height="30"
            rx="8"
            fill={i === 2 ? `url(#${ID}-brand)` : "var(--color-o-100)"}
            stroke={i === 2 ? "none" : "var(--color-o-200)"}
            data-pop=""
            style={{ "--d": delay + i * 90 } as React.CSSProperties}
          />
        ))}
      </g>
    );
  }

  return (
    <g>
      {/* Your team, drawn as an outline. Our people, drawn solid inside it. */}
      <rect
        x={x + 22}
        y="180"
        width={W - 44}
        height="74"
        rx="16"
        fill="none"
        stroke="var(--color-rule-strong)"
        strokeDasharray="6 5"
        data-pop=""
        style={{ "--d": delay } as React.CSSProperties}
      />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={x + 48 + i * 30}
          cy="217"
          r="12"
          fill={i === 1 || i === 3 ? `url(#${ID}-brand)` : "var(--color-o-200)"}
          data-pop=""
          style={{ "--d": delay + 90 + i * 70 } as React.CSSProperties}
        />
      ))}
    </g>
  );
}

export function FigThreeWays({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 660 520"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          Three ways to work with Datanox, standing on one Microsoft engineering
          practice
        </title>
        <desc id={`${ID}-d`}>
          Three columns sit side by side. The first is products, five pieces of
          software licensed separately. The second is services, Dynamics 365 and
          Power Platform projects designed and delivered by Datanox. The third
          is people, Datanox consultants placed inside a client team. All three
          rest on one foundation, a single engineering practice working across
          Dynamics 365, Power Platform, Dataverse and Copilot.
        </desc>

        <FigureDefs id={ID} />

        {COLUMNS.map((column, index) => (
          <g key={column.eyebrow}>
            <g data-pop="" style={{ "--d": index * 110 } as React.CSSProperties}>
              <rect
                x={column.x}
                y="44"
                width={W}
                height="246"
                rx="20"
                fill={`url(#${ID}-card)`}
                stroke="var(--color-o-200)"
                filter={`url(#${ID}-soft)`}
              />
              <text
                x={column.x + 26}
                y="84"
                className="fill-[var(--color-o-700)] font-mono"
                fontSize="10"
                letterSpacing="0.16em"
              >
                {column.eyebrow}
              </text>
              <text
                x={column.x + 26}
                y="120"
                className="fill-[var(--color-ink)] font-display"
                fontSize="24"
                fontWeight="660"
              >
                {column.title}
              </text>
              <text
                x={column.x + 26}
                y="146"
                className="fill-[var(--color-body)] font-sans"
                fontSize="11.5"
              >
                {column.sub}
              </text>
            </g>

            <Motif kind={column.motif} x={column.x} delay={280 + index * 110} />

            {/* The join down into the practice */}
            <path
              d={`M${column.x + W / 2} 290 v 50`}
              stroke="var(--color-o-300)"
              strokeWidth="2"
              strokeDasharray="5 5"
              pathLength={1}
              data-draw=""
              style={{ "--len": 1, "--d": 640 + index * 90 } as React.CSSProperties}
            />
          </g>
        ))}

        {/* The foundation */}
        <g data-pop="" style={{ "--d": 820 } as React.CSSProperties}>
          <rect
            x="20"
            y="340"
            width="620"
            height="126"
            rx="22"
            fill={`url(#${ID}-slab)`}
            stroke="var(--color-o-300)"
            filter={`url(#${ID}-lift)`}
          />
          <rect
            x="20"
            y="340"
            width="620"
            height="126"
            rx="22"
            fill={`url(#${ID}-grid)`}
            opacity="0.5"
          />
          <text
            x="46"
            y="380"
            className="fill-[var(--color-o-800)] font-mono"
            fontSize="10"
            letterSpacing="0.16em"
          >
            ONE ENGINEERING PRACTICE
          </text>
          <text
            x="46"
            y="414"
            className="fill-[var(--color-ink)] font-display"
            fontSize="20"
            fontWeight="660"
          >
            Dynamics 365, Power Platform,
          </text>
          <text
            x="46"
            y="438"
            className="fill-[var(--color-ink)] font-display"
            fontSize="20"
            fontWeight="660"
          >
            Dataverse and Copilot
          </text>
          <text
            x="380"
            y="438"
            className="fill-[var(--color-body)] font-sans"
            fontSize="12"
          >
            Fifty people. Thirty five in delivery.
          </text>
        </g>

        <text
          x="330"
          y="500"
          textAnchor="middle"
          className="fill-[var(--color-muted)] font-sans"
          fontSize="12.5"
          data-pop=""
          style={{ "--d": 1000 } as React.CSSProperties}
        >
          Buy one of the three. Or all three, as most clients eventually do.
        </text>
      </svg>
    </figure>
  );
}
