import { FigureDefs } from "./defs";

/**
 * Figure 01. One data model.
 *
 * Three products, each producing a different kind of record, feeding down
 * into a single Dataverse layer. Every card carries a real glyph of what it
 * produces: a form field, a budget bar chart, a scoring ring. The routes
 * draw themselves, then a record travels each one into the slab.
 *
 * Hand authored vector, so it is crisp at any size, animates, themes with the
 * palette, weighs under 6 KB, and its labels are real text a crawler can read.
 * The live site serves its illustrations as rasters embedded inside SVG
 * wrappers at roughly 200 KB each.
 */

const ID = "f1";

export function FigOneDataModel({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={`relative ${className}`}>
      <svg
        viewBox="0 0 760 560"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          Three Datanox products writing into one Dataverse data model
        </title>
        <desc id={`${ID}-d`}>
          Intelli Form produces a form submission, Governance produces a budget
          line, and Intelli Assessment produces an assessment score. All three
          routes lead down into a single Dataverse layer holding every record
          under one set of permissions.
        </desc>

        <FigureDefs id={ID} />

        {/* ---- The routes, drawn first so cards sit above them ---------- */}
        <g fill="none" strokeLinecap="round">
          <path
            id={`${ID}-r1`}
            d="M126 208 C126 300 380 286 380 372"
            stroke={`url(#${ID}-fade)`}
            strokeWidth="2.5"
            pathLength={1}
            data-draw=""
            style={{ "--len": 1, "--d": 520 } as React.CSSProperties}
          />
          <path
            id={`${ID}-r2`}
            d="M380 208 L380 372"
            stroke={`url(#${ID}-fade)`}
            strokeWidth="2.5"
            pathLength={1}
            data-draw=""
            style={{ "--len": 1, "--d": 640 } as React.CSSProperties}
          />
          <path
            id={`${ID}-r3`}
            d="M634 208 C634 300 380 286 380 372"
            stroke={`url(#${ID}-fade)`}
            strokeWidth="2.5"
            pathLength={1}
            data-draw=""
            style={{ "--len": 1, "--d": 760 } as React.CSSProperties}
          />
        </g>

        {/* ---- Records travelling the routes ---------------------------- */}
        <g>
          {[
            { path: `M126 208 C126 300 380 286 380 372`, d: 1500 },
            { path: `M380 208 L380 372`, d: 1900 },
            { path: `M634 208 C634 300 380 286 380 372`, d: 2300 },
          ].map((r, i) => (
            <rect
              key={i}
              width="7"
              height="7"
              rx="2"
              x="-3.5"
              y="-3.5"
              fill="var(--color-o-600)"
              data-travel=""
              style={
                {
                  offsetPath: `path("${r.path}")`,
                  "--d": r.d,
                } as React.CSSProperties
              }
            />
          ))}
        </g>

        {/* ================= Card 1. Intelli Form ======================== */}
        <g
          data-pop=""
          style={{ "--d": 60 } as React.CSSProperties}
          filter={`url(#${ID}-soft)`}
        >
          <rect
            x="20"
            y="42"
            width="212"
            height="166"
            rx="20"
            fill={`url(#${ID}-card)`}
            stroke="var(--color-rule)"
          />
          {/* glyph: a form with a filled field */}
          <rect
            x="44"
            y="72"
            width="164"
            height="14"
            rx="7"
            fill="var(--color-o-100)"
          />
          <rect
            x="44"
            y="96"
            width="112"
            height="14"
            rx="7"
            fill="var(--color-o-100)"
          />
          <rect
            x="44"
            y="120"
            width="164"
            height="26"
            rx="8"
            fill="var(--color-o-50)"
            stroke="var(--color-o-300)"
          />
          <rect
            x="54"
            y="130"
            width="58"
            height="6"
            rx="3"
            fill="var(--color-o-600)"
          />
          <text
            x="44"
            y="180"
            className="fill-[var(--color-ink)] font-display"
            fontSize="19"
            fontWeight="640"
          >
            Intelli Form
          </text>
          <text
            x="44"
            y="197"
            className="fill-[var(--color-muted)] font-mono"
            fontSize="11"
            letterSpacing="0.06em"
          >
            form_submission
          </text>
        </g>

        {/* ================= Card 2. Governance ========================== */}
        <g
          data-pop=""
          style={{ "--d": 180 } as React.CSSProperties}
          filter={`url(#${ID}-soft)`}
        >
          <rect
            x="274"
            y="42"
            width="212"
            height="166"
            rx="20"
            fill={`url(#${ID}-card)`}
            stroke="var(--color-rule)"
          />
          {/* glyph: budget bars, growing */}
          <g>
            {[
              { x: 300, h: 34, c: "var(--color-o-200)" },
              { x: 332, h: 52, c: "var(--color-o-300)" },
              { x: 364, h: 42, c: "var(--color-o-200)" },
              { x: 396, h: 68, c: `url(#${ID}-brand)` },
              { x: 428, h: 58, c: "var(--color-o-300)" },
            ].map((b, i) => (
              <rect
                key={b.x}
                x={b.x}
                y={146 - b.h}
                width="20"
                height={b.h}
                rx="6"
                fill={b.c}
                data-grow=""
                style={{ "--d": 320 + i * 70 } as React.CSSProperties}
              />
            ))}
            <path
              d="M296 146h164"
              stroke="var(--color-rule-strong)"
              strokeWidth="1.5"
            />
          </g>
          <text
            x="298"
            y="180"
            className="fill-[var(--color-ink)] font-display"
            fontSize="19"
            fontWeight="640"
          >
            Governance
          </text>
          <text
            x="298"
            y="197"
            className="fill-[var(--color-muted)] font-mono"
            fontSize="11"
            letterSpacing="0.06em"
          >
            budget_line
          </text>
        </g>

        {/* ================= Card 3. Intelli Assessment ================== */}
        <g
          data-pop=""
          style={{ "--d": 300 } as React.CSSProperties}
          filter={`url(#${ID}-soft)`}
        >
          <rect
            x="528"
            y="42"
            width="212"
            height="166"
            rx="20"
            fill={`url(#${ID}-card)`}
            stroke="var(--color-rule)"
          />
          {/* glyph: a scoring ring */}
          <circle
            cx="580"
            cy="110"
            r="33"
            fill="none"
            stroke="var(--color-o-100)"
            strokeWidth="11"
          />
          <circle
            cx="580"
            cy="110"
            r="33"
            fill="none"
            stroke={`url(#${ID}-brand)`}
            strokeWidth="11"
            strokeLinecap="round"
            transform="rotate(-90 580 110)"
            pathLength={1}
            data-draw=""
            style={{ "--len": 0.78, "--d": 420 } as React.CSSProperties}
          />
          <text
            x="580"
            y="116"
            textAnchor="middle"
            className="fill-[var(--color-ink)] font-display"
            fontSize="17"
            fontWeight="640"
          >
            82
          </text>
          {/* rubric rows */}
          <g>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect
                  x="628"
                  y={88 + i * 20}
                  width="88"
                  height="8"
                  rx="4"
                  fill="var(--color-o-100)"
                />
                <rect
                  x="628"
                  y={88 + i * 20}
                  width={[70, 48, 60][i]}
                  height="8"
                  rx="4"
                  fill="var(--color-o-400)"
                />
              </g>
            ))}
          </g>
          <text
            x="552"
            y="180"
            className="fill-[var(--color-ink)] font-display"
            fontSize="19"
            fontWeight="640"
          >
            Intelli Assessment
          </text>
          <text
            x="552"
            y="197"
            className="fill-[var(--color-muted)] font-mono"
            fontSize="11"
            letterSpacing="0.06em"
          >
            assessment_score
          </text>
        </g>

        {/* ---- The junction where three become one ---------------------- */}
        <g data-pop="" style={{ "--d": 900 } as React.CSSProperties}>
          <circle cx="380" cy="372" r="11" fill="var(--color-canvas)" />
          <circle
            cx="380"
            cy="372"
            r="7"
            fill={`url(#${ID}-brand)`}
          />
        </g>

        {/* ================= The Dataverse slab ========================== */}
        <g
          data-pop=""
          style={{ "--d": 1000 } as React.CSSProperties}
          filter={`url(#${ID}-lift)`}
        >
          <rect
            x="20"
            y="392"
            width="720"
            height="148"
            rx="24"
            fill={`url(#${ID}-slab)`}
            stroke="var(--color-o-200)"
          />
          <rect
            x="20"
            y="392"
            width="720"
            height="148"
            rx="24"
            fill={`url(#${ID}-grid)`}
          />

          <text
            x="48"
            y="432"
            className="fill-[var(--color-o-700)] font-mono"
            fontSize="11"
            letterSpacing="0.14em"
          >
            Dataverse
          </text>
          <text
            x="48"
            y="466"
            className="fill-[var(--color-ink)] font-display"
            fontSize="23"
            fontWeight="640"
          >
            One data model. One set of permissions.
          </text>

          {/* record chips: the three inputs, now sitting side by side */}
          <g>
            {[
              { x: 48, w: 150, label: "form_submission" },
              { x: 210, w: 128, label: "budget_line" },
              { x: 350, w: 158, label: "assessment_score" },
            ].map((chip, i) => (
              <g
                key={chip.label}
                data-pop=""
                style={{ "--d": 1220 + i * 110 } as React.CSSProperties}
              >
                <rect
                  x={chip.x}
                  y="484"
                  width={chip.w}
                  height="28"
                  rx="14"
                  fill="#ffffff"
                  stroke="var(--color-o-200)"
                />
                <circle
                  cx={chip.x + 16}
                  cy="498"
                  r="4"
                  fill="var(--color-o-600)"
                />
                <text
                  x={chip.x + 28}
                  y="502"
                  className="fill-[var(--color-ink-2)] font-mono"
                  fontSize="11"
                >
                  {chip.label}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </figure>
  );
}
