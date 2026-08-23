import { FigureDefs } from "./defs";

/**
 * Figure 14. Where the named work sits.
 *
 * One dot per named organisation, grouped by sector. The figure exists because
 * the clients page hero otherwise held a headline against an empty half, and
 * because a reader arriving on that page is asking exactly one question:
 * do you work with organisations like mine.
 *
 * Counts are read from the same array the logo grids read from, so the figure
 * cannot drift out of step with the page below it. Nothing here is a result
 * or a performance figure, which is deliberate: the whole page publishes names
 * and nothing else.
 */

const ID = "f14";

const ROWS: { label: string; count: number; region: string }[] = [
  { label: "Not for profit", count: 8, region: "AU" },
  { label: "Financial services", count: 6, region: "AE  AU" },
  { label: "Energy", count: 3, region: "AU  US" },
  { label: "Government", count: 2, region: "AE  AU" },
  { label: "Education", count: 2, region: "AU" },
];

const ROW_TOP = 118;
const ROW_STEP = 62;
const DOT_X = 250;
const DOT_STEP = 26;

export function FigSectorSpread({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 620 470"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          Named client organisations by sector and region
        </title>
        <desc id={`${ID}-d`}>
          Five sectors listed down the left, each with one dot for every named
          organisation in it. Not for profit has eight, financial services and
          insurance six, energy three, government and public sector two, and
          education two. Delivery regions are Australia, the United Arab
          Emirates, Saudi Arabia and the United States.
        </desc>

        <FigureDefs id={ID} />

        <rect
          x="8"
          y="8"
          width="604"
          height="454"
          rx="24"
          fill={`url(#${ID}-card)`}
          stroke="var(--color-o-200)"
          filter={`url(#${ID}-soft)`}
        />

        <text
          x="40"
          y="56"
          className="fill-[var(--color-o-700)] font-mono"
          fontSize="10"
          letterSpacing="0.16em"
        >
          NAMED ORGANISATIONS
        </text>
        <text
          x="40"
          y="86"
          className="fill-[var(--color-ink)] font-display"
          fontSize="21"
          fontWeight="650"
        >
          Twenty one, across five sectors
        </text>

        {ROWS.map((row, index) => {
          const y = ROW_TOP + index * ROW_STEP;
          const delay = 160 + index * 110;
          return (
            <g key={row.label}>
              {/* The rule closes the row. The region code sits above it,
                  under its own sector name, because below the rule it reads
                  as a label for the row that follows. */}
              <text
                x="40"
                y={y}
                className="fill-[var(--color-ink-2)] font-sans"
                fontSize="13"
                fontWeight="500"
              >
                {row.label}
              </text>
              <text
                x="40"
                y={y + 18}
                className="fill-[var(--color-muted)] font-mono"
                fontSize="9"
                letterSpacing="0.14em"
              >
                {row.region}
              </text>
              <line
                x1="40"
                x2="580"
                y1={y + 36}
                y2={y + 36}
                stroke="var(--color-rule)"
                strokeWidth="1"
              />

              {Array.from({ length: row.count }).map((_, dot) => (
                <circle
                  key={dot}
                  cx={DOT_X + dot * DOT_STEP}
                  cy={y + 2}
                  r="9"
                  fill={
                    dot === 0 ? `url(#${ID}-brand)` : "var(--color-o-200)"
                  }
                  data-pop=""
                  style={
                    { "--d": delay + dot * 55 } as React.CSSProperties
                  }
                />
              ))}
            </g>
          );
        })}

        <text
          x="40"
          y="440"
          className="fill-[var(--color-muted)] font-sans"
          fontSize="11.5"
        >
          Some engagements sit under non disclosure and are not named at all.
        </text>
      </svg>
    </figure>
  );
}
