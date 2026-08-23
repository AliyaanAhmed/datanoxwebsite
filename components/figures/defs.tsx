/**
 * Shared gradient, shadow and texture definitions for every figure.
 *
 * Rendered once per figure so each SVG stays self contained and portable.
 * The whole system is built from the orange ramp, which is what gives the
 * figures depth without introducing a second hue.
 */
export function FigureDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-brand`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="var(--color-o-500)" />
        <stop offset="1" stopColor="var(--color-o-600)" />
      </linearGradient>

      <linearGradient id={`${id}-warm`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--color-o-50)" />
        <stop offset="1" stopColor="var(--color-o-100)" />
      </linearGradient>

      <linearGradient id={`${id}-slab`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff7ef" />
        <stop offset="1" stopColor="var(--color-o-100)" />
      </linearGradient>

      <linearGradient id={`${id}-card`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#fffaf5" />
      </linearGradient>

      <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="var(--color-o-400)" stopOpacity="0.55" />
        <stop offset="0.5" stopColor="var(--color-o-600)" stopOpacity="1" />
        <stop offset="1" stopColor="var(--color-o-400)" stopOpacity="0.55" />
      </linearGradient>

      <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow
          dx="0"
          dy="6"
          stdDeviation="9"
          floodColor="#7a3e0c"
          floodOpacity="0.1"
        />
      </filter>

      <filter id={`${id}-lift`} x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow
          dx="0"
          dy="12"
          stdDeviation="16"
          floodColor="#7a3e0c"
          floodOpacity="0.16"
        />
      </filter>

      {/* The record grid inside the data slab. Patient repetition, not noise. */}
      <pattern
        id={`${id}-grid`}
        width="17"
        height="17"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M17 0H0v17"
          fill="none"
          stroke="var(--color-o-600)"
          strokeOpacity="0.11"
          strokeWidth="1"
        />
      </pattern>
    </defs>
  );
}
