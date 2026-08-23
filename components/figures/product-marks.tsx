import { FigureDefs } from "./defs";

/**
 * Product marks. One small figure per product, each drawing the thing that
 * product actually produces rather than a generic icon.
 *
 * These sit inside the product cards, so they stay legible at 120 pixels and
 * animate with the card rather than independently.
 */

function Frame({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <svg viewBox="0 0 220 140" role="img" aria-label={label} className="w-full">
      <FigureDefs id={id} />
      <rect x="0" y="0" width="220" height="140" rx="16" fill={`url(#${id}-warm)`} />
      {children}
    </svg>
  );
}

/** Budgeting, KPI reporting and a maturity score. */
export function MarkGovernance() {
  const id = "mg";
  return (
    <Frame id={id} label="A budget chart with an approval trail and a score">
      <g>
        {[
          { x: 24, h: 32 },
          { x: 50, h: 50 },
          { x: 76, h: 40 },
          { x: 102, h: 66 },
        ].map((b, i) => (
          <rect
            key={b.x}
            x={b.x}
            y={110 - b.h}
            width="17"
            height={b.h}
            rx="5"
            fill={i === 3 ? `url(#${id}-brand)` : "var(--color-o-300)"}
            data-grow=""
            style={{ "--d": 120 + i * 80 } as React.CSSProperties}
          />
        ))}
        <path d="M20 110h108" stroke="var(--color-o-300)" strokeWidth="1.5" />
      </g>
      <g data-pop="" style={{ "--d": 460 } as React.CSSProperties}>
        <rect
          x="144"
          y="30"
          width="56"
          height="56"
          rx="16"
          fill="#fff"
          stroke="var(--color-o-200)"
        />
        <text
          x="172"
          y="64"
          textAnchor="middle"
          className="fill-[var(--color-o-700)] font-display"
          fontSize="20"
          fontWeight="680"
        >
          A
        </text>
        <text
          x="172"
          y="104"
          textAnchor="middle"
          className="fill-[var(--color-muted)] font-sans"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.02em"
        >
          Maturity
        </text>
      </g>
    </Frame>
  );
}

/** A field captured once, landing straight in a table row. */
export function MarkIntelliForm() {
  const id = "mf";
  return (
    <Frame id={id} label="A form field writing directly into a table row">
      <g data-pop="" style={{ "--d": 80 } as React.CSSProperties}>
        <rect
          x="20"
          y="24"
          width="92"
          height="92"
          rx="14"
          fill="#fff"
          stroke="var(--color-o-200)"
        />
        <rect x="32" y="40" width="68" height="9" rx="4.5" fill="var(--color-o-100)" />
        <rect x="32" y="56" width="46" height="9" rx="4.5" fill="var(--color-o-100)" />
        <rect
          x="32"
          y="74"
          width="68"
          height="24"
          rx="8"
          fill="var(--color-o-50)"
          stroke="var(--color-o-400)"
        />
        <rect x="40" y="83" width="30" height="6" rx="3" fill="var(--color-o-600)" />
      </g>
      <path
        d="M118 70h30"
        stroke="var(--color-o-600)"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        data-draw=""
        style={{ "--len": 1, "--d": 400 } as React.CSSProperties}
      />
      <path
        d="M143 64l7 6-7 6"
        fill="none"
        stroke="var(--color-o-600)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-pop=""
        style={{ "--d": 620 } as React.CSSProperties}
      />
      <g data-pop="" style={{ "--d": 700 } as React.CSSProperties}>
        <rect
          x="156"
          y="38"
          width="46"
          height="64"
          rx="12"
          fill="#fff"
          stroke="var(--color-o-200)"
        />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="166"
            y={50 + i * 14}
            width="26"
            height="6"
            rx="3"
            fill={i === 1 ? "var(--color-o-600)" : "var(--color-o-200)"}
          />
        ))}
      </g>
    </Frame>
  );
}

/** Weighted rubric rows resolving into one outcome. */
export function MarkIntelliAssessment() {
  const id = "ma";
  return (
    <Frame id={id} label="Weighted rubric rows resolving into a single outcome">
      <g>
        {[
          { w: 74, d: 100 },
          { w: 52, d: 180 },
          { w: 64, d: 260 },
        ].map((row, i) => (
          <g key={i} data-pop="" style={{ "--d": row.d } as React.CSSProperties}>
            <rect
              x="20"
              y={34 + i * 26}
              width="88"
              height="10"
              rx="5"
              fill="var(--color-o-100)"
            />
            <rect
              x="20"
              y={34 + i * 26}
              width={row.w}
              height="10"
              rx="5"
              fill="var(--color-o-400)"
            />
          </g>
        ))}
        <text
          x="20"
          y="122"
          className="fill-[var(--color-muted)] font-sans"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.02em"
        >
          Weighted Rubric
        </text>
      </g>
      <g data-pop="" style={{ "--d": 420 } as React.CSSProperties}>
        <circle cx="164" cy="60" r="30" fill="none" stroke="var(--color-o-100)" strokeWidth="10" />
        <circle
          cx="164"
          cy="60"
          r="30"
          fill="none"
          stroke={`url(#${id}-brand)`}
          strokeWidth="10"
          strokeLinecap="round"
          transform="rotate(-90 164 60)"
          pathLength={1}
          data-draw=""
          style={{ "--len": 0.78, "--d": 520 } as React.CSSProperties}
        />
        <text
          x="164"
          y="66"
          textAnchor="middle"
          className="fill-[var(--color-ink)] font-display"
          fontSize="16"
          fontWeight="660"
        >
          82
        </text>
        <text
          x="164"
          y="112"
          textAnchor="middle"
          className="fill-[var(--color-o-700)] font-sans"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.02em"
        >
          Pass
        </text>
      </g>
    </Frame>
  );
}

