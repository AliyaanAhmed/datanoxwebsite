/**
 * Icon set.
 *
 * One drawing style throughout: 24 unit grid, 1.6 stroke, round joins,
 * currentColor. Each icon draws the thing it names rather than reaching for a
 * generic glyph, so a budget icon is a budget and an approval icon is an
 * approval.
 */

import type { SVGProps } from "react";

export type IconName =
  | "budget"
  | "chart"
  | "target"
  | "gauge"
  | "plan"
  | "layers"
  | "drag"
  | "template"
  | "preview"
  | "database"
  | "card"
  | "steps"
  | "rubric"
  | "check"
  | "dashboard"
  | "shield"
  | "record"
  | "variety"
  | "route"
  | "rules"
  | "error"
  | "remote"
  | "send"
  | "link"
  | "api"
  | "handshake"
  | "book"
  | "clock"
  | "people"
  | "globe"
  | "portal"
  | "tender";

type Props = SVGProps<SVGSVGElement> & { name: IconName };

const paths: Record<IconName, React.ReactNode> = {
  budget: (
    <>
      <path d="M3 20h18" />
      <rect x="5" y="12" width="3.6" height="6" rx="1.2" />
      <rect x="10.2" y="8" width="3.6" height="10" rx="1.2" />
      <rect x="15.4" y="4.5" width="3.6" height="13.5" rx="1.2" />
    </>
  ),
  chart: (
    <>
      <path d="M3 20h18M4 16l4.5-5 3.5 3L20 6" />
      <circle cx="20" cy="6" r="1.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 4v2.4M12 17.6V20M4 12h2.4M17.6 12H20" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="M12 17l4.2-5" />
      <circle cx="12" cy="17" r="1.3" />
    </>
  ),
  plan: (
    <>
      <rect x="4" y="4.5" width="16" height="15.5" rx="2.6" />
      <path d="M4 9h16M8.5 3v3M15.5 3v3M8 13h4M8 16.5h6" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z" />
      <path d="M3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </>
  ),
  drag: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
      <path d="M17 14.5v5.5M14.2 17.2h5.6" />
    </>
  ),
  template: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2.6" />
      <path d="M3.5 9h17M9 9v11" />
    </>
  ),
  preview: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.6" />
      <path d="M2.5 9.5h19M6 15h4" />
    </>
  ),
  steps: (
    <>
      <path d="M3.5 19h4v-4h4v-4h4V7h5" />
    </>
  ),
  rubric: (
    <>
      <path d="M4 6h9M4 12h6M4 18h8" />
      <circle cx="18" cy="6" r="1.6" />
      <circle cx="15" cy="12" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.2 12.2 11 15l5-5.6" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.6" />
      <path d="M3 9h18M8 9v11" />
      <path d="M12 16.5l2.5-2.6 1.8 1.7 2.2-2.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.6c0 4.3-2.9 7.6-7 9.4-4.1-1.8-7-5.1-7-9.4V6l7-3Z" />
      <path d="M9.2 12.2 11.3 14.3l3.8-4" />
    </>
  ),
  record: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2.6" />
      <path d="M8 8.5h8M8 12.5h8M8 16.5h4.5" />
    </>
  ),
  variety: (
    <>
      <circle cx="7" cy="7" r="3.4" />
      <rect x="13.5" y="3.6" width="6.8" height="6.8" rx="2" />
      <path d="M7 13.5 10.6 20.4H3.4L7 13.5Z" />
      <path d="M13.6 17h6.8" />
    </>
  ),
  route: (
    <>
      <circle cx="5.5" cy="12" r="2.2" />
      <circle cx="18.5" cy="5.5" r="2.2" />
      <circle cx="18.5" cy="18.5" r="2.2" />
      <path d="M7.7 12h3.3c1.6 0 2.4-.9 3-2l1-1.9M7.7 12h3.3c1.6 0 2.4.9 3 2l1 1.9" />
    </>
  ),
  rules: (
    <>
      <path d="M5 4.5h14M5 12h9M5 19.5h11" />
      <path d="M17.5 10.4 19.2 12l3-3.2" />
      <path d="M19 17.6l1.7 1.7 2.3-2.5" />
    </>
  ),
  error: (
    <>
      <path d="M12 4.5 21 19.5H3L12 4.5Z" />
      <path d="M12 10v4M12 16.8v.4" />
    </>
  ),
  remote: (
    <>
      <rect x="2.5" y="5" width="19" height="12" rx="2.4" />
      <path d="M8.5 20h7M12 17v3" />
      <path d="M9.4 11.2 11.2 13l3.8-3.8" />
    </>
  ),
  send: (
    <>
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3 14.4 21l-3.9-7.5L3 9.6 21 3Z" />
    </>
  ),
  link: (
    <>
      <path d="M10 13.8a4.2 4.2 0 0 0 6.2.5l2.5-2.5a4.2 4.2 0 0 0-5.9-5.9l-1.4 1.4" />
      <path d="M14 10.2a4.2 4.2 0 0 0-6.2-.5l-2.5 2.5a4.2 4.2 0 0 0 5.9 5.9l1.4-1.4" />
    </>
  ),
  api: (
    <>
      <path d="M8.5 4.5 3.5 12l5 7.5M15.5 4.5l5 7.5-5 7.5" />
      <path d="M13.6 7.5 10.4 16.5" />
    </>
  ),
  handshake: (
    <>
      <path d="M2.8 12.5 6 9.3l3.4 2.9 2.6-2.3 2.6 2.3L18 9.3l3.2 3.2" />
      <path d="M6 9.3V17a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.3" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H20v15H6.2A2.2 2.2 0 0 0 4 20.2V5.2Z" />
      <path d="M4 18a2.2 2.2 0 0 0 2.2 2.2H20" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.6a3.2 3.2 0 0 1 0 6.2M17.2 14.6a5.5 5.5 0 0 1 3.3 4.9" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5a13 13 0 0 1 0 17 13 13 0 0 1 0-17Z" />
    </>
  ),
  portal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.6" />
      <path d="M3 8.5h18" />
      <circle cx="6.2" cy="6.2" r=".9" fill="currentColor" stroke="none" />
      <path d="M8 13h8M8 16.4h5" />
    </>
  ),
  tender: (
    <>
      <path d="M6 3.5h8.5L19 8v12.5H6V3.5Z" />
      <path d="M14 3.5V8h4.6" />
      <path d="M9 13h6M9 16.4h4" />
    </>
  ),
};

export function Icon({ name, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

/** The standard tinted icon chip used across capability blocks. */
export function IconChip({
  name,
  className = "",
  size = "md",
}: {
  name: IconName;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const box =
    size === "lg" ? "h-14 w-14 p-3.5" : size === "sm" ? "h-9 w-9 p-2" : "h-11 w-11 p-2.5";
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-md bg-gradient-to-br from-o-50 to-o-100 text-o-700 ring-1 ring-o-100 ${box} ${className}`}
    >
      <Icon name={name} className="h-full w-full" />
    </span>
  );
}
