/**
 * Small marks for the navigation panels.
 *
 * Each one draws the thing the page is actually about rather than a generic
 * icon, using the same vocabulary as the full figures: rounded geometry,
 * the orange ramp, no second hue.
 */

type IconProps = { className?: string };

const wrap =
  "h-9 w-9 shrink-0 rounded-md bg-o-50 p-2 text-o-600 ring-1 ring-o-100 transition-colors group-hover:bg-o-100";

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`${wrap} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none" className="h-full w-full">
        {children}
      </svg>
    </span>
  );
}

/** Budget bars with one highlighted. */
export function IconGovernance({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2" y="11" width="3.4" height="7" rx="1.2" fill="currentColor" opacity="0.35" />
      <rect x="6.9" y="7.5" width="3.4" height="10.5" rx="1.2" fill="currentColor" opacity="0.55" />
      <rect x="11.8" y="4" width="3.4" height="14" rx="1.2" fill="currentColor" />
      <path d="M2 2h1.2M16.6 9.5H18.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </Shell>
  );
}

/** A form field flowing into a row. */
export function IconForm({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2" y="3" width="10" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.6 7h4.8M4.6 10h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <rect x="4.6" y="12.4" width="4.8" height="2.2" rx="1.1" fill="currentColor" />
      <path d="M14 10h4M16 8l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Shell>
  );
}

/** A scoring ring. */
export function IconAssessment({ className }: IconProps) {
  return (
    <Shell className={className}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.8" opacity="0.28" />
      <path
        d="M10 3a7 7 0 0 1 5.7 11.05"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="2.1" fill="currentColor" />
    </Shell>
  );
}

/** Two hands meeting, for the nonprofit vertical. */
export function IconNonprofit({ className }: IconProps) {
  return (
    <Shell className={className}>
      <path
        d="M10 16.5S3.5 12.8 3.5 8.4A3.4 3.4 0 0 1 10 6.9a3.4 3.4 0 0 1 6.5 1.5c0 4.4-6.5 8.1-6.5 8.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </Shell>
  );
}

/** Two panels bridged, for insurance. */
export function IconInsurance({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2" y="5" width="5.4" height="10" rx="1.8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12.6" y="5" width="5.4" height="10" rx="1.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.8 10h4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </Shell>
  );
}

/** A routed request, for education. */
export function IconEducation({ className }: IconProps) {
  return (
    <Shell className={className}>
      <path d="M2.5 4.5h15L10 8.6 2.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 9v3.2M10 12.2H5.2v3M10 12.2h4.8v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="5.2" cy="16.4" r="1.3" fill="currentColor" />
      <circle cx="14.8" cy="16.4" r="1.3" fill="currentColor" />
    </Shell>
  );
}

export function IconBlog({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="3" y="3.5" width="14" height="13" rx="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 7.5h8M6 10.5h8M6 13.5h4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </Shell>
  );
}

export function IconCaseStudy({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2.5" y="6" width="15" height="10.5" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 6V4.6a1.4 1.4 0 0 1 1.4-1.4h2.2a1.4 1.4 0 0 1 1.4 1.4V6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 12.5l2.4-2.2 2 1.8 3.6-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Shell>
  );
}

export function IconPaper({ className }: IconProps) {
  return (
    <Shell className={className}>
      <path d="M5 2.8h6.2L16 7.4v9.8H5V2.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 2.8v4.6h4.6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.6 11.5h5M7.6 14h3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </Shell>
  );
}

export function IconCompare({ className }: IconProps) {
  return (
    <Shell className={className}>
      <path d="M10 3v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <rect x="2.5" y="6" width="5" height="8" rx="1.6" fill="currentColor" opacity="0.28" />
      <rect x="12.5" y="4" width="5" height="12" rx="1.6" fill="currentColor" />
    </Shell>
  );
}

export function IconAbout({ className }: IconProps) {
  return (
    <Shell className={className}>
      <circle cx="10" cy="7" r="3.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 16.6a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Shell>
  );
}

export function IconPartners({ className }: IconProps) {
  return (
    <Shell className={className}>
      <circle cx="7" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </Shell>
  );
}

/** A server lifted into a cloud: the migration page. */
export function IconMigration({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2.4" y="11.6" width="7" height="5.4" rx="1.6" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <path d="M13 8.4a3 3 0 0 0 0 5.8h1.9a2.6 2.6 0 0 0 .3-5.2 3.3 3.3 0 0 0-6.1-.9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M6 9.6V4.4m0 0L4.1 6.3M6 4.4l1.9 1.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Shell>
  );
}

/** A pediment on columns: the public sector, drawn the way it is signposted. */
export function IconGovernment({ className }: IconProps) {
  return (
    <Shell className={className}>
      <path d="M3 7.4 10 3.4l7 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M5.6 9.2v5.4M10 9.2v5.4M14.4 9.2v5.4" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <path d="M3.2 16.8h13.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Shell>
  );
}

/** A wall of marks, which is literally what the clients page is. */
export function IconClients({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2.6" y="3.4" width="6" height="5.2" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.4" y="3.4" width="6" height="5.2" rx="1.4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <rect x="2.6" y="11.4" width="6" height="5.2" rx="1.4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <rect x="11.4" y="11.4" width="6" height="5.2" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
    </Shell>
  );
}

/** A shield with a policy line: the insurer side. */
export function IconInsureOs({ className }: IconProps) {
  return (
    <Shell className={className}>
      <path
        d="M10 2.4 3.6 4.8v5.1c0 3.4 2.6 6.2 6.4 7.7 3.8-1.5 6.4-4.3 6.4-7.7V4.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7.1 9.6h5.8M7.1 12.3h3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Shell>
  );
}

/** Two nodes and a handshake line: the broker side of the same trade. */
export function IconBrokerOs({ className }: IconProps) {
  return (
    <Shell className={className}>
      <circle cx="5.2" cy="6.4" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14.8" cy="6.4" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.2 9.6v2.2a2 2 0 0 0 2 2h5.6a2 2 0 0 0 2-2V9.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="8.4" y="14.2" width="3.2" height="3.2" rx="1" fill="currentColor" />
    </Shell>
  );
}

/** The Dynamics 365 side: a customer record with a relationship line. */
export function IconD365({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2.5" y="3.5" width="15" height="13" rx="2.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.2" cy="8.4" r="1.9" fill="currentColor" />
      <path d="M4.4 13.4c0-1.5 1.3-2.5 2.8-2.5s2.8 1 2.8 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12.4 8.2h3.1M12.4 11h3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </Shell>
  );
}

/** Power Platform: four tiles on one base. */
export function IconPlatform({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2.6" y="2.6" width="6.2" height="6.2" rx="1.6" fill="currentColor" opacity="0.45" />
      <rect x="11.2" y="2.6" width="6.2" height="6.2" rx="1.6" fill="currentColor" opacity="0.7" />
      <rect x="2.6" y="11.2" width="6.2" height="6.2" rx="1.6" fill="currentColor" opacity="0.7" />
      <rect x="11.2" y="11.2" width="6.2" height="6.2" rx="1.6" fill="currentColor" />
    </Shell>
  );
}

/** AI: a spark inside a bounded process, never outside it. */
export function IconAi({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2.6" y="2.6" width="14.8" height="14.8" rx="3.4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2.6" />
      <path d="M10 5.6l1.35 2.9 2.9 1.35-2.9 1.35L10 14.1l-1.35-2.9-2.9-1.35 2.9-1.35Z" fill="currentColor" />
    </Shell>
  );
}

export function IconContact({ className }: IconProps) {
  return (
    <Shell className={className}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.4 6.4 10 11l6.6-4.6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Shell>
  );
}
