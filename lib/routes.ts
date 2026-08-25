/**
 * The route registry.
 *
 * Navigation, the sitemap, breadcrumbs and every internal link read from this
 * one list. A page cannot exist in the nav but be missing from the sitemap,
 * and a link cannot point at a URL that is not a real route.
 *
 * Restructured August 2026 around the three engagement models rather than
 * around the three products. Products, Services and Staff Augmentation are
 * different things bought by different people, and the previous four group
 * navigation made two of the three invisible.
 */

export type RouteKey =
  | "home"
  // Products, five of them, each sold on its own
  | "governance"
  | "intelliForm"
  | "intelliAssessment"
  | "insureos"
  | "brokeros"
  // Services
  | "services"
  | "servicesD365"
  | "servicesPowerPlatform"
  | "servicesAi"
  | "servicesMigration"
  // People
  | "staffAug"
  // Industries
  | "insurance"
  | "financialServices"
  | "notForProfit"
  | "education"
  | "government"
  // Company
  | "company"
  | "partners"
  | "clients"
  | "contact"
  // Reading
  | "blog"
  | "caseStudies"
  | "caseCommunityWork"
  | "resources"
  | "compare"
  // Utility
  | "privacy"
  | "terms"
  | "qr";

type RouteDef = {
  path: string;
  label: string;
  /** Excluded from the sitemap and marked noindex. */
  utility?: boolean;
  changeFrequency?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
};

