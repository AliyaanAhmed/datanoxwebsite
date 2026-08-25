import type { Metadata } from "next";

import { FigTwoHalves } from "@/components/figures/two-halves";
import { Reveal } from "@/components/ui/reveal";
import { Band, Container, SectionHead } from "@/components/ui/primitives";
import {
  ClosingCta,
  FaqSection,
  PageHero,
  ProofStrip,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { Capabilities } from "@/components/page/capabilities";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, softwareApplication } from "@/lib/schema";

const PATH = "/insurance-brokers-management-system/insureos/";

export const metadata: Metadata = pageMetadata({
  title: "InsureOS, the Operating Layer for Insurers",
  description:
    "InsureOS lets an insurer design products, publish them as governed APIs, and run rating and approvals across the whole broker channel.",
  path: PATH,
});

const capabilities = [
  {
    name: "Product studio",
    body: "Configure a product once, with its wordings, rules and rating attached, then publish it. The product becomes live and governed rather than a document that gets emailed around.",
    detail: "Configure and publish",
    icon: "layers" as const,
  },
  {
    name: "Broker management",
    body: "See every broker connected to you, what they are authorised to sell, and what they have actually placed. Onboarding a broker becomes a permission rather than a project.",
    detail: "Channel in one view",
    icon: "people" as const,
  },
  {
    name: "Rating and quoting",
    body: "The rating engine runs on request and returns a quote with the factors that produced it. A broker gets a number and the reasoning at the same time.",
    detail: "Quote with reasoning",
    icon: "gauge" as const,
  },
  {
    name: "Rules and approvals",
    body: "Define what passes straight through and what has to be seen by an underwriter. Clear cases stop waiting behind referrals, and every decision is recorded where it was made.",
    detail: "Straight through or referred",
    icon: "rules" as const,
  },
  {
    name: "Governed API publication",
    body: "Publishing a product publishes an API. Brokers connect to that rather than to a bespoke integration built for them, which is how three hundred requests become answerable.",
    detail: "One API, every broker",
    icon: "api" as const,
  },
  {
    name: "Full transaction visibility",
    body: "Every quote, referral, bind and payment is a record you can report on. Direct premium collection stops being a reconciliation exercise.",
    detail: "Auditable by default",
    icon: "record" as const,
  },
];

const faqs: Faq[] = [
  {
    question: "What is InsureOS?",
    answer:
      "InsureOS is the operating layer an insurer uses to design products and govern how the broker channel reaches them. It holds the product studio, the rating and quoting engine, the rules and approvals, and the API publication that lets brokers connect without a bespoke build each time.",
  },
  {
    question: "Does InsureOS replace our policy administration system?",
    answer:
      "No. Your policy administration system stays exactly as it is. InsureOS sits above it and covers the part it was never built for, which is the governed connection out to the broker channel.",
  },
  {
    question: "How does publishing a product as an API actually work?",
    answer:
      "When the product team publishes a product in the studio, that product becomes available as a governed API endpoint with its rules and rating behind it. A connected broker can quote against it immediately. There is no separate integration project per broker, which is the constraint that makes three hundred outstanding requests impossible to clear today.",
  },
  {
    question: "Can we control which brokers see which products?",
    answer:
      "Yes. Authorisation is per broker and per product, so a product can go to the whole channel, to a named segment, or to a single broker, and that decision is recorded rather than managed by who was told about it.",
  },
  {
    question: "Does it work with BrokerOS only, or with any broker?",
    answer:
      "A broker running BrokerOS gets the connection out of the box. Any broker able to consume a governed API can connect, so InsureOS does not require its counterpart to be adopted first.",
  },
];

export default function InsureOsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            softwareApplication({
              name: "InsureOS",
              path: PATH,
              description:
                "The operating layer for an insurer that designs products, publishes them as governed APIs, and runs rating, quoting, rules and approvals across the whole broker channel.",
              features: [
                "Product studio",
                "Broker management and authorisation",
                "Rating and quoting engine",
                "Rules and approval routing",
                "Governed API publication",
                "Full transaction visibility",
              ],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Insurance", path: href("insurance") },
              { name: "InsureOS", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="InsureOS, for insurers"
        trail={[
          { name: "Home", path: "/" },
          { name: "Insurance", path: href("insurance") },
          { name: "InsureOS", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Say yes to an API</span>
            </span>
            <span>
              <span>request instantly.</span>
            </span>
          </>
        }
        lead="InsureOS is the operating layer for an insurer that designs products and governs how the broker channel reaches them. Publishing a product publishes an API, so reaching every broker stops being a project per broker."
        secondaryCta={{ label: "See BrokerOS", key: "brokeros" }}
        meta={{
          label: "Built on",
          items: ["Dynamics 365", "Power Platform", "Dataverse"],
        }}
      />

      <ProofStrip
        tone="peach"
        stats={[
          {
            figure: "300+",
            label: "brokers asking insurers for API access",
            detail: "that cannot be built one connection at a time",
          },
          {
            figure: "90%",
            label: "of broker and insurer trade",
            detail: "still runs on email, phone calls and spreadsheets",
          },
          {
            figure: "Days",
            label: "to launch a product across the whole channel",
            detail: "rather than a project for each broker in turn",
          },
        ]}
      />

      <Capabilities
        eyebrow="Capabilities"
        title="What the insurer side holds"
        items={capabilities}
        variant="ledger"
        tone="warm"
      />

      <Band tone="canvas">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Where it sits"
                title="Above your core system, not instead of it"
                lead="The policy administration system you already depend on stays untouched. InsureOS covers the layer above it, where the channel actually lives."
              />
            </Reveal>
            <Reveal delay={140} className="mt-12">
              <div
                data-interactive-card=""
                data-rich-card=""
                className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-10"
              >
                <FigTwoHalves />
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What insurers ask before publishing a product"
        items={faqs} tone="warm" />

      <RelatedPages
        title="The broker side and the sector"
        items={[
          {
            key: "brokeros",
            blurb: "The other half of the connection, run by the broker.",
          },
          {
            key: "insurance",
            blurb:
              "The full picture of how the two sides connect, and the journey of a quote.",
          },
          {
            key: "financialServices",
            blurb:
              "The wider sector picture: banking onboarding, lending origination and advisory practices.",
          },
        ]}
      />

      <ClosingCta
        title="Bring the broker API request that has been open for months."
        lead="Name one product in your book and one broker asking for access to it. We will walk through what publishing that as a governed interface would take, and what it would stop costing you."
      />
    </>
  );
}
