import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  Band,
  Card,
  Container,
  Eyebrow,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { IconChip } from "@/components/ui/icons";
import {
  ClosingCta,
  FaqSection,
  PageHero,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { ClientGrid, PartnerLogos } from "@/components/page/logo-wall";
import { FigSectorSpread } from "@/components/figures/sector-spread";
import { clients, partners, SECTOR_ORDER, type Sector } from "@/content/clients";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph } from "@/lib/schema";
import { site } from "@/content/site";

const PATH = "/clients/";

export const metadata: Metadata = pageMetadata({
  title: "Clients Across Five Sectors and Four Regions",
  description:
    "Governments, universities, insurers, lenders, energy companies and charities across Australia, the Gulf and the United States, grouped by sector.",
  path: PATH,
});

/**
 * The clients page.
 *
 * Logos only. The engagement metrics in the company profile are deliberately
 * absent, which is the instruction given on 19 August 2026 and the reason
 * this page leans on names rather than numbers.
 *
 * The grouping is by sector rather than by product, because a visitor arrives
 * here doing one thing: looking for an organisation that resembles their own.
 * Sector is the axis that answers that question. Which product they bought is
 * not.
 */

/** What the work in each sector actually consists of. */
const SECTOR_NOTES: Record<Sector, { lead: string; work: string; region: string }> = {
  "Not for profit": {
    lead: "The largest group, and the one Datanox knows best.",
    work:
      "Fundraising and donor records, membership, participant and case management, disability services under the National Disability Insurance Scheme, grant and programme tracking, and the reporting that funders and boards ask for. Most of these organisations arrived running a finance system, a fundraising database and a great many spreadsheets that only one person understood.",
    region: "Australia",
  },
  "Financial services and insurance": {
    lead: "Brokers, insurers, lenders and advisory firms.",
    work:
      "Customer onboarding with document understanding, lending and application origination, broker and insurer placement, claims and policy administration, and the compliance record that has to survive an audit years later. This is the sector our own InsureOS and BrokerOS products came out of.",
    region: "United Arab Emirates and Australia",
  },
  "Government and public sector": {
    lead: "Entities with a published budget and a reporting obligation.",
    work:
      "Strategic planning, budget allocation, initiative and project delivery, key performance indicator reporting, and citizen facing service requests. Public sector work is where the audit trail matters most, and where a system that cannot explain how a number was reached is a system that fails review.",
    region: "United Arab Emirates and Australia",
  },
  Education: {
    lead: "Universities and business schools.",
    work:
      "Applicant and student journeys, service requests routed across admissions, finance, records and faculty, scholarship and grant assessment, and alumni engagement. A university is many organisations wearing one name, which is exactly the problem a shared Dataverse layer is good at.",
    region: "Australia",
  },
  Energy: {
    lead: "Operators and independent power producers.",
    work:
      "Project operations, contractor and asset records, field data capture away from a desk, and the approval chains that sit between a request in the field and money being spent. Remote work is the constraint that shapes every one of these builds.",
    region: "Australia, the United States and the Gulf",
  },
};

const HOW_WE_WORK = [
  {
    t: "Inside your tenant",
    b: "Every system is built in the client's own Microsoft environment, under their identity, their access controls and their logging. Nothing moves into ours.",
    icon: "shield" as const,
  },
  {
    t: "The team that ships our products",
    b: "The same delivery practice that maintains five commercial products does the client work, so the architecture comes from people who have to live with it.",
    icon: "layers" as const,
  },
  {
    t: "Handed over, not held",
    b: "Documentation, environment strategy and deployment pipelines are part of delivery. A client who wants to take a system in house should be able to.",
    icon: "check" as const,
  },
];

const faqs: Faq[] = [
  {
    question: "Why are there no numbers on this page?",
    answer:
      "Because engagement results belong to the client, not to us, and publishing them without a signed reference is how a supplier loses the next engagement. Where a figure has been cleared for publication it appears in the case study for that client. Everywhere else you get the name and nothing more.",
  },
  {
    question: "Can we speak to one of these organisations?",
    answer:
      "In most sectors yes, once a conversation is far enough along to justify asking somebody for their time. We ask the client first, every time, and we will tell you plainly if the answer in your sector is no because of a confidentiality agreement.",
  },
  {
    question: "Is this every client?",
    answer:
      "No. A number of engagements, particularly migrations and public sector work in the Gulf, are covered by non disclosure agreements and cannot be named at all. Twenty five implementations sit behind the marks on this page.",
  },
  {
    question: "We are not in any of these sectors. Does that rule us out?",
    answer:
      "It does not. The underlying work is the same in every one of them: a governed data model, a process with approvals in it, and a record somebody can be asked to defend. Sector experience shortens the discovery conversation, it does not decide whether the system can be built.",
  },
  {
    question: "Do you work outside Australia and the Gulf?",
    answer:
      `Yes. Delivery runs across ${site.regions.join(", ")}, and our partner network covers markets where a local presence matters more than a remote team does. The products are sold and supported in any market with a Microsoft tenant.`,
  },
];

