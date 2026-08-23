import { FigureDefs } from "./defs";

/**
 * Figure 16. The migration path.
 *
 * Three columns: what is running on premise, what the assessment decides
 * about each item, and where it lands. The middle column is the argument.
 * Every partner draws the outer two; almost none of them will commit to a
 * per item classification before the contract is signed, because until agents
 * could read the estate cheaply, producing one cost weeks.
 *
 * Retire is drawn in the same weight as the other two on purpose. It is the
 * classification clients are least prepared for and the one that saves them
 * the most money.
 */

const ID = "f16";

const SOURCE = [
  "Entities and fields",
  "Plugins and scripts",
  "Classic workflows",
  "Server hosted reports",
  "Custom portal",
];

const TARGET = [
  "Dataverse",
  "Power Automate",
  "Power BI",
  "Power Pages or code apps",
];

const VERDICTS = [
  { label: "Supported as is", tone: "var(--color-o-200)" },
  { label: "Rebuild properly", tone: "var(--color-o-400)" },
  { label: "Retire, nobody uses it", tone: "var(--color-o-600)" },
];

const CARD_Y = 92;
const CARD_H = 300;
const ROW_TOP = 146;
const ROW_STEP = 44;

export function FigMigrationPath({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 620 480"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          An on premise estate assessed item by item and landed on the cloud
          platform
        </title>
        <desc id={`${ID}-d`}>
          Three columns. On the left, an on premise estate made of entities and
          fields, plugins and scripts, classic workflows, server hosted reports
          and a custom portal. In the middle, an agent assessment that
          classifies each item as supported as it is, needing a proper rebuild,
          or fit to retire because nobody uses it. On the right, the cloud
          destination: Dataverse, Power Automate, Power BI, and Power Pages or
          code apps.
        </desc>

        <FigureDefs id={ID} />

        {/* ---- Source ------------------------------------------------- */}
        <g data-pop="" style={{ "--d": 0 } as React.CSSProperties}>
          <rect
            x="16"
            y={CARD_Y}
            width="172"
            height={CARD_H}
            rx="18"
            fill={`url(#${ID}-card)`}
            stroke="var(--color-o-200)"
            filter={`url(#${ID}-soft)`}
          />
          <text
            x="36"
            y={CARD_Y + 30}
            className="fill-[var(--color-o-700)] font-mono"
            fontSize="9"
            letterSpacing="0.16em"
          >
            ON PREMISE
          </text>
        </g>

        {SOURCE.map((item, index) => (
          <g
            key={item}
            data-pop=""
            style={{ "--d": 120 + index * 70 } as React.CSSProperties}
          >
            <rect
              x="34"
              y={ROW_TOP + index * ROW_STEP}
              width="136"
              height="32"
              rx="9"
              fill="var(--color-o-50)"
              stroke="var(--color-o-100)"
            />
            <text
              x="48"
              y={ROW_TOP + index * ROW_STEP + 21}
              className="fill-[var(--color-ink-2)] font-sans"
              fontSize="10.5"
            >
              {item}
            </text>
          </g>
        ))}

        {/* ---- The assessment, which is the whole point ---------------- */}
        <path
          d="M188 242 H 210"
          stroke="var(--color-o-300)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          data-draw=""
          style={{ "--d": 480 } as React.CSSProperties}
        />

        <g data-pop="" style={{ "--d": 520 } as React.CSSProperties}>
          <rect
            x="210"
            y="150"
            width="184"
            height="184"
            rx="18"
            fill={`url(#${ID}-slab)`}
            stroke="var(--color-o-300)"
            filter={`url(#${ID}-lift)`}
          />
          <text
            x="230"
            y="180"
            className="fill-[var(--color-o-700)] font-mono"
            fontSize="9"
            letterSpacing="0.16em"
          >
            AGENT ASSESSMENT
          </text>
          <text
            x="230"
            y="202"
            className="fill-[var(--color-ink)] font-display"
            fontSize="13"
            fontWeight="650"
          >
            Every item classified
          </text>
        </g>

        {VERDICTS.map((verdict, index) => (
          <g
            key={verdict.label}
            data-pop=""
            style={{ "--d": 620 + index * 100 } as React.CSSProperties}
          >
            <circle cx="238" cy={232 + index * 32} r="6" fill={verdict.tone} />
            <text
              x="254"
              y={236 + index * 32}
              className="fill-[var(--color-body)] font-sans"
              fontSize="10.5"
            >
              {verdict.label}
            </text>
          </g>
        ))}

        <path
          d="M394 242 H 416"
          stroke="var(--color-o-300)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          data-draw=""
          style={{ "--d": 900 } as React.CSSProperties}
        />

        {/* ---- Target -------------------------------------------------- */}
        <g data-pop="" style={{ "--d": 940 } as React.CSSProperties}>
          <rect
            x="416"
            y={CARD_Y}
            width="188"
            height={CARD_H}
            rx="18"
            fill={`url(#${ID}-card)`}
            stroke="var(--color-o-200)"
            filter={`url(#${ID}-soft)`}
          />
          <text
            x="436"
            y={CARD_Y + 30}
            className="fill-[var(--color-o-700)] font-mono"
            fontSize="9"
            letterSpacing="0.16em"
          >
            ON THE CLOUD
          </text>
        </g>

        {TARGET.map((item, index) => (
          <g
            key={item}
            data-pop=""
            style={{ "--d": 1000 + index * 80 } as React.CSSProperties}
          >
            <rect
              x="434"
              y={ROW_TOP + index * ROW_STEP}
              width="152"
              height="32"
              rx="9"
              fill={index === 0 ? `url(#${ID}-brand)` : "var(--color-o-100)"}
              stroke={index === 0 ? "none" : "var(--color-o-200)"}
            />
            <text
              x="448"
              y={ROW_TOP + index * ROW_STEP + 21}
              className={
                index === 0
                  ? "fill-white font-sans"
                  : "fill-[var(--color-ink-2)] font-sans"
              }
              fontSize="10.5"
              fontWeight={index === 0 ? 600 : 400}
            >
              {item}
            </text>
          </g>
        ))}

        <text
          x="16"
          y="440"
          className="fill-[var(--color-muted)] font-sans"
          fontSize="11.5"
        >
          The inventory is the deliverable. The roadmap is built from it, not from a guess.
        </text>
      </svg>
    </figure>
  );
}
