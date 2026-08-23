import { FigureDefs } from "./defs";

/**
 * Figure 05. Two routes a form submission can take.
 *
 * The upper route is what a standalone form tool requires: export, transform,
 * sync, then hope the two copies still agree. The lower route is what a
 * Dataverse native form does. The contrast is the product argument, so the
 * figure draws both rather than only the good one.
 */

const ID = "f5";

const detour = [
  { label: "Export", x: 214 },
  { label: "Transform", x: 350 },
  { label: "Sync", x: 486 },
];

export function FigFormToRecord({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 760 380"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          A standalone form tool needs three steps to reach Dataverse, Intelli
          Form needs none
        </title>
        <desc id={`${ID}-d`}>
          A submission from a standalone form builder has to be exported,
          transformed and synced before it reaches the Dataverse table, and each
          step is a place the two copies can drift apart. A submission from
          Intelli Form is written into the table directly.
        </desc>

        <FigureDefs id={ID} />

        {/* The submission, shared origin for both routes */}
        <g data-pop="" style={{ "--d": 0 } as React.CSSProperties}>
          <rect
            x="20"
            y="140"
            width="128"
            height="100"
            rx="18"
            fill={`url(#${ID}-card)`}
            stroke="var(--color-rule)"
            filter={`url(#${ID}-soft)`}
          />
          <rect x="40" y="164" width="88" height="9" rx="4.5" fill="var(--color-o-100)" />
          <rect x="40" y="180" width="60" height="9" rx="4.5" fill="var(--color-o-100)" />
          <rect
            x="40"
            y="198"
            width="88"
            height="22"
            rx="8"
            fill="var(--color-o-50)"
            stroke="var(--color-o-400)"
          />
          <rect x="50" y="206" width="36" height="6" rx="3" fill="var(--color-o-600)" />
          <text
            x="84"
            y="128"
            textAnchor="middle"
            className="fill-[var(--color-ink)] font-display"
            fontSize="15"
            fontWeight="620"
          >
            One submission
          </text>
        </g>

        {/* ---- Upper route: the standalone tool detour ---- */}
        <text
          x="214"
          y="42"
          className="fill-[var(--color-muted)] font-mono"
          fontSize="11"
          letterSpacing="0.12em"
          data-pop=""
          style={{ "--d": 160 } as React.CSSProperties}
        >
          A STANDALONE FORM TOOL
        </text>

        <path
          d="M156 168 C186 168 186 82 214 82"
          fill="none"
          stroke="var(--color-o-300)"
          strokeWidth="2"
          strokeDasharray="6 6"
          pathLength={1}
          data-draw=""
          style={{ "--len": 1, "--d": 240 } as React.CSSProperties}
        />

        {detour.map((stop, index) => (
          <g
            key={stop.label}
            data-pop=""
            style={{ "--d": 320 + index * 110 } as React.CSSProperties}
          >
            <rect
              x={stop.x}
              y="62"
              width="112"
              height="40"
              rx="14"
              fill="#fff"
              stroke="var(--color-o-200)"
            />
            <text
              x={stop.x + 56}
              y="87"
              textAnchor="middle"
              className="fill-[var(--color-ink-2)] font-sans"
              fontSize="13.5"
            >
              {stop.label}
            </text>
            {index < detour.length - 1 ? (
              <path
                d={`M${stop.x + 112} 82 h 24`}
                stroke="var(--color-o-300)"
                strokeWidth="2"
                strokeDasharray="5 5"
                pathLength={1}
                data-draw=""
                style={{ "--len": 1, "--d": 380 + index * 110 } as React.CSSProperties}
              />
            ) : null}
          </g>
        ))}

        <path
          d="M598 82 C640 82 640 168 668 168"
          fill="none"
          stroke="var(--color-o-300)"
          strokeWidth="2"
          strokeDasharray="6 6"
          pathLength={1}
          data-draw=""
          style={{ "--len": 1, "--d": 660 } as React.CSSProperties}
        />

        <text
          x="380"
          y="126"
          textAnchor="middle"
          className="fill-[var(--color-o-800)] font-mono"
          fontSize="10.5"
          letterSpacing="0.08em"
          data-pop=""
          style={{ "--d": 760 } as React.CSSProperties}
        >
          THREE PLACES THE TWO COPIES CAN DRIFT APART
        </text>

        {/* ---- Lower route: direct ---- */}
        <text
          x="214"
          y="290"
          className="fill-[var(--color-o-700)] font-mono"
          fontSize="11"
          letterSpacing="0.12em"
          data-pop=""
          style={{ "--d": 820 } as React.CSSProperties}
        >
          INTELLI FORM
        </text>

        <path
          d="M156 212 C260 212 300 306 668 306"
          fill="none"
          stroke={`url(#${ID}-fade)`}
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          data-draw=""
          style={{ "--len": 1, "--d": 880 } as React.CSSProperties}
        />

        <rect
          width="9"
          height="9"
          rx="2.5"
          x="-4.5"
          y="-4.5"
          fill="var(--color-o-600)"
          data-travel=""
          style={
            {
              offsetPath: 'path("M156 212 C260 212 300 306 668 306")',
              "--d": 1700,
            } as React.CSSProperties
          }
        />

        <text
          x="392"
          y="336"
          textAnchor="middle"
          className="fill-[var(--color-o-800)] font-display"
          fontSize="15"
          fontWeight="620"
          data-pop=""
          style={{ "--d": 1300 } as React.CSSProperties}
        >
          Straight into the table it belongs to
        </text>

        {/* The Dataverse table both routes are trying to reach */}
        <g data-pop="" style={{ "--d": 200 } as React.CSSProperties}>
          <rect
            x="668"
            y="128"
            width="72"
            height="216"
            rx="18"
            fill={`url(#${ID}-slab)`}
            stroke="var(--color-o-200)"
            filter={`url(#${ID}-soft)`}
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x="686"
              y={162 + i * 28}
              width="36"
              height="8"
              rx="4"
              fill={i === 3 ? "var(--color-o-600)" : "var(--color-o-200)"}
              data-pop=""
              style={{ "--d": 1500 + i * 60 } as React.CSSProperties}
            />
          ))}
          <text
            x="704"
            y="150"
            textAnchor="middle"
            className="fill-[var(--color-o-700)] font-mono"
            fontSize="9.5"
            letterSpacing="0.1em"
          >
            DATAVERSE
          </text>
        </g>
      </svg>
    </figure>
  );
}
