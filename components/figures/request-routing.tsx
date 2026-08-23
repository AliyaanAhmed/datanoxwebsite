import { FigureDefs } from "./defs";

/**
 * Figure 08. One request, routed.
 *
 * A student enters information once. Rules fan the request out to the
 * departments that have to act, they work in parallel rather than in a queue,
 * and the outcome comes back as one answer. The current alternative is the
 * same request forwarded three times by email.
 */

const ID = "f8";

const departments = [
  { name: "Admissions", y: 74 },
  { name: "Finance", y: 170 },
  { name: "Academic records", y: 266 },
];

export function FigRequestRouting({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 760 360"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          One student request routed to three departments at once
        </title>
        <desc id={`${ID}-d`}>
          A student enters their information and uploads documents once. Rules
          route the request to admissions, finance and academic records at the
          same time rather than one after another, and the three responses come
          back as a single outcome.
        </desc>

        <FigureDefs id={ID} />

        {/* The request */}
        <g data-pop="" style={{ "--d": 0 } as React.CSSProperties}>
          <rect
            x="16"
            y="132"
            width="150"
            height="96"
            rx="18"
            fill={`url(#${ID}-card)`}
            stroke="var(--color-rule)"
            filter={`url(#${ID}-soft)`}
          />
          <rect x="38" y="158" width="106" height="9" rx="4.5" fill="var(--color-o-100)" />
          <rect x="38" y="174" width="72" height="9" rx="4.5" fill="var(--color-o-100)" />
          <rect
            x="38"
            y="192"
            width="106"
            height="20"
            rx="7"
            fill="var(--color-o-50)"
            stroke="var(--color-o-400)"
          />
          <text
            x="91"
            y="122"
            textAnchor="middle"
            className="fill-[var(--color-ink)] font-display"
            fontSize="15"
            fontWeight="620"
          >
            Entered once
          </text>
        </g>

        {/* Routing rules */}
        <g data-pop="" style={{ "--d": 180 } as React.CSSProperties}>
          <rect
            x="216"
            y="152"
            width="112"
            height="56"
            rx="16"
            fill={`url(#${ID}-brand)`}
          />
          <text
            x="272"
            y="177"
            textAnchor="middle"
            className="fill-white font-display"
            fontSize="14"
            fontWeight="620"
          >
            Routing
          </text>
          <text
            x="272"
            y="194"
            textAnchor="middle"
            className="fill-white font-mono"
            fontSize="9.5"
            letterSpacing="0.1em"
            opacity="0.85"
          >
            RULES
          </text>
        </g>

        <path
          d="M166 180 h 44"
          stroke="var(--color-o-400)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          data-draw=""
          style={{ "--len": 1, "--d": 260 } as React.CSSProperties}
        />

        {/* Fan out to three departments, in parallel */}
        {departments.map((dept, index) => {
          const path = `M328 180 C378 180 378 ${dept.y + 26} 428 ${dept.y + 26}`;
          return (
            <g key={dept.name}>
              <path
                d={path}
                fill="none"
                stroke={`url(#${ID}-fade)`}
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength={1}
                data-draw=""
                style={{ "--len": 1, "--d": 380 + index * 110 } as React.CSSProperties}
              />
              <rect
                width="8"
                height="8"
                rx="2.5"
                x="-4"
                y="-4"
                fill="var(--color-o-600)"
                data-travel=""
                style={
                  {
                    offsetPath: `path("${path}")`,
                    "--d": 1500 + index * 220,
                  } as React.CSSProperties
                }
              />
              <g
                data-pop=""
                style={{ "--d": 560 + index * 110 } as React.CSSProperties}
              >
                <rect
                  x="428"
                  y={dept.y}
                  width="180"
                  height="52"
                  rx="16"
                  fill="#fff"
                  stroke="var(--color-o-200)"
                />
                <circle cx="454" cy={dept.y + 26} r="5" fill="var(--color-o-500)" />
                <text
                  x="470"
                  y={dept.y + 31}
                  className="fill-[var(--color-ink-2)] font-sans"
                  fontSize="13.5"
                >
                  {dept.name}
                </text>
              </g>

              {/* converge back into one outcome */}
              <path
                d={`M608 ${dept.y + 26} C660 ${dept.y + 26} 660 180 700 180`}
                fill="none"
                stroke="var(--color-o-200)"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                data-draw=""
                style={{ "--len": 1, "--d": 900 + index * 90 } as React.CSSProperties}
              />
            </g>
          );
        })}

        {/* The outcome */}
        <g data-pop="" style={{ "--d": 1180 } as React.CSSProperties}>
          <circle cx="722" cy="180" r="22" fill={`url(#${ID}-brand)`} />
          <path
            d="M712 180l7 7 13 -14"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <text
          x="272"
          y="248"
          textAnchor="middle"
          className="fill-[var(--color-muted)] font-mono"
          fontSize="10"
          letterSpacing="0.1em"
          data-pop=""
          style={{ "--d": 700 } as React.CSSProperties}
        >
          IN PARALLEL, NOT IN A QUEUE
        </text>

        <text
          x="380"
          y="336"
          textAnchor="middle"
          className="fill-[var(--color-ink)] font-display"
          fontSize="16"
          fontWeight="620"
          data-pop=""
          style={{ "--d": 1260 } as React.CSSProperties}
        >
          Seconds, where the same request used to take days.
        </text>
      </svg>
    </figure>
  );
}
