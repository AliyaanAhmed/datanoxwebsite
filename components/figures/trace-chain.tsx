import { FigureDefs } from "./defs";

/**
 * Figure 15. The trace chain.
 *
 * The public sector hero figure. Its whole job is to draw the sentence the
 * page opens with: a number on a dashboard is only worth anything if you can
 * walk back up the chain from it to the decision that caused it.
 *
 * Four links, each carrying its own stamp: who approved it, and when. The
 * stamps are the point of the drawing. Without them this is an ordinary
 * hierarchy diagram, which every vendor in this market already publishes.
 */

const ID = "f15";

const LINKS = [
  {
    eyebrow: "OBJECTIVE",
    title: "Reduce time to decision",
    stamp: "Approved by the executive committee",
  },
  {
    eyebrow: "INITIATIVE",
    title: "Digital permit service",
    stamp: "Funded, reallocation recorded",
  },
  {
    eyebrow: "DELIVERY",
    title: "Power Pages intake live",
    stamp: "Milestone signed off by the service owner",
  },
  {
    eyebrow: "INDICATOR",
    title: "Median days to decision",
    stamp: "Measured from the case record itself",
  },
];

const TOP = 96;
const STEP = 92;
const CARD_X = 34;
const CARD_W = 336;

export function FigTraceChain({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 620 480"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          A traceable chain from strategic objective to measured indicator
        </title>
        <desc id={`${ID}-d`}>
          Four linked records shown in a vertical chain. A strategic objective
          to reduce time to decision funds an initiative, a digital permit
          service. The initiative produces a delivery milestone, a live intake
          form on Power Pages. That in turn is measured by an indicator, the
          median number of days to a decision. Each link carries a stamp naming
          who approved it, so any figure can be traced back to the decision
          behind it.
        </desc>

        <FigureDefs id={ID} />

        <rect
          x="8"
          y="8"
          width="604"
          height="464"
          rx="24"
          fill={`url(#${ID}-card)`}
          stroke="var(--color-o-200)"
          filter={`url(#${ID}-soft)`}
        />

        <text
          x="34"
          y="52"
          className="fill-[var(--color-o-700)] font-mono"
          fontSize="10"
          letterSpacing="0.16em"
        >
          TRACE
        </text>
        <text
          x="34"
          y="74"
          className="fill-[var(--color-ink)] font-display"
          fontSize="17"
          fontWeight="650"
        >
          Every figure walks back to a decision
        </text>

        {/* The spine, drawn once behind the cards. */}
        <path
          d={`M${CARD_X + 18} ${TOP + 30} V ${TOP + STEP * 3 + 30}`}
          stroke="var(--color-o-200)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          pathLength={1}
          data-draw=""
          style={{ "--d": 120 } as React.CSSProperties}
        />

        {LINKS.map((link, index) => {
          const y = TOP + index * STEP;
          const delay = 220 + index * 130;
          return (
            <g key={link.eyebrow}>
              <g data-pop="" style={{ "--d": delay } as React.CSSProperties}>
                <rect
                  x={CARD_X}
                  y={y}
                  width={CARD_W}
                  height="60"
                  rx="14"
                  fill="#ffffff"
                  stroke="var(--color-o-200)"
                />
                <circle
                  cx={CARD_X + 18}
                  cy={y + 30}
                  r="7"
                  fill={
                    index === LINKS.length - 1
                      ? `url(#${ID}-brand)`
                      : "var(--color-o-300)"
                  }
                />
                <text
                  x={CARD_X + 38}
                  y={y + 25}
                  className="fill-[var(--color-o-700)] font-mono"
                  fontSize="8.5"
                  letterSpacing="0.16em"
                >
                  {link.eyebrow}
                </text>
                <text
                  x={CARD_X + 38}
                  y={y + 44}
                  className="fill-[var(--color-ink)] font-sans"
                  fontSize="13.5"
                  fontWeight="500"
                >
                  {link.title}
                </text>
              </g>

              {/* The stamp. The reason this figure is not a hierarchy chart. */}
              <g
                data-pop=""
                style={{ "--d": delay + 90 } as React.CSSProperties}
              >
                <path
                  d={`M${CARD_X + CARD_W} ${y + 30} H ${CARD_X + CARD_W + 22}`}
                  stroke="var(--color-o-200)"
                  strokeWidth="1.5"
                  strokeDasharray="3 4"
                />
                <rect
                  x={CARD_X + CARD_W + 22}
                  y={y + 12}
                  width="198"
                  height="36"
                  rx="10"
                  fill="var(--color-o-50)"
                  stroke="var(--color-o-100)"
                />
                <text
                  x={CARD_X + CARD_W + 36}
                  y={y + 28}
                  className="fill-[var(--color-body)] font-sans"
                  fontSize="10"
                >
                  {link.stamp.length > 32
                    ? link.stamp.slice(0, link.stamp.lastIndexOf(" ", 32))
                    : link.stamp}
                </text>
                <text
                  x={CARD_X + CARD_W + 36}
                  y={y + 41}
                  className="fill-[var(--color-body)] font-sans"
                  fontSize="10"
                >
                  {link.stamp.length > 32
                    ? link.stamp.slice(link.stamp.lastIndexOf(" ", 32) + 1)
                    : ""}
                </text>
              </g>
            </g>
          );
        })}

        <text
          x="34"
          y="450"
          className="fill-[var(--color-muted)] font-sans"
          fontSize="11.5"
        >
          Ask the indicator why it moved, and the answer is three hops up.
        </text>
      </svg>
    </figure>
  );
}