export const routes: Record<RouteKey, RouteDef> = {
  home: { path: "/", label: "Home", priority: 1, changeFrequency: "weekly" },

  /* ---------------- Products ---------------- */

  governance: {
    path: "/governance-performance/",
    label: "Governance and Performance",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  intelliForm: {
    path: "/intelli-form/",
    label: "Intelli Form",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  intelliAssessment: {
    path: "/intelli-assessment/",
    label: "Intelli Assessment",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  insureos: {
    path: "/insurance-brokers-management-system/insureos/",
    label: "InsureOS",
    priority: 0.8,
  },
  brokeros: {
    path: "/insurance-brokers-management-system/brokeros/",
    label: "BrokerOS",
    priority: 0.8,
  },

  /* ---------------- Services ---------------- */

  services: {
    path: "/services/",
    label: "Platform Services",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  servicesD365: {
    path: "/services/dynamics-365/",
    label: "Dynamics 365",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  servicesPowerPlatform: {
    path: "/services/power-platform/",
    label: "Power Platform",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  servicesAi: {
    path: "/services/ai-and-copilot/",
    label: "AI and Copilot",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  servicesMigration: {
    path: "/services/cloud-migration/",
    label: "Cloud Migration",
    priority: 0.9,
    changeFrequency: "monthly",
  },

  /* ---------------- People ---------------- */

  staffAug: {
    path: "/staff-augmentation/",
    label: "People",
    priority: 0.9,
    changeFrequency: "monthly",
  },

  /* ---------------- Industries ---------------- */

  insurance: {
    path: "/insurance-brokers-management-system/",
    label: "Insurance",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  financialServices: {
    path: "/financial-services/",
    label: "Financial Services",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  notForProfit: {
    path: "/not-for-profit/",
    label: "Not for Profit",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  education: {
    path: "/education/",
    label: "Education",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  government: {
    path: "/government/",
    label: "Government",
    priority: 0.9,
    changeFrequency: "monthly",
  },

  /* ---------------- Company ---------------- */

  company: { path: "/company/", label: "About", priority: 0.7 },
  partners: { path: "/partners/", label: "Partners", priority: 0.7 },
  clients: {
    path: "/clients/",
    label: "Clients",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  contact: { path: "/contact/", label: "Contact", priority: 0.8 },

  /* ---------------- Reading ---------------- */

  blog: {
    path: "/blog/",
    label: "Blog",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  caseStudies: { path: "/case-studies/", label: "Case Studies", priority: 0.8 },
  caseCommunityWork: {
    path: "/case-studies/community-work-australia/",
    label: "Community Work Australia",
    priority: 0.7,
  },
  resources: { path: "/resources/", label: "White Papers", priority: 0.7 },
  compare: {
    path: "/compare/power-pages-vs-jotform-formstack-kissflow/",
    label: "Compare",
    priority: 0.8,
  },

  /* ---------------- Utility ---------------- */

  privacy: { path: "/privacy/", label: "Privacy", priority: 0.3 },
  terms: { path: "/terms/", label: "Terms", priority: 0.3 },
  qr: { path: "/qrlandingpage/", label: "QR Landing", utility: true },
};

/** Typed accessor. A typo in a route key is a compile error. */
export function href(key: RouteKey): string {
  return routes[key].path;
}

/**
 * Five products, not three.
 *
 * The previous array held exactly the three platform products, which is what
 * made the homepage read as a suite. InsureOS and BrokerOS were always
 * products too; they were filed under an industry because that is where the
 * first customer came from.
 */
export const PRODUCT_KEYS = [
  "governance",
  "intelliForm",
  "intelliAssessment",
  "insureos",
  "brokeros",
] as const satisfies readonly RouteKey[];

export const INDUSTRY_KEYS = [
  "government",
  "financialServices",
  "notForProfit",
  "education",
] as const satisfies readonly RouteKey[];

export type NavIcon =
  | "d365"
  | "platform"
  | "ai"
  | "migration"
  | "governance"
  | "form"
  | "assessment"
  | "insureos"
  | "brokeros"
  | "nonprofit"
  | "government"
  | "insurance"
  | "education"
  | "blog"
  | "caseStudy"
  | "paper"
  | "compare"
  | "about"
  | "partners"
  | "clients"
  | "contact";

/**
 * Primary navigation.
 *
 * A group with no children renders as a plain link to its own page. Services
 * and Staff Augmentation sit that way until their child pages exist, which
 * keeps the promise that every navigation item resolves to a real route
 * rather than opening an empty panel.
 */
export type NavGroup = {
  label: string;
  /** Set when the group itself is a page. Required when children is empty. */
  key: RouteKey | null;
  columns: 1 | 2;
  footer?: { key: RouteKey; label: string; blurb: string };
  children: { key: RouteKey; blurb: string; icon: NavIcon }[];
};

export const nav: NavGroup[] = [
  {
    label: "Products",
    key: null,
    columns: 2,
    footer: {
      key: "compare",
      label: "Power Pages against the standalone form tools",
      blurb: "See the comparison",
    },
    children: [
      {
        key: "governance",
        icon: "governance",
        blurb: "Budgeting, delivery and KPI reporting in one governed system",
      },
      {
        key: "intelliForm",
        icon: "form",
        blurb: "Drag and drop forms with payments, on Power Pages",
      },
      {
        key: "intelliAssessment",
        icon: "assessment",
        blurb: "Policy turned into weighted, auditable scoring rules",
      },
      {
        key: "insureos",
        icon: "insureos",
        blurb: "The insurer side of the broker market, published as an API",
      },
      {
        key: "brokeros",
        icon: "brokeros",
        blurb: "The broker side, quoting and placement without the email",
      },
    ],
  },
  {
    label: "Platform Services",
    key: "services",
    columns: 1,
    footer: {
      key: "services",
      label: "Integration, support and everything else",
      blurb: "See the whole practice",
    },
    children: [
      {
        key: "servicesD365",
        icon: "d365",
        blurb: "Sales, Customer Service, Customer Insights and Project Operations",
      },
      {
        key: "servicesPowerPlatform",
        icon: "platform",
        blurb: "Power Pages, apps, Dataverse, Power BI and governance",
      },
      {
        key: "servicesAi",
        icon: "ai",
        blurb: "Copilot Studio and Azure AI Foundry inside business process",
      },
      {
        key: "servicesMigration",
        icon: "migration",
        blurb: "On premise Dynamics and legacy applications moved to the cloud",
      },
    ],
  },
  {
    label: "People",
    key: "staffAug",
    columns: 1,
    children: [],
  },
  {
    label: "Industries",
    key: null,
    columns: 1,
    footer: {
      key: "caseStudies",
      label: "Community Work Australia moved off spreadsheets",
      blurb: "Read the case study",
    },
    children: [
      {
        key: "government",
        icon: "government",
        blurb: "Budget, delivery and reporting an auditor can follow",
      },
      {
        key: "notForProfit",
        icon: "nonprofit",
        blurb: "Fundraising, NDIS, health and compliance across Australia",
      },
      {
        key: "financialServices",
        icon: "insurance",
        blurb: "Banks, lenders, insurers and brokers in the Gulf and Australia",
      },
      {
        key: "education",
        icon: "education",
        blurb: "One request routed across admin, finance and records",
      },
    ],
  },
  {
    label: "Company",
    key: null,
    columns: 1,
    children: [
      { key: "company", icon: "about", blurb: "Who builds Datanox and why they started" },
      { key: "clients", icon: "clients", blurb: "The organisations already running on this work" },
      { key: "partners", icon: "partners", blurb: "Delivery partners across three regions" },
      { key: "contact", icon: "contact", blurb: "Talk to the delivery team" },
    ],
  },
];

/**
 * Footer columns.
 *
 * Reading material moved out of the header when Services took its slot. It
 * keeps a full column here and is linked from the pages that reference it, so
 * nothing became less reachable, it just stopped competing for a nav slot
 * with a commercial line.
 */
export const footerColumns: { label: string; keys: RouteKey[] }[] = [
  {
    label: "Products",
    keys: ["governance", "intelliForm", "intelliAssessment", "insureos", "brokeros"],
  },
  {
    label: "Work with us",
    keys: ["services", "servicesD365", "servicesPowerPlatform", "servicesAi", "servicesMigration", "staffAug", "partners", "clients", "contact"],
  },
  {
    label: "Industries",
    keys: ["government", "financialServices", "insurance", "notForProfit", "education"],
  },
  {
    label: "Reading",
    keys: ["blog", "caseStudies", "resources", "compare", "company"],
  },
];
