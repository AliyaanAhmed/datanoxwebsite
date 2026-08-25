import type { Metadata } from "next";

import { FigQuoteJourney } from "@/components/figures/quote-journey";
import { MarkBrokerOs } from "@/components/figures/product-marks";
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

const PATH = "/insurance-brokers-management-system/brokeros/";

export const metadata: Metadata = pageMetadata({
  title: "BrokerOS, the Operating System for Insurance Brokers",
  description:
    "BrokerOS runs a broker’s whole book: aggregator portal, tender management, and direct quoting against every connected insurer without an inbox in between.",
  path: PATH,
});

const capabilities = [
  {
    name: "Aggregator portal",
    body: "A consumer facing portal where a client can compare and buy without a phone call, drawing live from the insurers you are connected to rather than from a rate sheet.",
    detail: "Business to consumer",
    icon: "portal" as const,
  },
  {
    name: "Tender management",
    body: "Run a corporate tender from brief through to placement in one place, with every insurer response held against the same submission rather than scattered across replies.",
    detail: "Business to business",
    icon: "tender" as const,
  },
  {
    name: "Quote and bind directly",
    body: "Connect out to insurers and quote against their published products. What used to be an email and a wait becomes a request and an answer.",
    detail: "Minutes, not days",
    icon: "link" as const,
  },
  {
    name: "Whole of book",
    body: "Clients, policies, renewals and claims activity in one system, so the state of the book is something you can look at rather than something you assemble.",
    detail: "One system",
    icon: "book" as const,
  },
  {
    name: "No rekeying",
    body: "Client detail entered once flows to the insurer as structured data. The single biggest source of error in placement disappears with the retyping that caused it.",
    detail: "Entered once",
    icon: "send" as const,
  },
  {
    name: "Renewals in sight",
    body: "Renewal dates sit in the same system as the book they belong to, so a renewal is a scheduled piece of work rather than something remembered.",
    detail: "Scheduled, not remembered",
    icon: "clock" as const,
  },
];

const faqs: Faq[] = [
  {
    question: "What is BrokerOS?",
    answer:
      "BrokerOS is an end to end operating system for an insurance broker. It runs the whole book of business, provides an aggregator portal for consumers and tender management for corporate work, and connects out to insurers so quotes are requested and returned in the system rather than by email.",
  },
  {
    question: "Does BrokerOS replace our agency management system?",
    answer:
      "No. The agency system you run stays in place. BrokerOS sits above it and covers the connection out to insurers, which is the part no agency system was built to do.",
  },
  {
    question: "Do the insurers we work with have to adopt InsureOS first?",
    answer:
      "An insurer running InsureOS connects out of the box. Any insurer exposing a governed API can be connected, so adoption does not have to happen in a fixed order across the market.",
  },
  {
    question: "What changes about how long a quote takes?",
    answer:
      "Today a quote typically means an email, a wait, a rekeyed submission and a reply. In BrokerOS the client detail is captured once and sent as structured data, the insurer's rating runs on receipt, and the quote returns with the reasoning attached. The waiting that dominates the current cycle is what is removed.",
  },
  {
    question: "What about direct premium collection?",
    answer:
      "Regulation is pushing collection away from brokers, which is one of the reasons the broker and insurer relationship has to run system to system. When a quote is bound, a payment link is issued and premium flows directly, so the broker is out of the collection path by design rather than by workaround.",
  },
];

export default function BrokerOsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            softwareApplication({
              name: "BrokerOS",
              path: PATH,
              description:
                "An end to end operating system for an insurance broker, with a consumer aggregator portal, corporate tender management, and direct quoting and binding against connected insurers.",
              features: [
                "Business to consumer aggregator portal",
                "Business to business tender management",
                "Direct quote and bind against connected insurers",
                "Whole of book management",
                "Structured submission with no rekeying",
                "Renewal scheduling",
              ],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Insurance", path: href("insurance") },
              { name: "BrokerOS", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="BrokerOS, for brokers"
        trail={[
          { name: "Home", path: "/" },
          { name: "Insurance", path: href("insurance") },
          { name: "BrokerOS", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Quote in minutes,</span>
            </span>
            <span>
              <span>not days.</span>
            </span>
          </>
        }
        lead="BrokerOS runs the whole book of business and connects out to every insurer you are joined to. Client detail is captured once and arrives as structured data, so the wait that dominates a placement today is the part that disappears."
        secondaryCta={{ label: "See InsureOS", key: "insureos" }}
        meta={{
          label: "Built on",
          items: ["Dynamics 365", "Power Platform", "Dataverse"],
        }}
        figure={
          <div className="overflow-hidden rounded-xl ring-1 ring-o-100">
            <MarkBrokerOs />
          </div>
        }
      />

      <ProofStrip
        tone="peach"
        stats={[
          {
            figure: "90%",
            label: "of broker and insurer trade",
            detail: "still runs on email, phone calls and spreadsheets",
          },
          {
            figure: "One",
            label: "platform for the whole book",
            detail: "rather than a system per line of business",
          },
          {
            figure: "Zero",
            label: "rekeying between client and insurer",
            detail: "what is captured once arrives as structured data",
          },
        ]}
      />

      <Capabilities
        eyebrow="Capabilities"
        title="What the broker side holds"
        items={capabilities}
        variant="feature"
        tone="warm"
      />

      <Band tone="canvas">
        <Container wide>
          <div className="grid gap-10 py-band lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHead
                eyebrow="The journey of a quote"
                title="Where BrokerOS sits in the cycle"
                lead="Two of these seven steps happen in BrokerOS, and the two marked handoffs are the moments that used to be an email and a wait."
              />
            </Reveal>
            <div
              data-interactive-card=""
              data-rich-card=""
              className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-9"
            >
              <FigQuoteJourney />
            </div>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What brokers ask before moving their book"
        items={faqs} tone="warm" />

      <RelatedPages
        title="The other side of the trade"
        items={[
          {
            key: "insureos",
            blurb: "The other half of the connection, run by the insurer.",
          },
          {
            key: "insurance",
            blurb:
              "The full picture of how the two sides connect, and why the gap exists.",
          },
          {
            key: "financialServices",
            blurb:
              "Where insurance sits alongside banking, lending and advisory work.",
          },
        ]}
      />

      <ClosingCta
        title="Bring the placement that currently takes four emails."
        lead="Take one placement you made last month and count the emails it took. That number is the argument, and it is usually larger than anybody in the office would guess."
      />
    </>
  );
}
