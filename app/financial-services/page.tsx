import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Band,
  Card,
  Container,
  Eyebrow,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { IconChip, type IconName } from "@/components/ui/icons";
import { Segments, type Segment } from "@/components/page/segments";
import {
  ClosingCta,
  FaqSection,
  PageHero,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { ClientGrid } from "@/components/page/logo-wall";
import { clients } from "@/content/clients";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";

const PATH = "/financial-services/";

export const metadata: Metadata = pageMetadata({
  title: "Microsoft Applications for Financial Services",
  description:
    "Onboarding, lending origination, insurer and broker connectivity, and advisory practice management, built on Dynamics 365 and Power Platform.",
  path: PATH,
});

/**
 * Financial services and insurance.
 *
 * Widened from the insurance page in August 2026 on the client's instruction.
 * The named work in this sector is a bank, an Islamic insurer, a lender, an
 * automotive finance business and an advisory firm, not only insurance
 * brokers, and the previous structure filed all of them under a page about a
 * broker connectivity product.
 *
 * The regulatory pressure that shaped InsureOS and BrokerOS is specific to the
 * Gulf. The products themselves are not, and this page says both things
 * plainly rather than letting the first imply the second.
 */

const FS_CLIENTS = clients.filter(
  (client) => client.sector === "Financial services and insurance",
);

const segments: Segment[] = [
  {
    tag: "Banking",
    title: "Onboarding, where the reading is done before the officer opens it",
    intro:
      "Account opening, corporate onboarding and know your customer review are where most banks lose the most time, because the same details are keyed by three people and the compliance step is a person reading a document looking for fields.",
    blocks: [
      {
        heading: "Document understanding at intake",
        body: "A custom model trained on the bank's own documents reads an application and fills it. The officer sees the document, the extracted values and a confidence level in one place, and still makes the decision.",
      },
      {
        heading: "One record, not three entries",
        body: "The details captured at the branch, in the back office and in review are the same record rather than three transcriptions of it, which removes both the effort and the drift between them.",
      },
      {
        heading: "Review that leaves a trail",
        body: "Every check, override and approval is a recorded event against the customer file. A regulator asking how a case was cleared gets the sequence rather than a reconstruction.",
      },
      {
        heading: "Retail and corporate on one model",
        body: "Corporate onboarding has more parties, more documents and more approval steps, but it is the same shape. Modelling it once means the second segment is configuration rather than a second project.",
      },
    ],
  },
  {
    tag: "Lending and asset finance",
    title: "Origination from enquiry to settlement",
    intro:
      "Personal lending, automotive and equipment finance, and the broker and dealer channels that feed them. The recurring problem is not the credit decision, it is everything queued around it while somebody chases a missing document.",
    blocks: [
      {
        heading: "Application intake on Power Pages",
        body: "Applicants, brokers and dealers submit through a portal bound directly to Dataverse, with conditional questions, document upload and validation at the point of entry rather than at the point of review.",
      },
      {
        heading: "Rules where the policy lives",
        body: "Serviceability rules, product eligibility and referral thresholds are configured and versioned rather than compiled, so a policy change is a change in the system rather than a release.",
      },
      {
        heading: "Channel visibility",
        body: "Broker and dealer performance, conversion and turnaround read from the same records the applications sit in, which is the only version anybody will believe.",
      },
      {
        heading: "Settlement and post settlement",
        body: "Documentation, verification and the handover into servicing kept inside the same case rather than emailed onward to a different system and a different team.",
      },
    ],
  },
  {
    tag: "Insurance",
    title: "The insurer and the broker, wired together",
    intro:
      "The deepest product work in this sector. Insurers and brokers have both invested heavily in their own core systems, and the connection between them is still carried by email, telephone and spreadsheet. That gap is what InsureOS and BrokerOS close, without replacing what either side already runs.",
    blocks: [
      {
        heading: "The insurer publishes, the broker quotes",
        body: "A product configured in InsureOS goes live as a governed interface. A broker in BrokerOS selects it and quotes against it directly, with no bespoke integration built for the pairing.",
      },
      {
        heading: "Neither core system is replaced",
        body: "Policy administration on one side and the agency system on the other stay exactly where they are. What is added is the layer between them that neither vendor built.",
      },
      {
        heading: "Governed rather than opened",
        body: "Access, rating, referral and approval remain under the insurer's control. Reaching more brokers does not mean surrendering the rules that decide what each of them may sell.",
      },
      {
        heading: "Traceable on both sides",
        body: "Quote, referral, bind and renewal are one record visible to both parties, which removes the reconciliation that currently occupies a person on each side of every transaction.",
      },
    ],
    proof: {
      label: "Where this came from",
      body: "InsureOS and BrokerOS were designed against the United Arab Emirates market, where regulatory change around direct premium collection has pushed insurers and brokers toward system to system relationships. That pressure shaped the design. It did not restrict it: the products run in any market with a Microsoft tenant, and the problem they solve exists in every one of them.",
    },
  },
  {
    tag: "Advisory and professional firms",
    title: "Practice management for firms that bill their time",
    intro:
      "Accounting, tax and advisory firms carry a client relationship, a compliance calendar and a delivery obligation at the same time, usually across three unconnected tools and one very important spreadsheet.",
    blocks: [
      {
        heading: "Engagements, not just contacts",
        body: "A client, the engagements under it, the obligations attached to each and the people delivering them modelled together rather than in a customer list beside a job tracker.",
      },
      {
        heading: "The compliance calendar as records",
        body: "Recurring obligations generated as real work items with owners and due dates, so the deadline nobody noticed is a report rather than a phone call from the client.",
      },
      {
        heading: "Document requests that chase themselves",
        body: "Requests issued, tracked and escalated automatically through a portal, which removes the most disliked and least valuable hour of most weeks.",
      },
      {
        heading: "Utilisation from the work itself",
        body: "Time, delivery and billing read from the engagement record rather than from a separate timesheet system that has to be reconciled against it.",
      },
    ],
  },
];

const REGULATED: { name: string; body: string; icon: IconName }[] = [
  {
    name: "Your tenant, your region",
    body: "Built inside your own Microsoft environment, in the Azure region you choose, under your identity provider and your logging. Nothing is hosted here and no customer data is copied into our systems.",
    icon: "shield",
  },
  {
    name: "The audit trail is the product",
    body: "In a regulated process, a decision that cannot be explained later is a liability regardless of whether it was correct. Every rule version, override and approval is preserved against the case.",
    icon: "record",
  },
  {
    name: "AI advises, a person decides",
    body: "Extraction, scoring, summarisation and triage are labelled as machine generated and confirmed by a named person before they take effect. Nothing is approved or declined by a model on its own.",
    icon: "check",
  },
  {
    name: "Your core systems stay",
    body: "Core banking, policy administration, the agency system and the general ledger keep their jobs. What we build sits above them and fills the gap they were never designed to cover.",
    icon: "layers",
  },
];

const faqs: Faq[] = [
  {
    question: "Are these products only for the Gulf?",
    answer:
      "No. The insurance products were designed against United Arab Emirates regulation, which is where the commercial pressure to connect insurers and brokers arrived first, and that is where the reference deployments are. The architecture is not specific to that market and the products are sold and supported anywhere with a Microsoft tenant. The onboarding, lending and advisory work is already running in Australia as well.",
  },
  {
    question: "Do we have to replace our core banking or policy system?",
    answer:
      "No, and we would argue against it. Core systems are expensive to replace and rarely the actual constraint. The constraint is usually the layer around them: intake, document handling, approvals, channel management and the record of why a decision was made. That is where this work sits.",
  },
  {
    question: "How is customer data protected?",
    answer:
      "It stays in your tenant, in your chosen region, under your access controls and your retention rules. Our consultants work inside your environment under the access you grant, and that access is scoped and logged like anybody else's. We do not take copies of client data into our own systems for any reason.",
  },
  {
    question: "Can you work with our compliance and risk teams during design?",
    answer:
      "It is better if we do, and early. Retrofitting an audit position, a retention rule or a segregation of duties requirement into a finished system is expensive, and in this sector it is the requirement that decides whether anything reaches production at all.",
  },
  {
    question: "What is the smallest sensible engagement?",
    answer:
      "One process, end to end. An onboarding journey, a lending product, a document request cycle. A slice that goes live and is used beats a programme that designs the whole estate before anybody sees a screen, and it gives both sides real information about how the next slice should be scoped.",
  },
];

export default function FinancialServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            service({
              name: "Microsoft business applications for financial services and insurance",
              path: PATH,
              description:
                "Customer onboarding with document understanding, lending and asset finance origination, insurer and broker connectivity, and practice management for advisory firms.",
              serviceType: "Financial services technology consulting",
              areaServed: [
                "the United Arab Emirates",
                "Australia",
                "Saudi Arabia",
              ],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Financial Services", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Financial services and insurance"
        trail={[
          { name: "Home", path: "/" },
          { name: "Financial Services", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Regulated work,</span>
            </span>
            <span>
              <span>and a record that</span>
            </span>
            <span>
              <span>holds up later.</span>
            </span>
          </>
        }
        lead="Banks, lenders, insurers, brokers and advisory firms all carry the same underlying obligation: be able to show, years afterwards, what was decided and on what basis. We build the intake, the rules and the approval layer that produces that record, on top of the core systems you already run rather than in place of them."
        primaryCta={{ label: "Talk about one process", key: "contact" }}
        secondaryCta={{ label: "See the insurance products", key: "insurance" }}
        meta={{
          label: "Working across",
          items: ["Banking", "Lending", "Insurance", "Advisory"],
        }}
      />

      {/* ---------------------------------------------------------------
          The market position, stated once and properly: the Gulf is where
          the reference deployments are, not where the products are limited.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="reach">
        <Container wide>
          <div className="py-band">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
              <Reveal>
                <Eyebrow>Where this is proven, and where it sells</Eyebrow>
                <h2 className="mt-6 measure-tight text-d2">
                  Built against Gulf regulation. Not limited by it.
                </h2>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-body">
                  The insurance products came out of the United Arab Emirates,
                  where regulatory change around direct premium collection made
                  the connection between insurers and brokers an operational
                  problem rather than an inconvenience. That is where the
                  reference deployments are and it is the market we know best.
                </p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-body">
                  Nothing in the architecture is specific to that jurisdiction.
                  The products run in any market with a Microsoft tenant, and
                  the onboarding, lending and advisory work on this page is
                  already delivered in Australia as well as the Gulf.
                </p>
                <div className="mt-8">
                  <TextLink href={href("insurance")}>
                    See the insurance platform in full
                  </TextLink>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="rounded-xl bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-8">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-o-700">
                    Named in this sector
                  </p>
                  <div className="mt-6">
                    <ClientGrid items={FS_CLIENTS} maxColumns={3} />
                  </div>
                  <p className="mt-6 border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-muted">
                    A bank, an Islamic insurer, an automotive finance business, a
                    workers compensation specialist, an automotive services
                    business and an advisory firm. Others are covered by
                    confidentiality terms and are not shown.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Band>

      <Segments
        eyebrow="Four kinds of firm"
        title="Different regulators, the same underlying build"
        lead="A bank, a lender, an insurer and an advisory practice describe their problems in four different vocabularies. Underneath they are asking for the same three things: capture it once, apply the rule consistently, and be able to prove both afterwards."
        segments={segments}
      />

      {/* ---------------------------------------------------------------
          The four commitments that matter in a regulated sector.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="regulated">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Non negotiable"
                title="Four positions we do not move on"
                lead="These come up in every risk review in this sector, so they are stated here rather than discovered in the third meeting."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {REGULATED.map((item, index) => (
                <Reveal key={item.name} delay={index * 90}>
                  <Card className="h-full">
                    <IconChip name={item.icon} size="sm" />
                    <h3 className="mt-5 font-display text-[1.125rem] font-semibold leading-snug text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {item.body}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>

            <Reveal delay={420} className="mt-9">
              <p className="measure flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-muted">
                <ArrowRight className="mt-1 shrink-0 text-o-400" />
                The full position on machine generated output, including what it
                is allowed to do and what it never does, is on the{" "}
                <TextLink href={href("servicesAi")}>
                  AI and Copilot page
                </TextLink>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What risk and technology leads ask in this sector"
        items={faqs}
        tone="canvas"
      />

      <RelatedPages
        title="The products behind this"
        items={[
          {
            key: "insurance",
            blurb:
              "InsureOS and BrokerOS, the two halves of the insurer to broker connection.",
          },
          {
            key: "intelliForm",
            blurb:
              "The intake layer behind onboarding and lending applications.",
          },
          {
            key: "servicesAi",
            blurb:
              "Document understanding, the piece that removes the reading from a review step.",
          },
        ]}
      />

      <ClosingCta
        title="Name the process that generates the most rework."
        lead="Not a transformation programme. The one process where the same information is entered more than once, or where a decision cannot easily be explained a year later. That is where this pays for itself first, and it is a short enough conversation to have properly."
        primary={{ label: "Talk about one process", key: "contact" }}
        secondary={{ label: "See who we have delivered for", key: "clients" }}
      />
    </>
  );
}
