import { FigureDefs } from "./defs";

/**
 * Figure 12. Policy decomposed into rules, scores rolling back up.
 *
 * The structure Intelli Assessment imposes on a policy document, drawn once
 * rather than described three times. Reading left to right is decomposition:
 * a category holds criteria, a criterion holds questions, a question is
 * answered against rules. Reading right to left is scoring: every question
 * carries a weight, and the weighted result rolls back up to an outcome.
 *
 * The return arc is the part that matters. It is why an outcome can be traced
 * back to the rule and the evidence that produced it, which is what makes a
 * decision survive an appeal.
 */

const ID = "f12";

const NODES = [
  { label: "Category", sub: "A section of policy", x: 20 },
  { label: "Criteria", sub: "A testable condition", x: 200 },
  { label: "Questions", sub: "What is asked", x: 380 },
  { label: "Rules", sub: "How it is judged", x: 560 },
];

const OUTCOMES = [
  { label: "Eligible", solid: true },
  { label: "Conditional", solid: false },
  { label: "Manual review", solid: false },
  { label: "Not eligible", solid: false },
];

export function FigScoringChain({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 760 380"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          A policy broken into categories, criteria, questions and rules, with
          weighted scores rolling back up into an outcome
        </title>
        <desc id={`${ID}-d`}>
          Four boxes run left to right: category, criteria, questions and rules.
          Each breaks the one before it into smaller measurable parts. A curved
          arrow returns from rules to the left, labelled weighted roll up,
          feeding a single overall score. That score resolves to one of four
          outcomes: eligible, conditional, manual review or not eligible. Every
          outcome traces back through the chain to the rule and the evidence
          behind it.
        </desc>

        <FigureDefs id={ID} />

        {/* Decomposition, left to right */}
        {NODES.map((node, index) => (
          <g key={node.label}>
            <g data-pop="" style={{ "--d": index * 110 } as React.CSSProperties}>
              <rect
                x={node.x}
                y="46"
                width="150"
                height="84"
                rx="16"
                fill={index === 3 ? `url(#${ID}-slab)` : "#fff"}
                stroke={index === 3 ? "var(--color-o-400)" : "var(--color-o-200)"}
                filter={`url(#${ID}-soft)`}
              />
              <text
                x={node.x + 20}
                y="80"
                className="fill-[var(--color-ink)] font-display"
                fontSize="17"
                fontWeight="640"
              >
                {node.label}
              </text>
              <text
                x={node.x + 20}
                y="102"
                className="fill-[var(--color-muted)] font-sans"
                fontSize="11.5"
              >
                {node.sub}
              </text>
            </g>

            {index < 3 ? (
              <path
                d={`M${node.x + 150} 88 h 30`}
                stroke="var(--color-o-300)"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                data-draw=""
                style={{ "--len": 1, "--d": 120 + index * 110 } as React.CSSProperties}
              />
            ) : null}
          </g>
        ))}

        <text
          x="20"
          y="28"
          className="fill-[var(--color-muted)] font-mono"
          fontSize="9.5"
          letterSpacing="0.14em"
          data-pop=""
          style={{ "--d": 40 } as React.CSSProperties}
        >
          Policy Broken Down
        </text>

        {/* The roll up, returning right to left */}
        <path
          d="M635 130 C 635 196, 360 196, 250 196 L 118 196 C 100 196, 96 204, 96 214"
          fill="none"
          stroke={`url(#${ID}-fade)`}
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          data-draw=""
          style={{ "--len": 1, "--d": 560 } as React.CSSProperties}
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
              offsetPath:
                'path("M635 130 C 635 196, 360 196, 250 196 L 118 196 C 100 196, 96 204, 96 214")',
              "--d": 1000,
            } as React.CSSProperties
          }
        />
        <text
          x="400"
          y="186"
          textAnchor="middle"
          className="fill-[var(--color-o-800)] font-mono"
          fontSize="10"
          letterSpacing="0.14em"
          data-pop=""
          style={{ "--d": 720 } as React.CSSProperties}
        >
          Weighted Roll Up
        </text>

        {/* The overall score */}
        <g data-pop="" style={{ "--d": 820 } as React.CSSProperties}>
          <rect
            x="20"
            y="214"
            width="152"
            height="76"
            rx="16"
            fill={`url(#${ID}-brand)`}
            filter={`url(#${ID}-lift)`}
          />
          <text
            x="96"
            y="256"
            textAnchor="middle"
            className="fill-white font-display"
            fontSize="30"
            fontWeight="680"
          >
            82
          </text>
          <text
            x="96"
            y="276"
            textAnchor="middle"
            className="fill-white font-mono"
            fontSize="9"
            letterSpacing="0.14em"
            opacity="0.85"
          >
            Overall Score
          </text>
        </g>

        <path
          d="M172 252 h 34"
          stroke="var(--color-o-400)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          data-draw=""
          style={{ "--len": 1, "--d": 900 } as React.CSSProperties}
        />

        {/* Outcomes */}
        {OUTCOMES.map((outcome, index) => (
          <g
            key={outcome.label}
            data-pop=""
            style={{ "--d": 940 + index * 80 } as React.CSSProperties}
          >
            <rect
              x={214 + index * 138}
              y="234"
              width="126"
              height="36"
              rx="18"
              fill={outcome.solid ? "var(--color-o-50)" : "#fff"}
              stroke={outcome.solid ? "var(--color-o-500)" : "var(--color-rule-strong)"}
              strokeWidth={outcome.solid ? 2 : 1}
              strokeDasharray={outcome.solid ? undefined : "5 4"}
            />
            <text
              x={214 + index * 138 + 63}
              y="257"
              textAnchor="middle"
              className={
                outcome.solid
                  ? "fill-[var(--color-o-800)] font-sans"
                  : "fill-[var(--color-muted)] font-sans"
              }
              fontSize="12"
              fontWeight={outcome.solid ? 600 : 400}
            >
              {outcome.label}
            </text>
          </g>
        ))}

        <text
          x="380"
          y="332"
          textAnchor="middle"
          className="fill-[var(--color-body)] font-sans"
          fontSize="13"
          data-pop=""
          style={{ "--d": 1300 } as React.CSSProperties}
        >
          Every outcome traces back through the chain to the rule and the evidence behind it.
        </text>
        <text
          x="380"
          y="356"
          textAnchor="middle"
          className="fill-[var(--color-muted)] font-mono"
          fontSize="9.5"
          letterSpacing="0.14em"
          data-pop=""
          style={{ "--d": 1360 } as React.CSSProperties}
        >
          Audit, Compliance and Appeal Ready
        </text>
      </svg>
    </figure>
  );
}
