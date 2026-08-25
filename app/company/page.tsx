import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  Band,
  Container,
  Eyebrow,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { IconChip } from "@/components/ui/icons";
import {
  ClosingCta,
  InsightPanel,
  PageHero,
  ProofStrip,
  RelatedPages,
} from "@/components/page/blocks";
import { PartnerLogos } from "@/components/page/logo-wall";
import { FigCompanyHero } from "@/components/figures/hero-visuals";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL, site } from "@/content/site";
import { team, life, founderSpeaking } from "@/content/people";
import { breadcrumbs, graph, ORG_ID } from "@/lib/schema";

const PATH = "/company/";

export const metadata: Metadata = pageMetadata({
  title: "About Datanox, Our Story and Team",
  description:
    "Founded in 2024 on twenty years of Microsoft business application delivery. Fifty people, thirty five in delivery, working across four regions.",
  path: PATH,
});

/**
 * The company page.
 *
 * Rewritten August 2026 for two reasons. The obvious one is that it showed
 * coloured initials where five real photographs already existed on the live
 * site, which on an about page defeats the purpose of having the page.
 *
 * The second is that it still described a company that only builds products.
 * The values, the vision and the founder message are the company's own words
 * and are kept intact; what changes around them is the shape of the business
 * they sit inside.
 */

const values = [
  {
    name: "Human centred",
    body: "Enterprise software should not look like a spreadsheet. The people using it every day did not choose it, so the least it can do is be clear.",
    icon: "people" as const,
  },
  {
    name: "Impact driven",
    body: "The decisions running through these systems shape governments and universities. That is worth building carefully for.",
    icon: "target" as const,
  },
  {
    name: "Global roots",
    body: "Developed by one practice, supported locally. Partner companies in Australia, the Gulf and the United States work in their own market.",
    icon: "globe" as const,
  },
];

const careers = [
  {
    name: "Grow with us",
    body: "Continuous learning and development, so the work moves you forward personally as well as professionally.",
  },
  {
    name: "Innovate with us",
    body: "Projects with real weight, current technology, and solutions that reach organisations rather than sitting in a demo.",
  },
  {
    name: "Be included",
    body: "A diverse and inclusive environment where every voice is valued, and where being heard is normal rather than notable.",
  },
];

