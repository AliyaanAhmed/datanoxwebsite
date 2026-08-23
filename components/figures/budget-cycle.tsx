import { FigureDefs } from "./defs";

/**
 * Figure 03. The budget cycle.
 *
 * Plan, submit, approve, consolidate, report, with the referral loop drawn as
 * an actual loop back to submit, because that is where the real time goes.
 * The order carries information the reader needs, so the steps are numbered.
 */

const ID = "f3";

const steps = [
  { n: "01", label: "Plan", x: 40 },
  { n: "02", label: "Submit", x: 184 },
  { n: "03", label: "Approve", x: 328 },
  { n: "04", label: "Consolidate", x: 472 },
  { n: "05", label: "Report", x: 616 },
];

export function FigBudgetCycle({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 760 300"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>The budget cycle inside Governance and Performance</title>
        <desc id={`${ID}-d`}>
          A budget moves through five stages: plan, submit, approve, consolidate
          and report. Anything sent back for revision returns to the submit
          stage, and every version of the figure is kept.
        </desc>

        <FigureDefs id={ID} />

        {/* The spine the steps sit on */}
        <path
          d="M72 96h592"
          stroke="var(--color-o-200)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          data-draw=""
          style={{ "--len": 1, "--d": 100 } as React.CSSProperties}
        />

        {steps.map((step, index) => (
          <g
            key={step.n}
            data-pop=""
            style={{ "--d": 160 + index * 110 } as React.CSSProperties}
          >
            <circle cx={step.x + 32} cy="96" r="26" fill="#fff" stroke="var(--color-o-200)" />
            <circle
              cx={step.x + 32}
              cy="96"
              r="26"
              fill={index === 2 ? `url(#${ID}-brand)` : "none"}
              opacity={index === 2 ? 1 : 0}
            />
            <text
              x={step.x + 32}
              y="102"
              textAnchor="middle"
              className={`font-mono ${index === 2 ? "fill-white" : "fill-[var(--color-o-700)]"}`}
              fontSize="12"
              fontWeight="500"
            >
              {step.n}
            </text>
            <text
              x={step.x + 32}
              y="146"
              textAnchor="middle"
              className="fill-[var(--color-ink)] font-display"
              fontSize="15"
              fontWeight="620"
            >
              {step.label}
            </text>
          </g>
        ))}

        {/* The referral loop, from approve back to submit */}
        <g data-pop="" style={{ "--d": 780 } as React.CSSProperties}>
          <path
            d="M356 122 C356 196 216 196 216 128"
            fill="none"
            stroke="var(--color-o-600)"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
            pathLength={1}
            data-draw=""
            style={{ "--len": 1, "--d": 820 } as React.CSSProperties}
          />
          <path
            d="M210 134l6-8 6 8"
            fill="none"
            stroke="var(--color-o-600)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="286"
            y="212"
            textAnchor="middle"
            className="fill-[var(--color-o-800)] font-mono"
            fontSize="11"
            letterSpacing="0.08em"
          >
            SENT BACK FOR REVISION
          </text>
        </g>

        {/* What is retained */}
        <g data-pop="" style={{ "--d": 980 } as React.CSSProperties}>
          <rect
            x="40"
            y="240"
            width="680"
            height="46"
            rx="16"
            fill={`url(#${ID}-warm)`}
            stroke="var(--color-o-200)"
          />
          <text
            x="66"
            y="268"
            className="fill-[var(--color-ink-2)] font-sans"
            fontSize="14"
          >
            Every version, every approver and every comment stays with the figure it belongs to.
          </text>
        </g>
      </svg>
    </figure>
  );
}
