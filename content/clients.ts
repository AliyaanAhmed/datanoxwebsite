/**
 * Named clients and delivery partners.
 *
 * Logo files live in public/logos and were taken from the company profile.
 * Intrinsic dimensions are recorded here so every image ships width and
 * height attributes and reserves its own space, which is what stops a logo
 * wall shifting the page as it loads.
 *
 * Metrics from individual engagements are deliberately not published. These
 * are names and marks only, which is the instruction given on 19 August 2026.
 */

export type Sector =
  | "Not for profit"
  | "Financial services and insurance"
  | "Government and public sector"
  | "Education"
  | "Energy";

export type Client = {
  name: string;
  slug: string;
  sector: Sector;
  w: number;
  h: number;
};

export const clients: Client[] = [
  { name: "Community Work Australia", slug: "community-work-australia", sector: "Not for profit", w: 179, h: 132 },
  { name: "Melanoma Patients Australia", slug: "melanoma-patients-australia", sector: "Not for profit", w: 263, h: 132 },
  { name: "Consumers Health Forum of Australia", slug: "consumers-health-forum", sector: "Not for profit", w: 221, h: 132 },
  { name: "The Shepherd Centre", slug: "the-shepherd-centre", sector: "Not for profit", w: 380, h: 91 },
  { name: "Envision Aid Foundation", slug: "envision-aid-foundation", sector: "Not for profit", w: 380, h: 85 },
  { name: "Feed The World", slug: "feed-the-world", sector: "Not for profit", w: 380, h: 130 },
  { name: "Humanity For All", slug: "humanity-for-all", sector: "Not for profit", w: 221, h: 132 },
  { name: "International Network of Churches", slug: "international-network-of-churches", sector: "Not for profit", w: 378, h: 132 },

  { name: "EML", slug: "eml", sector: "Financial services and insurance", w: 356, h: 132 },
  { name: "Angle Auto Finance", slug: "angle-auto-finance", sector: "Financial services and insurance", w: 380, h: 98 },
  { name: "Abu Dhabi Islamic Bank", slug: "abu-dhabi-islamic-bank", sector: "Financial services and insurance", w: 380, h: 71 },
  { name: "Takaful", slug: "takaful", sector: "Financial services and insurance", w: 205, h: 132 },
  { name: "800 Sayara", slug: "800-sayara", sector: "Financial services and insurance", w: 380, h: 44 },
  { name: "Accutax", slug: "accutax", sector: "Financial services and insurance", w: 258, h: 132 },

  { name: "Department of Government Enablement", slug: "department-of-government-enablement", sector: "Government and public sector", w: 380, h: 94 },
  { name: "Transport for NSW", slug: "transport-for-nsw", sector: "Government and public sector", w: 360, h: 132 },

  { name: "UNSW Sydney", slug: "unsw", sector: "Education", w: 315, h: 132 },
  { name: "Melbourne Business School", slug: "melbourne-business-school", sector: "Education", w: 264, h: 132 },

  { name: "Chevron", slug: "chevron", sector: "Energy", w: 118, h: 132 },
  { name: "APR Energy", slug: "apr-energy", sector: "Energy", w: 380, h: 115 },
  { name: "Vitis Energy", slug: "vitis-energy", sector: "Energy", w: 200, h: 132 },
];

export const SECTOR_ORDER: Sector[] = [
  "Not for profit",
  "Financial services and insurance",
  "Government and public sector",
  "Education",
  "Energy",
];

export type Partner = {
  name: string;
  slug: string;
  region: string;
  /** What the partnership actually covers in that market. */
  blurb: string;
  w: number;
  h: number;
};

/**
 * The four delivery partners, confirmed by Datanox on 20 August 2026.
 *
 * The previous partners page described an abstract partner programme and no
 * named partner at all, while also stating that Datanox does not deliver
 * services. Both were wrong.
 */
export const partners: Partner[] = [
  {
    name: "alkemiz",
    slug: "alkemiz",
    region: "Australia",
    blurb:
      "Local presence for the Australian book, spanning government, education, not for profit and financial services organisations.",
    w: 380,
    h: 77,
  },
  {
    name: "Heartburst",
    slug: "heartburst",
    region: "Australia",
    blurb:
      "Australian partner working alongside the delivery practice on engagement, adoption and the people side of a rollout.",
    w: 380,
    h: 97,
  },
  {
    name: "OrientMCT",
    slug: "orientmct",
    region: "United Arab Emirates",
    blurb:
      "Management consulting and training partner in the Gulf, covering government, insurance and professional services clients.",
    w: 380,
    h: 95,
  },
  {
    name: "WhizzBridge",
    slug: "whizzbridge",
    region: "United States",
    blurb:
      "United States partner, through which the energy sector engagements are delivered as staff augmentation.",
    w: 380,
    h: 58,
  },
];