/** A photograph with its space reserved, so nothing shifts as the page loads. */
function Photo({
  slug,
  alt,
  w,
  h,
  className = "",
  sizes,
  priority = false,
}: {
  slug: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={`/people/${slug}.jpg`}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

export default function CompanyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            {
              "@type": "AboutPage",
              "@id": `${SITE_URL}${PATH}#about`,
              url: `${SITE_URL}${PATH}`,
              name: "About Datanox",
              description:
                "The story behind Datanox, its vision, leadership team and corporate social responsibility commitment.",
              about: { "@id": ORG_ID },
            },
            ...team.map((person) => ({
              "@type": "Person",
              "@id": `${SITE_URL}${PATH}#${person.slug}`,
              name: person.name,
              jobTitle: person.role,
              image: `${SITE_URL}/people/${person.slug}.png`,
              worksFor: { "@id": ORG_ID },
              ...(person.linkedin ? { sameAs: [person.linkedin] } : {}),
            })),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "About", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Our story"
        trail={[
          { name: "Home", path: "/" },
          { name: "About", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>We did not start</span>
            </span>
            <span>
              <span>with a product. We</span>
            </span>
            <span>
              <span>started with a vision.</span>
            </span>
          </>
        }
        lead="Across governments and large enterprises we kept building the same kind of system: forms, approvals, eligibility rules, thousands of applications. New clients, new industries, one recurring problem. Founded in 2024, carrying twenty years of experience in business applications, and now fifty people with thirty five of them in delivery."
        primaryCta={{ label: "Talk to the team", key: "contact" }}
        secondaryCta={{ label: "What the practice delivers", key: "services" }}
        meta={{
          label: "Working across",
          items: ["Australia", "United Arab Emirates", "Saudi Arabia", "United States"],
        }}
        figure={<FigCompanyHero />}
      />

      {/* ---------------------------------------------------------------
          A photograph of the actual company, before any more prose.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="photoband">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <figure
                data-interactive-card=""
                data-rich-card=""
                className="overflow-hidden rounded-xl shadow-[var(--shadow-lift)] ring-1 ring-o-100"
              >
                <div className="aspect-[16/7]">
                  <Photo
                    slug={life[1].slug}
                    alt={life[1].alt}
                    w={life[1].w}
                    h={life[1].h}
                    sizes="(min-width: 1024px) 88rem, 100vw"
                    priority
                  />
                </div>
              </figure>
            </Reveal>
            <Reveal delay={140} className="mt-6">
              <p className="text-[0.875rem] text-muted">
                The whole practice, in one room. Most of the people in this
                photograph are the ones who would build your system.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* The turn */}
      <Band tone="canvas" block="values">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="What changed"
                title="So we stopped building one off solutions"
                lead="We stepped back, turned years of real deployments into products, and kept the delivery practice behind them. Today the company works three ways: through its own software, through Microsoft platform delivery, and by placing its people directly inside client teams."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
              <Reveal from="scale">
                <div
                  data-interactive-card=""
                  className="relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-o-500 to-o-700 p-8 text-white shadow-[var(--shadow-glow)] ring-1 ring-o-300 lg:p-10"
                >
                  <IconChip
                    name={values[0].icon}
                    size="lg"
                    className="bg-white/18 text-white ring-white/25"
                    data-card-float=""
                  />
                  <h3 className="mt-7 text-d3 !text-white">{values[0].name}</h3>
                  <p className="mt-4 text-[1rem] leading-relaxed text-white/84">
                    {values[0].body}
                  </p>
                </div>
              </Reveal>
              <div className="grid gap-5">
                {values.slice(1).map((value, index) => (
                  <Reveal key={value.name} delay={100 + index * 90} from="scale">
                    <div
                      data-interactive-card=""
                      data-rich-card=""
                      className="grid gap-5 rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:grid-cols-[auto_1fr] sm:items-start lg:p-7"
                    >
                      <IconChip name={value.icon} size="sm" data-card-float="" />
                      <div>
                        <h3 className="text-d4">{value.name}</h3>
                        <p className="mt-2.5 text-[0.9375rem] leading-relaxed">
                          {value.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          Founder message, with the founder actually in it.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="founder">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <div
                data-interactive-card=""
                data-rich-card=""
                className="relative overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-lift)] ring-1 ring-o-100"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-o-100)_0%,transparent_70%)]"
                />
                <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-14 lg:p-14">
                  <div>
                    <Eyebrow>Message from our founder</Eyebrow>
                    <blockquote className="mt-8 flex flex-col gap-5 font-display text-[1.1875rem] leading-relaxed text-ink lg:text-[1.375rem]">
                      <p>
                        At Datanox we start by listening. The best solutions come
                        from truly understanding your challenges and building
                        with purpose.
                      </p>
                      <p>
                        With over twenty years of experience in business
                        applications across different countries, I have learned
                        that real impact comes from thoughtful design and strong
                        partnerships.
                      </p>
                      <p>
                        We do not just deliver software. We create solutions that
                        bring long term value, improve processes, and help
                        organisations grow with confidence.
                      </p>
                    </blockquote>
                    <div className="mt-9 flex items-center gap-4 border-t border-rule pt-7">
                      <img
                        src={`/people/${team[0].slug}.png`}
                        alt={team[0].name}
                        width={62}
                        height={62}
                        loading="lazy"
                        decoding="async"
                        className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-o-100 to-peach object-cover object-top ring-1 ring-o-200"
                      />
                      <span>
                        <span className="block font-display text-[1.0625rem] font-semibold text-ink">
                          {site.founder.name}
                        </span>
                        <span className="block text-[0.875rem] text-muted">
                          {site.founder.title}
                        </span>
                      </span>
                    </div>
                  </div>

                  <Reveal delay={140}>
                    <figure className="overflow-hidden rounded-xl ring-1 ring-o-100">
                      <div className="aspect-[4/3]">
                        <Photo
                          slug={founderSpeaking.slug}
                          alt={founderSpeaking.alt}
                          w={founderSpeaking.w}
                          h={founderSpeaking.h}
                          sizes="(min-width: 1024px) 26rem, 100vw"
                        />
                      </div>
                    </figure>
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* Vision */}
      <Band tone="canvas" block="vision">
        <Container>
          <div className="py-band">
            <Reveal from="scale">
              <InsightPanel
                eyebrow="Our vision"
                title={
                  <>
                    Help organisations use data to make smarter decisions and
                    create real impact.
                  </>
                }
                icon="target"
                side={
                  <div className="grid gap-3 rounded-lg border border-o-100 bg-gradient-to-br from-white to-o-50 p-5 shadow-[var(--shadow-soft)]">
                    {["Innovation", "Insight", "Sustainable growth"].map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-surface px-4 py-3 font-display text-[1rem] font-semibold text-ink shadow-[0_10px_24px_rgba(122,62,12,0.08)] ring-1 ring-o-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                }
              >
                <p>
                  Driving innovation, and giving teams the ability to unlock
                  insight they can act on and grow sustainably from.
                </p>
              </InsightPanel>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The team, with faces.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="team">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Our team"
                title="It is all about the team"
                lead="We focus on the details of everything we do, so that organisations around the world can focus on what matters most to them."
              />
            </Reveal>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {team.map((person, index) => (
                <Reveal as="li" key={person.slug} delay={index * 70}>
                  <div
                    data-interactive-card=""
                    data-rich-card=""
                    className="flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-soft)] ring-1 ring-rule"
                  >
                    <div className="relative flex h-56 items-end justify-center overflow-hidden bg-gradient-to-b from-o-50 to-peach">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-[-3rem] h-40 w-40 rounded-full bg-[radial-gradient(circle,var(--color-o-200)_0%,transparent_70%)]"
                      />
                      <img
                        src={`/people/${person.slug}.png`}
                        alt={`${person.name}, ${person.role} at Datanox`}
                        width={person.w}
                        height={person.h}
                        loading="lazy"
                        decoding="async"
                        className="relative h-[13.5rem] w-auto object-contain object-bottom"
                      />
                    </div>
                    <div className="border-t border-rule p-5">
                      <p className="font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                        {person.name}
                      </p>
                      <p className="mt-1 text-[0.8125rem] leading-snug text-muted">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          Life at Datanox, as photographs rather than as three claims.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="life">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Life at Datanox"
                title="Why work with us"
                lead="Integrity, transparency and excellence are at the heart of everything we do. Work here is more than a job. It is a place to grow, create and make an impact."
              />
            </Reveal>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              <Reveal className="lg:col-span-2 lg:row-span-2">
                <figure
                  data-interactive-card=""
                  data-rich-card=""
                  className="h-full overflow-hidden rounded-xl ring-1 ring-rule"
                >
                  <div className="aspect-[4/3] h-full">
                    <Photo
                      slug={life[0].slug}
                      alt={life[0].alt}
                      w={life[0].w}
                      h={life[0].h}
                      sizes="(min-width: 1024px) 58rem, 100vw"
                    />
                  </div>
                </figure>
              </Reveal>

              {[life[2], life[3]].map((photo, index) => (
                <Reveal key={photo.slug} delay={100 + index * 80}>
                  <figure
                    data-interactive-card=""
                    data-rich-card=""
                    className="overflow-hidden rounded-xl ring-1 ring-rule"
                  >
                    <div className="aspect-[16/10]">
                      <Photo
                        slug={photo.slug}
                        alt={photo.alt}
                        w={photo.w}
                        h={photo.h}
                        sizes="(min-width: 1024px) 28rem, 100vw"
                      />
                    </div>
                  </figure>
                </Reveal>
              ))}

              {/* A wide strip closes the grid, so the right hand column is
                  never left with an orphan tile. */}
              <Reveal delay={280} className="lg:col-span-3">
                <figure
                  data-interactive-card=""
                  data-rich-card=""
                  className="overflow-hidden rounded-xl ring-1 ring-rule"
                >
                  <div className="aspect-[16/9] lg:aspect-[24/7]">
                    <Photo
                      slug={life[4].slug}
                      alt={life[4].alt}
                      w={life[4].w}
                      h={life[4].h}
                      sizes="(min-width: 1024px) 88rem, 100vw"
                    />
                  </div>
                </figure>
              </Reveal>
            </div>

            <Reveal delay={320} className="mt-12" from="scale">
              <ol
                data-interactive-card=""
                data-rich-card=""
                className="grid overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-soft)] ring-1 ring-rule lg:grid-cols-3"
              >
                {careers.map((item, index) => (
                  <li
                    key={item.name}
                    className="border-b border-rule p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:p-7"
                  >
                    <span className="font-display text-[2rem] font-semibold leading-none text-o-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-d4">{item.name}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The partners, named here as well as on their own page.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="partnerband">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Who we work with"
                title="Four partner companies, in four markets"
                lead="One engineering practice, with local presence wherever the buyer is. Each partner holds the commercial relationship in its own region."
              />
            </Reveal>
            <div className="mt-12">
              <PartnerLogos compact />
            </div>
            <Reveal delay={400} className="mt-8">
              <TextLink href={href("partners")}>
                How the partner model actually works
              </TextLink>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* CSR */}
      <ProofStrip
        tone="peach"
        eyebrow="Corporate social responsibility"
        title="Ten percent of profits, pledged"
        stats={[
          {
            figure: "10%",
            label: "of profits pledged",
            detail: "supporting underprivileged communities, every year",
          },
          {
            figure: "Two",
            label: "partner organisations",
            detail:
              "Crescent Relief Australia and the Khidmat al Nisa Foundation",
          },
          {
            figure: "20+",
            label: "years of business application experience",
            detail:
              "across several countries, behind how everything here was designed",
          },
        ]}
      />

      <Band tone="canvas" block="csr">
        <Container>
          <div className="pb-band">
            <Reveal>
              <p className="measure text-lead">
                We believe business success comes with a responsibility to make a
                positive impact. Through those partnerships we focus on essential
                services, empowering vulnerable populations and improving quality
                of life. Choosing Datanox means more than adopting a platform. It
                means joining a movement to uplift communities, one step at a
                time.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <RelatedPages
        title="More about the work"
        items={[
          {
            key: "services",
            blurb:
              "What the delivery practice actually builds, across four areas.",
          },
          {
            key: "clients",
            blurb:
              "Who the practice has delivered for, and the partners it delivers with.",
          },
          {
            key: "staffAug",
            blurb:
              "How these people are placed inside client teams, and on what terms.",
          },
        ]}
      />

      <ClosingCta
        title="Tell us the problem you keep solving one off."
        lead="That is how this company started, and it is still the conversation we are best at. Bring the thing that gets rebuilt every year by somebody different, and we will tell you whether it is worth building properly."
        primary={{ label: "Talk to the team", key: "contact" }}
        secondary={{ label: "See the partner network", key: "partners" }}
      />
    </>
  );
}
