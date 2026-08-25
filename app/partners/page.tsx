import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  Band,
  Container,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { IconChip } from "@/components/ui/icons";
import { PartnerLogos } from "@/components/page/logo-wall";
import {
  ClosingCta,
  FaqSection,
  InsightPanel,
  PageHero,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { FigPartnersHero } from "@/components/figures/hero-visuals";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL, site } from "@/content/site";
import { partners } from "@/content/clients";
import { breadcrumbs, faqPage, graph, ORG_ID } from "@/lib/schema";

const PATH = "/partners/";

export const metadata: Metadata = pageMetadata({
  title: "Delivery Partners in Australia, the Gulf and the US",
  description:
    "alkemiz and Heartburst in Australia, OrientMCT in the United Arab Emirates and WhizzBridge in the United States, giving one engineering practice local presence.",
  path: PATH,
});

/**
 * Partners.
 *
 * Rewritten August 2026, and it needed it more than any other page.
 *
 * The previous version described an abstract reseller programme, named no
 * partner at all, and stated three times that Datanox builds products while
 * partners deliver them. That last claim was flatly wrong and was costing the
 * company its entire services and augmentation pipeline, because a visitor who
 * read it concluded Datanox does not do delivery work.
 *
 * The real model is the opposite way round: one engineering practice does the
 * delivery, and four partner companies provide local presence, market
 * knowledge and commercial standing in the regions Datanox serves.
 */

const MODEL = [
  {
    title: "One practice, four markets",
    body: "Delivery comes from a single engineering team rather than from four independent practices with four sets of standards. What changes between regions is who holds the relationship, not who writes the code.",
    icon: "layers" as const,
  },
  {
    title: "Local standing where it matters",
    body: "Public sector procurement, insurance regulation and university governance all reward a supplier with presence in the market. Partners provide that, which is what makes the engineering practice reachable in four regions at once.",
    icon: "globe" as const,
  },
  {
    title: "One market each",
    body: "Partners work where they already have standing, so bids do not collide and the buyer always has somebody local to hold accountable.",
    icon: "handshake" as const,
  },
];

