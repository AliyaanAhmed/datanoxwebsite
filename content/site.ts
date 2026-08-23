/**
 * The single source of truth for company facts.
 *
 * Everything downstream reads from here: Organization JSON-LD, llms.txt,
 * the footer, the company page and the contact page. Changing a fact here
 * updates every surface at once, which is what stops the kind of drift the
 * audit found on the live site.
 *
 * `unconfirmed` holds facts that were asserted by an earlier audit but never
 * verified with Datanox. Nothing in that object is rendered anywhere. When a
 * fact is confirmed, move it up into the main object and it appears everywhere
 * it belongs, in one commit.
 */

export const SITE_URL = "https://datanox.io";

/**
 * The Google Tag already running on datanox.io through Site Kit.
 *
 * Kept deliberately, because it carries the existing measurement history.
 * The earlier audit reported no GA4 tag present, which was wrong: it looked
 * for the G prefix and this is a GT prefixed Google Tag.
 */
export const GA_TAG_ID = "GT-5MXXWKLR";

export const site = {
  name: "Datanox",
  url: SITE_URL,
  legalName: "Datanox",

  /**
   * Definition first. This exact sentence seeds schema, llms.txt and the meta.
   *
   * Rewritten August 2026. The previous definition described a product company
   * only, which left the delivery practice and the augmentation line invisible
   * to search engines and to the models that read this site.
   */
  definition:
    "Datanox is a Microsoft business applications company. It designs, builds and runs Dynamics 365 and Power Platform systems for governments, universities, insurers and not for profit organisations, licenses five products of its own built on that platform, and places its consultants inside client delivery teams.",

  shortDefinition:
    "Dynamics 365 and Power Platform delivery, products and specialist people, across Australia, the Gulf and the United States.",

  /** The three engagement models, in the order the profile states them. */
  engagementModels: [
    {
      key: "products",
      label: "Products",
      summary: "Software Datanox owns and licenses.",
    },
    {
      key: "services",
      label: "Platform services",
      summary: "Projects Datanox designs and delivers.",
    },
    {
      key: "people",
      label: "People",
      summary: "Datanox consultants working inside your team.",
    },
  ],

  founder: {
    name: "Asim Uddin",
    /** Confirmed by Datanox, 18 August 2026. */
    title: "Founder and CEO",
    linkedin: "https://www.linkedin.com/in/asim-uddin-83896910/",
  },

  /* ---------------------------------------------------------------- */
  /* Confirmed by Datanox, 19 August 2026, from the company profile.  */
  /* ---------------------------------------------------------------- */

  foundingYear: "2024",

  team: {
    total: 50,
    inDelivery: 35,
  },

  implementations: "25",

  /**
   * Regions served. Distinct from partnerRegions, which names where the
   * delivery partner companies sit.
   */
  regions: [
    "Australia",
    "the United Arab Emirates",
    "Saudi Arabia",
    "the United States",
  ],

  /** Partner regions are stated on the live partners page. */
  partnerRegions: ["Australia", "the Middle East", "North America"],

  platforms: [
    "Microsoft Power Apps",
    "Microsoft Power Pages",
    "Microsoft Power BI",
    "Microsoft Dataverse",
    "Microsoft Dynamics 365",
    "Microsoft Copilot Studio",
    "Microsoft Power Automate",
  ],

  /**
   * Not confirmed by Datanox, or confirmed as deliberately unpublished.
   * Rendered nowhere.
   *
   * Publishing an unverified fact into structured data is worse than
   * publishing nothing, because it becomes the machine readable record.
   */
  unconfirmed: {
    headquarters: null as string | null,
    /**
     * No contact email is published anywhere on the current datanox.io, so
     * there is nothing to carry across. Every form falls back to "try again"
     * until this is filled in, rather than to an address we guessed.
     */
    contactEmail: null as string | null,
    additionalOffice: null as string | null,
    companyLinkedIn: null as string | null,
    /**
     * Held back on instruction, 19 August 2026, not because it is unverified.
     * Datanox is a Microsoft Solutions Partner for Business Applications with
     * eight certified consultants. Moving this up publishes it to the
     * Organization schema, llms.txt and the footer in one commit.
     */
    microsoftPartnerTier: null as string | null,
    /** The engineering practice location. Held back on instruction. */
    engineeringHub: null as string | null,
    pricingModel: null as string | null,
  },
} as const;

export type Site = typeof site;
