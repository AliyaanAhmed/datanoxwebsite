/**
 * The people, and the photographs of them.
 *
 * Both the portraits and the Life at Datanox photographs are the company's
 * own, taken from the existing datanox.io company page. The rebuild had been
 * running with coloured initials in place of faces, which on an about page is
 * the one substitution that cannot work: the page exists to show who is
 * behind the work.
 *
 * Portraits are cutouts on transparency, so they sit on a tinted card without
 * a rectangular photo edge. Intrinsic dimensions are recorded so every image
 * reserves its own space and nothing shifts as the page loads.
 */

export type Person = {
  name: string;
  role: string;
  slug: string;
  w: number;
  h: number;
  /** Set for the founder, whose portrait carries the message card. */
  linkedin?: string;
};

export const team: Person[] = [
  {
    name: "Asim Uddin",
    role: "Founder and CEO",
    slug: "asim-uddin",
    w: 481,
    h: 620,
    linkedin: "https://www.linkedin.com/in/asim-uddin-83896910/",
  },
  {
    name: "Ayesha Farooq",
    role: "Head of Research and Innovation",
    slug: "ayesha-farooq",
    w: 345,
    h: 620,
  },
  {
    name: "Umar Farooq",
    role: "Delivery Director",
    slug: "umar-farooq",
    w: 379,
    h: 620,
  },
  {
    name: "Abbas Raza",
    role: "Director",
    slug: "abbas-raza",
    w: 385,
    h: 620,
  },
  {
    name: "Ehtram Uddin",
    role: "Head of Operations",
    slug: "ehtram-uddin",
    w: 492,
    h: 620,
  },
];

export type Photo = {
  slug: string;
  alt: string;
  w: number;
  h: number;
};

/**
 * Life at Datanox. Real photographs rather than stock, which is the whole
 * point of the section, so the alt text describes what is actually happening
 * rather than repeating the section heading.
 */
export const life: Photo[] = [
  {
    slug: "life-collaboration",
    alt: "Three members of the Datanox engineering team working through a problem together at a laptop in the office",
    w: 1400,
    h: 1050,
  },
  {
    slug: "life-auditorium",
    alt: "The Datanox team gathered in the office auditorium for a company event",
    w: 1100,
    h: 733,
  },
  {
    slug: "life-lounge",
    alt: "An informal session in the Datanox office lounge, with the team seated around a low table",
    w: 1100,
    h: 825,
  },
  {
    slug: "life-awards",
    alt: "A Datanox team member receiving a recognition award on stage",
    w: 1100,
    h: 733,
  },
  {
    slug: "life-event",
    alt: "Three members of the Datanox leadership team at a company event",
    w: 1100,
    h: 733,
  },
];

export const founderSpeaking: Photo = {
  slug: "founder-speaking",
  alt: "Asim Uddin, founder and chief executive of Datanox, speaking to the team at a company event",
  w: 511,
  h: 489,
};
