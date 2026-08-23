import { FigureDefs } from "./defs";

/**
 * Figure 04. The maturity index.
 *
 * Six dimensions, each scored against a defined level, with the current
 * position and the target drawn on the same axis. This is the one place
 * competitor research found genuinely open, and the site has never had a
 * picture of what the feature produces.
 */

const ID = "f4";

const dimensions = [
  { name: "Data governance", now: 3, target: 4 },
  { name: "Planning cycle", now: 2, target: 4 },
  { name: "Reporting", now: 4, target: 5 },
  { name: "Approvals", now: 2, target: 3 },
  { name: "Risk and controls", now: 3, target: 5 },
  { name: "Systems and integration", now: 1, target: 3 },
];

const LEVELS = 5;
const TRACK_X = 250;
const TRACK_W = 440;
const ROW_H = 40;
const TOP = 78;

export function FigMaturityIndex({ className = "" }: { className?: string }) {
  const step = TRACK_W / LEVELS;

  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning className={className}>
      <svg
        viewBox="0 0 760 344"
        role="img"
        aria-labelledby={`${ID}-t ${ID}-d`}
        className="w-full"
      >
        <title id={`${ID}-t`}>A maturity index scored across six dimensions</title>
        <desc id={`${ID}-d`}>
          Six dimensions are each scored on a five level scale. Data governance
          sits at level three against a target of four. Planning cycle sits at
          two against four. Reporting sits at four against five. Approvals sits
          at two against three. Risk and controls sits at three against five.
          Systems and integration sits at one against three.
        </desc>

        <FigureDefs id={ID} />

        {/* Level scale */}
        <g>
          {Array.from({ length: LEVELS }, (_, i) => (
            <g key={i}>
              <line
                x1={TRACK_X + step * (i + 1)}
                y1="58"
                x2={TRACK_X + step * (i + 1)}
                y2={TOP + dimensions.length * ROW_H - 8}
                stroke="var(--color-rule)"
                strokeWidth="1"
              />
              <text
                x={TRACK_X + step * (i + 0.5)}
                y="48"
                textAnchor="middle"
                className="fill-[var(--color-muted)] font-mono"
                fontSize="10"
                letterSpacing="0.08em"
              >
                L{i + 1}
              </text>
            </g>
          ))}
        </g>

        {dimensions.map((dimension, index) => {
          const y = TOP + index * ROW_H;
          return (
            <g key={dimension.name}>
              <text
                x="40"
                y={y + 5}
                className="fill-[var(--color-ink-2)] font-sans"
                fontSize="13.5"
              >
                {dimension.name}
              </text>

              {/* track */}
              <rect
                x={TRACK_X}
                y={y - 9}
                width={TRACK_W}
                height="18"
                rx="9"
                fill="var(--color-o-50)"
              />

              {/* target marker */}
              <g data-pop="" style={{ "--d": 520 + index * 70 } as React.CSSProperties}>
                <rect
                  x={TRACK_X + step * dimension.target - 1.5}
                  y={y - 15}
                  width="3"
                  height="30"
                  rx="1.5"
                  fill="var(--color-o-700)"
                  opacity="0.55"
                />
              </g>

              {/* current score */}
              <rect
                x={TRACK_X}
                y={y - 9}
                width={step * dimension.now}
                height="18"
                rx="9"
                fill={`url(#${ID}-brand)`}
                style={
                  {
                    transformBox: "fill-box",
                    transformOrigin: "left center",
                    "--d": 200 + index * 90,
                  } as React.CSSProperties
                }
                data-scale=""
              />

              <text
                x={TRACK_X + step * dimension.now + 14}
                y={y + 5}
                className="fill-[var(--color-o-800)] font-mono"
                fontSize="11"
                data-pop=""
                style={{ "--d": 620 + index * 70 } as React.CSSProperties}
              >
                {dimension.now} of {dimension.target}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g data-pop="" style={{ "--d": 1000 } as React.CSSProperties}>
          <rect x="250" y="308" width="18" height="10" rx="5" fill={`url(#${ID}-brand)`} />
          <text x="276" y="317" className="fill-[var(--color-muted)] font-sans" fontSize="12.5">
            Where the organisation is
          </text>
          <rect x="464" y="304" width="3" height="18" rx="1.5" fill="var(--color-o-700)" opacity="0.55" />
          <text x="478" y="317" className="fill-[var(--color-muted)] font-sans" fontSize="12.5">
            Where the board agreed it should be
          </text>
        </g>
      </svg>
    </figure>
  );
}
