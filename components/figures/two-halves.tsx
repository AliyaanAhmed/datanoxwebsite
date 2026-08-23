import { FigureDefs } from "./defs";

/**
 * Figure 06. Two operating systems above unchanged core systems.
 *
 * The point your own copy makes and that no competitor page makes: neither
 * product replaces what sits underneath. They fill the gap those core systems
 * were never built to cover, which is the connection between the two sides.
 */

const ID = "f6";

export function FigTwoHalves({ className = "" }: { className?: string }) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 760 400"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>
          InsureOS and BrokerOS sitting above the core systems each side
          already runs
        </title>
        <desc id={`${ID}-d`}>
          An insurer keeps its policy administration system and a broker keeps
          its agency system. InsureOS sits above one, BrokerOS above the other,
          and the two connect to each other. Neither replaces the core system
          underneath it.
        </desc>

        <FigureDefs id={ID} />

        {/* The connection, drawn first so the panels sit over it */}
        <g data-pop="" style={{ "--d": 620 } as React.CSSProperties}>
          <path
            d="M336 150 h 88"
            stroke={`url(#${ID}-fade)`}
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            data-draw=""
            style={{ "--len": 1, "--d": 660 } as React.CSSProperties}
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
                offsetPath: 'path("M336 150 h 88")',
                "--d": 1400,
              } as React.CSSProperties
            }
          />
          <text
            x="380"
            y="234"
            textAnchor="middle"
            className="fill-[var(--color-o-800)] font-mono"
            fontSize="10.5"
            letterSpacing="0.1em"
          >
            GOVERNED API
          </text>
          <path
            d="M380 158 v 58"
            stroke="var(--color-o-300)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            pathLength={1}
            data-draw=""
            style={{ "--len": 1, "--d": 760 } as React.CSSProperties}
          />
        </g>

        {/* InsureOS */}
        <g data-pop="" style={{ "--d": 60 } as React.CSSProperties}>
          <rect
            x="20"
            y="98"
            width="316"
            height="104"
            rx="20"
            fill={`url(#${ID}-slab)`}
            stroke="var(--color-o-300)"
            filter={`url(#${ID}-soft)`}
          />
          <text
            x="44"
            y="132"
            className="fill-[var(--color-o-700)] font-mono"
            fontSize="10.5"
            letterSpacing="0.14em"
          >
            FOR INSURERS
          </text>
          <text
            x="44"
            y="162"
            className="fill-[var(--color-ink)] font-display"
            fontSize="24"
            fontWeight="660"
          >
            InsureOS
          </text>
          <text
            x="44"
            y="184"
            className="fill-[var(--color-body)] font-sans"
            fontSize="12.5"
          >
            Design products, govern the channel
          </text>
        </g>

        {/* BrokerOS */}
        <g data-pop="" style={{ "--d": 160 } as React.CSSProperties}>
          <rect
            x="424"
            y="98"
            width="316"
            height="104"
            rx="20"
            fill={`url(#${ID}-slab)`}
            stroke="var(--color-o-300)"
            filter={`url(#${ID}-soft)`}
          />
          <text
            x="448"
            y="132"
            className="fill-[var(--color-o-700)] font-mono"
            fontSize="10.5"
            letterSpacing="0.14em"
          >
            FOR BROKERS
          </text>
          <text
            x="448"
            y="162"
            className="fill-[var(--color-ink)] font-display"
            fontSize="24"
            fontWeight="660"
          >
            BrokerOS
          </text>
          <text
            x="448"
            y="184"
            className="fill-[var(--color-body)] font-sans"
            fontSize="12.5"
          >
            Run the whole book of business
          </text>
        </g>

        {/* Vertical joins down to the core systems */}
        {[178, 582].map((x, index) => (
          <path
            key={x}
            d={`M${x} 202 v 62`}
            stroke="var(--color-o-200)"
            strokeWidth="2"
            strokeDasharray="5 5"
            pathLength={1}
            data-draw=""
            style={{ "--len": 1, "--d": 780 + index * 90 } as React.CSSProperties}
          />
        ))}

        {/* The core systems, unchanged */}
        {[
          { x: 20, label: "Policy administration", sub: "The insurer's core system" },
          { x: 424, label: "Agency management", sub: "The broker's core system" },
        ].map((core, index) => (
          <g
            key={core.x}
            data-pop=""
            style={{ "--d": 900 + index * 90 } as React.CSSProperties}
          >
            <rect
              x={core.x}
              y="264"
              width="316"
              height="86"
              rx="18"
              fill="#fff"
              stroke="var(--color-rule-strong)"
              strokeDasharray="6 5"
            />
            <text
              x={core.x + 24}
              y="298"
              className="fill-[var(--color-ink-2)] font-display"
              fontSize="16"
              fontWeight="620"
            >
              {core.label}
            </text>
            <text
              x={core.x + 24}
              y="320"
              className="fill-[var(--color-muted)] font-sans"
              fontSize="12.5"
            >
              {core.sub}
            </text>
            <text
              x={core.x + 24}
              y="340"
              className="fill-[var(--color-muted)] font-mono"
              fontSize="9.5"
              letterSpacing="0.1em"
            >
              UNCHANGED
            </text>
          </g>
        ))}

        <text
          x="380"
          y="50"
          textAnchor="middle"
          className="fill-[var(--color-ink)] font-display"
          fontSize="20"
          fontWeight="640"
          data-pop=""
          style={{ "--d": 240 } as React.CSSProperties}
        >
          Two operating layers. Neither replaces what is underneath.
        </text>

        <text
          x="380"
          y="384"
          textAnchor="middle"
          className="fill-[var(--color-muted)] font-sans"
          fontSize="13"
          data-pop=""
          style={{ "--d": 1060 } as React.CSSProperties}
        >
          The gap the core systems were never built to cover is the one between them.
        </text>
      </svg>
    </figure>
  );
}