export default function ClientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Clients", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Clients"
        trail={[
          { name: "Home", path: "/" },
          { name: "Clients", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Look for an</span>
            </span>
            <span>
              <span>organisation that</span>
            </span>
            <span>
              <span>resembles yours.</span>
            </span>
          </>
        }
        lead="Charities, universities, insurers, lenders, energy operators and government entities, grouped by the sector they work in rather than by the product they bought. Names only. What each engagement achieved belongs to the client to publish, not to us."
        figure={<FigSectorSpread />}
        primaryCta={{ label: "Talk to the delivery team", key: "contact" }}
        secondaryCta={{ label: "Read a case study", key: "caseStudies" }}
        meta={{
          label: "Delivering in",
          items: ["Australia", "United Arab Emirates", "Saudi Arabia", "United States"],
        }}
      />

      {/* ---------------------------------------------------------------
          Five sectors, each with its own grid and its own note about what
          the work in that sector actually consists of. A wall of logos
          with no explanation is decoration.
          --------------------------------------------------------------- */}
      {SECTOR_ORDER.map((sector, index) => {
        const items = clients.filter((client) => client.sector === sector);
        const note = SECTOR_NOTES[sector];
        if (!items.length) return null;

        return (
          <Band
            key={sector}
            tone={index % 2 === 0 ? "canvas" : "warm"}
            block="sector"
          >
            <Container wide>
              {/* Five of these run in sequence, so the band padding is
                  tighter than the site default. At py-band the page becomes a
                  scroll with one short section every screen and a half. */}
              <div className="py-14 lg:py-20">
                <div
                  className={`grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 ${
                    // A sector with one row of marks against four paragraphs
                    // of text leaves a hole under the marks if the columns
                    // are top aligned. Centre the short ones instead.
                    items.length <= 4 ? "lg:items-center" : "lg:items-start"
                  }`}
                >
                  <Reveal>
                    <Eyebrow>{note.region}</Eyebrow>
                    <h2 className="mt-6 measure-tight text-d3">{sector}</h2>
                    <p className="mt-5 text-[1.0625rem] font-medium leading-relaxed text-ink-2">
                      {note.lead}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
                      {note.work}
                    </p>
                    <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                      {items.length} named {items.length === 1 ? "organisation" : "organisations"}
                    </p>
                  </Reveal>

                  <Reveal delay={120}>
                    <ClientGrid items={items} />
                  </Reveal>
                </div>
              </div>
            </Container>
          </Band>
        );
      })}

      {/* ---------------------------------------------------------------
          The things that are true of every engagement on this page.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="constants">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Constant across all of them"
                title="Three things that do not change from client to client"
                lead="Sector changes the vocabulary and the compliance regime. It does not change how a system is built or who ends up owning it."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {HOW_WE_WORK.map((item, index) => (
                <Reveal key={item.t} delay={index * 90}>
                  <Card className="h-full">
                    <IconChip name={item.icon} size="sm" />
                    <h3 className="mt-5 font-display text-[1.125rem] font-semibold text-ink">
                      {item.t}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {item.b}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          Partners, because a client in a market we do not staff directly
          is usually served with one of these firms alongside us.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="partners">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Delivered alongside"
                title="Four firms we deliver with"
                lead="Local presence in markets where being in the room matters, and specialist capacity where a programme needs more of it than one practice holds."
              />
            </Reveal>
            <div className="mt-12">
              <PartnerLogos items={partners} compact />
            </div>
            <Reveal delay={320} className="mt-9">
              <p className="measure text-[0.9375rem] leading-relaxed text-muted">
                The full arrangement with each of them, and what a partner
                engagement looks like commercially, is set out on the{" "}
                <TextLink href={href("partners")}>partners page</TextLink>.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What buyers ask about a reference list"
        items={faqs}
        tone="warm"
      />

      <RelatedPages
        title="Where to go from here"
        items={[
          {
            key: "caseStudies",
            blurb:
              "One engagement written up properly, with the client's permission.",
          },
          {
            key: "services",
            blurb: "What the delivery practice actually does for these organisations.",
          },
          {
            key: "company",
            blurb: "The people whose names sit behind the marks on this page.",
          },
        ]}
      />

      <ClosingCta
        title="Tell us which of these looks most like you."
        lead="It is the fastest way to make a first conversation useful. If one of these organisations resembles yours in size, sector or regulatory position, we can start from what we already know rather than from a blank page."
        primary={{ label: "Talk to the delivery team", key: "contact" }}
        secondary={{ label: "See the five products", key: "governance" }}
      />
    </>
  );
}
