import { FigureDefs } from "./defs";

/**
 * Figure 02. The gap between two systems.
 *
 * Two platforms, fully built, facing each other across a gap that nobody
 * bought. What crosses it today is email, phone and spreadsheet, drawn as
 * three broken strands. The figure states the problem the whole company
 * exists to solve, so it earns the space it takes.
 */

const ID = "f2";

const carriers = [
  { label: "Email", y: 118 },
  { label: "Phone", y: 168 },
  { label: "Spreadsheet", y: 218 },
];

export function FigDisconnect({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={`relative ${className}`}>
      <svg
        viewBox="0 0 760 330"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          Two systems separated by a gap crossed only by manual work
        </title>
        <desc id={`${ID}-d`}>
          One organisation runs its own platform on the left and a second runs
          its own on the right. Nothing connects them directly, so email, phone
          calls and spreadsheets carry the work across the gap by hand.
        </desc>

        <FigureDefs id={ID} />

        {/* Left platform */}
        <g
          data-pop=""
          style={{ "--d": 0 } as React.CSSProperties}
          filter={`url(#${ID}-soft)`}
        >
          <rect
            x="16"
            y="60"
            width="216"
            height="216"
            rx="22"
            fill={`url(#${ID}-card)`}
            stroke="var(--color-rule)"
          />
          <text
            x="40"
            y="96"
            className="fill-[var(--color-muted)] font-mono"
            fontSize="11"
            letterSpacing="0.14em"
          >
            SIDE A
          </text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x="40"
                y={116 + i * 34}
                width="168"
                height="24"
                rx="8"
                fill="var(--color-o-50)"
              />
              <circle cx="56" cy={128 + i * 34} r="4" fill="var(--color-o-400)" />
              <rect
                x="70"
                y={124 + i * 34}
                width={[104, 78, 120, 92][i]}
                height="8"
                rx="4"
                fill="var(--color-o-200)"
              />
            </g>
          ))}
        </g>

        {/* Right platform */}
        <g
          data-pop=""
          style={{ "--d": 120 } as React.CSSProperties}
          filter={`url(#${ID}-soft)`}
        >
          <rect
            x="528"
            y="60"
            width="216"
            height="216"
            rx="22"
            fill={`url(#${ID}-card)`}
            stroke="var(--color-rule)"
          />
          <text
            x="552"
            y="96"
            className="fill-[var(--color-muted)] font-mono"
            fontSize="11"
            letterSpacing="0.14em"
          >
            SIDE B
          </text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x="552"
                y={116 + i * 34}
                width="168"
                height="24"
                rx="8"
                fill="var(--color-o-50)"
              />
              <circle
                cx="568"
                cy={128 + i * 34}
                r="4"
                fill="var(--color-o-400)"
              />
              <rect
                x="582"
                y={124 + i * 34}
                width={[88, 116, 72, 108][i]}
                height="8"
                rx="4"
                fill="var(--color-o-200)"
              />
            </g>
          ))}
        </g>

        {/* The gap, and what crosses it */}
        <g>
          {carriers.map((carrier, i) => (
            <g key={carrier.label}>
              <path
                d={`M240 ${carrier.y} h 88`}
                stroke="var(--color-o-300)"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                data-draw=""
                style={
                  {
                    strokeDasharray: "0.09 0.07",
                    "--len": 1,
                    "--d": 320 + i * 90,
                  } as React.CSSProperties
                }
              />
              <path
                d={`M432 ${carrier.y} h 88`}
                stroke="var(--color-o-300)"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                data-draw=""
                style={
                  {
                    strokeDasharray: "0.09 0.07",
                    "--len": 1,
                    "--d": 320 + i * 90,
                  } as React.CSSProperties
                }
              />
              <g
                data-pop=""
                style={{ "--d": 480 + i * 90 } as React.CSSProperties}
              >
                <rect
                  x="336"
                  y={carrier.y - 14}
                  width="88"
                  height="28"
                  rx="14"
                  fill="#ffffff"
                  stroke="var(--color-o-200)"
                />
                <text
                  x="380"
                  y={carrier.y + 4}
                  textAnchor="middle"
                  className="fill-[var(--color-ink-2)] font-mono"
                  fontSize="10.5"
                >
                  {carrier.label}
                </text>
              </g>
            </g>
          ))}
        </g>

        {/* The missing connection, marked as absent */}
        <g data-pop="" style={{ "--d": 820 } as React.CSSProperties}>
          <path
            d="M240 292 h 280"
            stroke="var(--color-o-700)"
            strokeWidth="1.5"
            strokeDasharray="2 6"
            opacity="0.5"
          />
          <text
            x="380"
            y="316"
            textAnchor="middle"
            className="fill-[var(--color-o-800)] font-mono"
            fontSize="11"
            letterSpacing="0.1em"
          >
            NO SYSTEM TO SYSTEM LINK
          </text>
        </g>

        <text
          x="380"
          y="40"
          textAnchor="middle"
          className="fill-[var(--color-ink)] font-display"
          fontSize="21"
          fontWeight="640"
          data-pop=""
          style={{ "--d": 200 } as React.CSSProperties}
        >
          Both sides invested. Neither side connected.
        </text>
      </svg>
    </figure>
  );
}
