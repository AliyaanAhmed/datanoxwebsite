import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";

import { FigTwoHalves } from "@/components/figures/two-halves";
import { FigQuoteJourney } from "@/components/figures/quote-journey";
import { FigDisconnect } from "@/components/figures/disconnect";
import { FigInsuranceHero } from "@/components/figures/hero-visuals";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Band,
  Card,
  Container,
  SectionHead,
} from "@/components/ui/primitives";
import {
  ClosingCta,
  FaqSection,
  InsightPanel,
  PageHero,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import {
  breadcrumbs,
  faqPage,
  graph,
  service,
  softwareApplication,
} from "@/lib/schema";

const PATH = "/insurance-brokers-management-system/";

export const metadata: Metadata = pageMetadata({
  title: "AI Assisted Insurance Broker Management System",
  description:
    "InsureOS and BrokerOS connect insurers and brokers in the UAE market. Quote, bind and renew system to system, without replacing either core platform.",
  path: PATH,
});

const stats = [
  {
    figure: "90%",
    label: "of broker and insurer trade",
    detail: "still runs on email, phone calls and spreadsheets today",
  },
  {
    figure: "300+",
    label: "brokers asking insurers for API access",
    detail: "that cannot be built one connection at a time",
  },
  {
    figure: "Direct",
    label: "premium collection",
    detail:
      "regulation now pushes collection away from brokers, so the relationship has to run system to system",
  },
];

const sides = [
  {
    key: "insureos" as const,
    tag: "For insurers",
    name: "InsureOS",
    line: "More reach, full control",
    body: "The operating layer for an insurer that designs products and governs how the broker channel reaches them.",
    points: [
      "Product studio and broker management",
      "Rating, quoting, rules and approvals",
      "Publishes governed APIs and digital channels",
      "Every transaction visible and governed",
    ],
    wins: [
      "Reach every broker with no per broker projects",
      "Say yes to an API request instantly",
      "Launch a new product in days",
    ],
  },
  {
    key: "brokeros" as const,
    tag: "For brokers",
    name: "BrokerOS",
    line: "More markets, less friction",
    body: "The end to end operating system for a broker running the whole book of business.",
    points: [
      "Business to consumer aggregator portal",
      "Business to business tender management",
      "Connects out to insurers to quote and bind",
      "One system for the entire book",
    ],
    wins: [
      "Access every connected insurer from one platform",
      "Quote in minutes rather than days",
      "No rekeying and no chasing email threads",
    ],
  },
];

const faqs: Faq[] = [
  {
    question: "What is the Datanox insurance and broker platform?",
    answer:
      "It is two connected products. InsureOS is the operating layer an insurer uses to design products and govern the broker channel. BrokerOS is the operating system a broker uses to run its book. Each is complete on its own, and together they let the two sides trade system to system rather than by email.",
  },
  {
    question: "Does it replace our policy administration or agency system?",
    answer:
      "No. Both sides keep the core system they already depend on. InsureOS and BrokerOS sit above those systems and fill the gap they were never built to cover, which is the connection between an insurer and a broker.",
  },
  {
    question: "What does AI assisted mean here specifically?",
    answer:
      "It refers to the automated rating, risk scoring and rules that run when a quote is requested, returning a quote with the reasoning behind it rather than a number alone. Referrals still route to a human underwriter. If you want the detail of which models run where, ask on the call and we will walk through it rather than describe it vaguely here.",
  },
  {
    question: "How does the platform connect brokers and insurers?",
    answer:
      "An insurer publishes a product in InsureOS and it goes live as a governed API. A broker in BrokerOS selects that product and quotes against it directly. Nobody builds a bespoke integration for each pairing, which is why three hundred broker requests can be answered rather than queued.",
  },
  {
    question: "Which market is this built for?",
    answer:
      "It was designed against the United Arab Emirates market, where the Central Bank has tightened how the market operates and direct premium collection is pushing insurers and brokers toward system to system relationships. That is where the reference deployments are. The architecture itself is not specific to that jurisdiction, and both products are sold and supported in any market with a Microsoft tenant.",
  },
  {
    question: "Does it handle commission tracking and renewal alerts?",
    answer:
      "Renewals and the full quote to bind cycle run in the platform. Commission handling depends on how your book is structured, so it is worth walking through your specific arrangement rather than us claiming blanket support here.",
  },
];

export default function InsurancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            service({
              name: "Insurance and broker management system",
              path: PATH,
              description:
                "InsureOS and BrokerOS connect insurers and brokers system to system for product publication, quoting, binding and renewal, without replacing either side's core platform.",
              serviceType: "Insurance broker management system",
              areaServed: ["United Arab Emirates"],
            }),
            softwareApplication({
              name: "InsureOS",
              path: href("insureos"),
              description:
                "The operating layer for an insurer that designs products and governs how the broker channel reaches them, publishing governed APIs and running rating, quoting and approvals.",
              features: [
                "Product studio",
                "Broker management",
                "Rating and quoting engine",
                "Rules and approvals",
                "Governed API publication",
              ],
            }),
            softwareApplication({
              name: "BrokerOS",
              path: href("brokeros"),
              description:
                "The end to end operating system for an insurance broker running the whole book of business, connecting out to insurers to quote and bind.",
              features: [
                "Business to consumer aggregator portal",
                "Business to business tender management",
                "Quote and bind against connected insurers",
                "Whole of book management",
              ],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Financial Services", path: href("financialServices") },
              { name: "Insurance", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Insurance platform"
        trail={[
          { name: "Home", path: "/" },
          { name: "Financial Services", path: href("financialServices") },
          { name: "Insurance", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Everyone has</span>
            </span>
            <span>
              <span>a system. Nothing</span>
            </span>
            <span>
              <span>is connected.</span>
            </span>
          </>
        }
        lead="Brokers have invested in their platforms. Insurers have invested in theirs. The two sides were never wired together, so the business between them is still carried by hand. InsureOS and BrokerOS are the two halves of the connection, and neither replaces what sits underneath."
        secondaryCta={{ label: "See InsureOS", key: "insureos" }}
        meta={{
          label: "Built on",
          items: ["Dynamics 365", "Power Platform", "Dataverse"],
        }}
        figure={<FigInsuranceHero />}
      />

      {/* The market as it stands */}
      <Band tone="warm">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="The market as it stands"
                title="A market built in silos"
                lead="Brokers and insurers run on their own disconnected platforms, and the Central Bank has tightened how the market is allowed to operate. The gap between the two sides is now a compliance problem as well as an efficiency one."
              />
            </Reveal>

            <Reveal delay={140} className="mt-12">
              <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-10">
                <FigDisconnect />
              </div>
            </Reveal>

            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <Reveal as="li" key={stat.figure} delay={index * 90}>
                  <Card className="h-full">
                    <p className="bg-gradient-to-br from-o-500 to-o-700 bg-clip-text font-display text-[2.75rem] leading-none text-transparent">
                      {stat.figure}
                    </p>
                    <p className="mt-4 font-display text-[1.0625rem] leading-snug">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                      {stat.detail}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Band>

      {/* Two halves */}
      <Band tone="canvas">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Two halves of one solution"
                align="center"
                title="One platform for each side of the trade"
                lead="BrokerOS and InsureOS solve the same problem from opposite ends. Each is a complete operating system in its own right, and they are designed to connect."
                className="mx-auto max-w-[46rem]"
              />
            </Reveal>

            <Reveal delay={140} className="mt-12">
              <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-10">
                <FigTwoHalves />
              </div>
            </Reveal>

            <ul className="mt-8 grid gap-6 lg:grid-cols-2">
              {sides.map((side, index) => (
                <Reveal as="li" key={side.key} delay={index * 110}>
                  <Card className="flex h-full flex-col">
                    <span className="inline-flex w-fit items-center rounded-pill bg-o-50 px-3 py-1.5 text-[0.8125rem] font-medium tracking-[0.02em] text-o-700">
                      {side.tag}
                    </span>
                    <h3 className="mt-5 text-d3">{side.name}</h3>
                    <p className="mt-2 font-display text-[1.0625rem] text-o-700">
                      {side.line}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed">
                      {side.body}
                    </p>

                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-rule pt-6">
                      {side.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[0.9375rem] leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-o-500"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 font-mono text-[0.8125rem] tracking-[0.02em] text-muted">
                      What it wins you
                    </p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {side.wins.map((win) => (
                        <li key={win} className="text-[0.9375rem] text-ink-2">
                          {win}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={href(side.key) as Route}
                      className="group mt-auto flex items-center gap-2 pt-7 font-medium text-o-700 transition-colors hover:text-o-800"
                    >
                      Open {side.name}
                      <ArrowRight />
                    </Link>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Band>

      {/* The quote journey */}
      <Band tone="warmer">
        <Container wide>
          <div className="grid gap-10 py-band lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHead
                eyebrow="The journey of a quote"
                title="Start to finish, without an inbox"
                lead="Seven steps, in order, from an insurer publishing a product to a policy that can still be reproduced years later. The two marked handoffs are the moments that used to be an email and a wait."
              />
            </Reveal>
            <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-9">
              <FigQuoteJourney />
            </div>
          </div>
        </Container>
      </Band>

      {/* Value for everyone */}
      <Band tone="canvas">
        <Container wide>
          <div className="py-band">
            <Reveal from="scale">
              <InsightPanel
                eyebrow="A win on both sides"
                title="The market gets faster, cleaner and fully traceable"
                icon="handshake"
                side={
                  <div className="grid gap-3 rounded-lg border border-o-100 bg-gradient-to-br from-white to-o-50 p-5 shadow-[var(--shadow-soft)]">
                    {["Insurer", "Broker", "Audit trail"].map((item) => (
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
                  Without anyone replacing the core systems they already depend
                  on. Every manual handoff removed is one less place a file can
                  go missing and one less thing to reconstruct at audit.
                </p>
              </InsightPanel>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What both sides of the market ask"
        items={faqs} tone="warm" />

      <RelatedPages
        title="Each half in full"
        items={[
          {
            key: "insureos",
            blurb:
              "Product studio, rating, approvals and governed API publication for insurers.",
          },
          {
            key: "brokeros",
            blurb:
              "Aggregator portal, tender management and whole of book operations for brokers.",
          },
          {
            key: "financialServices",
            blurb:
              "The rest of the sector, and why the Gulf is where this was proven rather than where it is limited.",
          },
        ]}
      />

      <ClosingCta
        title="Bring the quote that currently takes three days and four emails."
        lead="One quote, traced from the first request to the bound policy, with every handoff named. The waiting almost always turns out to be concentrated in one or two places nobody has looked at."
      />
    </>
  );
}