const faqs: Faq[] = [
  {
    question: "Does Datanox deliver, or do partners deliver?",
    answer:
      "Datanox delivers. Implementation, customisation, integration and migration are done by our own engineering practice of roughly fifty people, thirty five of them in technical delivery. Partner companies provide local presence, market knowledge and the commercial relationship in their region. An earlier version of this page said the opposite and it was wrong.",
  },
  {
    question: "Who are the partners?",
    answer:
      "alkemiz and Heartburst in Australia, OrientMCT in the United Arab Emirates, and WhizzBridge in the United States. Between them they cover thirteen Australian clients across government, education, not for profit and financial services, three in the Gulf across government, insurance and professional services, and three in the United States energy sector.",
  },
  {
    question: "Do you serve Saudi Arabia?",
    answer:
      "Yes. The delivery practice runs a Sunday to Thursday week and sits two hours from Riyadh, which is a full shared working day rather than a handover window, and the Gulf delivery record includes government and insurance clients in Abu Dhabi.",
  },
  {
    question: "Can we become a partner?",
    answer:
      "There is room in markets we do not yet cover. The fit is a consultancy with real standing in its own market and an existing Microsoft practice, rather than a reseller looking for another product line. Tell us where you work and who you already serve, and we will be direct about whether the fit is there.",
  },
  {
    question: "If we engage a partner, who is accountable for the build?",
    answer:
      "Datanox, on the engineering. The partner holds the commercial relationship and the local accountability. Escalation on anything technical runs into our architects rather than stopping at whoever is nearest, which is the same escalation path our augmentation clients get.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}${PATH}#page`,
              url: `${SITE_URL}${PATH}`,
              name: "Datanox delivery partners",
              description:
                "The four partner companies providing local presence for the Datanox engineering practice across Australia, the United Arab Emirates and the United States.",
              about: { "@id": ORG_ID },
              mentions: partners.map((partner) => ({
                "@type": "Organization",
                name: partner.name,
                areaServed: partner.region,
              })),
            },
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Partners", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Partners"
        trail={[
          { name: "Home", path: "/" },
          { name: "Partners", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Developed by one</span>
            </span>
            <span>
              <span>practice. Supported</span>
            </span>
            <span>
              <span>in four markets.</span>
            </span>
          </>
        }
        lead="The engineering is done in one place, to one set of standards, by people who work on the same projects every day. Four partner companies give that practice local presence, market knowledge and somebody the buyer can reach in their own time zone."
        primaryCta={{ label: "Talk to us in your region", key: "contact" }}
        secondaryCta={{ label: "See what the practice delivers", key: "services" }}
        meta={{
          label: "Present in",
          items: [...site.regions].map((region) =>
            region.replace(/^the /, ""),
          ),
        }}
        figure={<FigPartnersHero />}
      />

      {/* ---------------------------------------------------------------
          The four, named, with their marks.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="partners">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Who they are"
                title="Four partner companies, one delivery team"
                lead="Each holds the commercial relationship in its own market. None of them writes the code, and none of them has to, because the practice behind all four is the same one."
              />
            </Reveal>
            <div className="mt-12">
              <PartnerLogos />
            </div>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The correction. Stated plainly because the old page said the
          opposite and people read it.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="model">
        <Container>
          <div className="py-band">
            <Reveal from="scale">
              <InsightPanel
                eyebrow="How the model actually works"
                title="Datanox does the delivery. Partners make it local."
                icon="handshake"
                side={
                  <ol className="overflow-hidden rounded-lg border border-o-100 bg-surface shadow-[var(--shadow-soft)]">
                    {MODEL.map((item) => (
                      <li
                        key={item.title}
                        className="grid gap-4 border-b border-rule p-5 last:border-b-0 sm:grid-cols-[auto_1fr]"
                      >
                        <IconChip name={item.icon} size="sm" />
                        <span>
                          <span className="block font-display text-[1.0625rem] font-semibold text-ink">
                            {item.title}
                          </span>
                          <span className="mt-2 block text-[0.9375rem] leading-relaxed text-body">
                            {item.body}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                }
              >
                <p>
                  A single engineering practice builds the products and delivers
                  the client projects, which is why an implementation gets
                  people who have shipped production software rather than a team
                  assembled for the engagement. What a partner brings is
                  standing in a market that rewards it: procurement
                  relationships, regulatory familiarity, and somebody in the
                  room at the right hour of the day.
                </p>
              </InsightPanel>
            </Reveal>

            <Reveal delay={480} className="mt-9">
              <p className="text-[0.9375rem] text-muted">
                If you are looking for the delivery capability itself rather
                than a partner introduction, that is the{" "}
                <TextLink href={href("services")}>services practice</TextLink>{" "}
                and the{" "}
                <TextLink href={href("staffAug")}>augmentation line</TextLink>.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What buyers and prospective partners ask"
        items={faqs}
        tone="warmer"
      />

      <RelatedPages
        title="The rest of the picture"
        items={[
          {
            key: "services",
            blurb:
              "What the engineering practice actually delivers, across four practice areas.",
          },
          {
            key: "company",
            blurb: "Who built the practice, and why they started it.",
          },
          {
            key: "clients",
            blurb:
              "The organisations these partnerships have delivered for.",
          },
        ]}
      />

      <ClosingCta
        title="Find out who covers your market."
        lead="Tell us where you are and what you are trying to build. If a partner already holds that market you will be introduced to them, and if nobody does you will be talking to the practice directly."
        primary={{ label: "Talk to us in your region", key: "contact" }}
        secondary={{ label: "See what the practice delivers", key: "services" }}
      />
    </>
  );
}