/** A configured insurance product going live as a governed endpoint. */
export function MarkInsureOs() {
  const id = "mi";
  return (
    <Frame id={id} label="An insurance product published as a governed endpoint">
      {/* The product being configured */}
      <g data-pop="" style={{ "--d": 80 } as React.CSSProperties}>
        <rect
          x="20"
          y="30"
          width="86"
          height="80"
          rx="14"
          fill="#fff"
          stroke="var(--color-o-200)"
        />
        <path
          d="M63 44 38 52v16c0 11 10 19 25 24 15-5 25-13 25-24V52Z"
          fill={`url(#${id}-brand)`}
          opacity="0.16"
          stroke="var(--color-o-500)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M55 68l6 6 12-13"
          stroke="var(--color-o-600)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={1}
          data-draw=""
          style={{ "--len": 1, "--d": 420 } as React.CSSProperties}
        />
        <text
          x="63"
          y="102"
          textAnchor="middle"
          className="fill-[var(--color-muted)] font-sans"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.02em"
        >
          Product
        </text>
      </g>

      {/* Published across to the channel */}
      <path
        d="M110 70h34"
        stroke={`url(#${id}-fade)`}
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength={1}
        data-draw=""
        style={{ "--len": 1, "--d": 520 } as React.CSSProperties}
      />
      <rect
        width="7"
        height="7"
        rx="2"
        x="-3.5"
        y="-3.5"
        fill="var(--color-o-600)"
        data-travel=""
        style={
          {
            offsetPath: 'path("M110 70h34")',
            "--d": 900,
          } as React.CSSProperties
        }
      />

      <g data-pop="" style={{ "--d": 300 } as React.CSSProperties}>
        <rect
          x="148"
          y="44"
          width="54"
          height="52"
          rx="13"
          fill={`url(#${id}-brand)`}
        />
        <text
          x="175"
          y="68"
          textAnchor="middle"
          className="fill-white font-mono"
          fontSize="10"
          letterSpacing="0.12em"
        >
          API
        </text>
        <circle cx="175" cy="82" r="4" fill="#fff" opacity="0.9" />
      </g>
    </Frame>
  );
}

/** Quotes returning from every connected insurer, one of them chosen. */
export function MarkBrokerOs() {
  const id = "mb";
  const rows = [
    { y: 34, w: 108, price: "1,240" },
    { y: 62, w: 108, price: "1,090" },
    { y: 90, w: 108, price: "1,375" },
  ];
  return (
    <Frame id={id} label="Three quotes returned side by side, the best one selected">
      {rows.map((row, i) => (
        <g key={row.y} data-pop="" style={{ "--d": 100 + i * 110 } as React.CSSProperties}>
          <rect
            x="20"
            y={row.y}
            width="180"
            height="22"
            rx="8"
            fill="#fff"
            stroke={i === 1 ? "var(--color-o-500)" : "var(--color-o-200)"}
            strokeWidth={i === 1 ? 2 : 1}
          />
          <circle
            cx="34"
            cy={row.y + 11}
            r="5"
            fill={i === 1 ? `url(#${id}-brand)` : "var(--color-o-200)"}
          />
          <rect
            x="46"
            y={row.y + 8}
            width={row.w - 46}
            height="6"
            rx="3"
            fill="var(--color-o-100)"
            data-scale=""
            style={
              { transformOrigin: "46px 0px", "--d": 240 + i * 110 } as React.CSSProperties
            }
          />
          <text
            x="190"
            y={row.y + 15}
            textAnchor="end"
            className={
              i === 1
                ? "fill-[var(--color-o-700)] font-mono"
                : "fill-[var(--color-muted)] font-mono"
            }
            fontSize="10"
          >
            {row.price}
          </text>
        </g>
      ))}
      <text
        x="20"
        y="126"
        className="fill-[var(--color-muted)] font-mono"
        fontSize="8.5"
        letterSpacing="0.1em"
        data-pop=""
        style={{ "--d": 560 } as React.CSSProperties}
      >
        THREE INSURERS, ONE REQUEST
      </text>
    </Frame>
  );
}
