import { SITE_URL, site } from "@/content/site";

/**
 * Typed JSON-LD builders.
 *
 * Every node is composed explicitly per page. Nothing is inherited from a
 * plugin, which is how the live site ended up typing its corporate homepage
 * as an Article authored by a Person called admin.
 *
 * Fields whose value is unconfirmed are omitted rather than emitted empty.
 */

type Json = Record<string, unknown>;

/** Drops null, undefined and empty arrays so no hollow field ever ships. */
function compact<T extends Json>(input: T): T {
  const out: Json = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out as T;
}

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export function organization(): Json {
  const { headquarters, additionalOffice, companyLinkedIn } = site.unconfirmed;

  const sameAs = [companyLinkedIn].filter(Boolean) as string[];

  const address = [headquarters, additionalOffice]
    .filter(Boolean)
    .map((locality) => ({
      "@type": "PostalAddress",
      addressLocality: locality,
    }));

  return compact({
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/datanox-mark.svg`,
    },
    description: site.definition,
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.title,
      sameAs: [site.founder.linkedin],
    },
    knowsAbout: [
      "Microsoft Power Platform",
      "Microsoft Dataverse",
      "Microsoft Dynamics 365",
      "Microsoft Power Pages",
      "Microsoft Power BI",
      "Microsoft Copilot Studio",
      "Dynamics 365 implementation",
      "Power Platform consulting",
      "Dynamics 365 on premises to cloud migration",
      "IT staff augmentation",
      "Enterprise budgeting software",
      "No code form building",
      "Assessment and scoring software",
    ],
    /* Confirmed 19 August 2026. Schema.org expects an ISO 8601 date, and a
       year alone is valid, so no month is invented to fill the field. */
    foundingDate: site.foundingYear,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: site.team.total,
    },
    areaServed: site.regions.map((name) => ({ "@type": "Place", name })),
    address: address.length ? address : null,
    sameAs: sameAs.length ? sameAs : null,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${SITE_URL}/contact/`,
      availableLanguage: ["English"],
    },
  });
}

export function website(): Json {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE_URL}/`,
    name: site.name,
    description: site.shortDefinition,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

export function softwareApplication(input: {
  name: string;
  path: string;
  description: string;
  features: string[];
}): Json {
  return compact({
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}${input.path}#software`,
    name: input.name,
    url: `${SITE_URL}${input.path}`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Microsoft Power Platform",
    operatingSystem: "Web browser",
    description: input.description,
    featureList: input.features,
    publisher: { "@id": ORG_ID },
    isAccessibleForFree: false,
    // No price is published because Datanox has not confirmed a pricing model.
    // An empty Offer is worse than none.
  });
}

export function service(input: {
  name: string;
  path: string;
  description: string;
  areaServed?: string[];
  serviceType?: string;
}): Json {
  return compact({
    "@type": "Service",
    "@id": `${SITE_URL}${input.path}#service`,
    name: input.name,
    url: `${SITE_URL}${input.path}`,
    description: input.description,
    serviceType: input.serviceType ?? null,
    areaServed: input.areaServed ?? null,
    provider: { "@id": ORG_ID },
  });
}

export function faqPage(
  path: string,
  entries: { question: string; answer: string }[],
): Json {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function blogPosting(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  image: string;
  author?: string;
}): Json {
  return {
    "@type": "BlogPosting",
    "@id": `${SITE_URL}${input.path}#post`,
    headline: input.headline,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    image: `${SITE_URL}${input.image}`,
    author: input.author
      ? { "@type": "Person", name: input.author }
      : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    inLanguage: "en",
  };
}

/** Wraps nodes into one @graph so a page emits a single script tag. */
export function graph(...nodes: Json[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}
