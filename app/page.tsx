import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";

import { FigThreeWays } from "@/components/figures/three-ways";
import { FigDisconnect } from "@/components/figures/disconnect";
import {
  MarkGovernance,
  MarkIntelliForm,
  MarkIntelliAssessment,
  MarkInsureOs,
  MarkBrokerOs,
} from "@/components/figures/product-marks";
import { Reveal } from "@/components/ui/reveal";
import { ClientLogos } from "@/components/page/logo-wall";
import { IconChip } from "@/components/ui/icons";
import {
  Action,
  ArrowRight,
  Band,
  Card,
  Container,
  Eyebrow,
  Lead,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { ProofStrip } from "@/components/page/blocks";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Datanox | Enterprise Apps for the Microsoft Ecosystem",
  description:
    "Dynamics 365 and Power Platform delivery, five products of our own, and senior consultants placed inside your team. Australia, the Gulf and the United States.",
  path: "/",
});

/* ==========================================================================
   Content
   ========================================================================== */

/**
 * Five products, each described on its own terms.
 *
 * The earlier version of this page ran three cards under the heading "Three
 * products that share their data", with the line "bought together they stop
 * being three tools". That framing was wrong: these are separate pieces of
 * software sold separately, and two of the five were filed under an industry
 * rather than shown as products at all.
 *
 * No entry below refers to another entry.
 */
const products = [
  {
    key: "governance" as const,
    name: "Governance and Performance",
    line: "Budget, delivery and KPI in one governed system",
    body: "An ERP records the transaction. This governs the decision behind it, so the question of whether a given spend achieved anything is answerable from live data rather than from a reconstruction.",
    mark: MarkGovernance,
    icon: "budget" as const,
    capabilities: ["Budgeting", "Project execution", "KPI management", "Audit trail"],
    who: "Finance and strategy leads in multi entity organisations",
  },
  {
    key: "intelliForm" as const,
    name: "Intelli Form",
    line: "Complex forms on Power Pages, without custom code",
    body: "Multi step flows with conditional logic, real time validation and payments taken inside the form. A submission arrives as a Dataverse record rather than as an email somebody has to retype.",
    mark: MarkIntelliForm,
    icon: "drag" as const,
    capabilities: ["Drag and drop builder", "Conditional steps", "Payments", "Portal embedding"],
    who: "Process owners running applications, requests and certifications",
  },
  {
    key: "intelliAssessment" as const,
    name: "Intelli Assessment",
    line: "Policy turned into weighted, defensible scoring",
    body: "Dynamics 365 has no native support for rule based assessment. This adds it: categories, criteria, questions and rules, with scores rolling up to an outcome that traces back to the rule and the evidence behind it.",
    mark: MarkIntelliAssessment,
    icon: "rubric" as const,
    capabilities: ["Weighted rubrics", "Automated outcomes", "Policy extraction", "Appeal ready trail"],
    who: "Admissions, eligibility and certification programmes",
  },
  {
    key: "insureos" as const,
    name: "InsureOS",
    line: "An insurer publishes a product as a governed API",
    body: "Product studio, rating and quoting, and approval routing, with the finished product published to the broker channel as a live endpoint instead of a rate sheet and a phone number.",
    mark: MarkInsureOs,
    icon: "shield" as const,
    capabilities: ["Product studio", "Rating engine", "Referral routing", "Channel governance"],
    who: "Insurers distributing through brokers",
  },
  {
    key: "brokeros" as const,
    name: "BrokerOS",
    line: "A broker quotes against every connected insurer",
    body: "One book of business, one request, and quotes returning from each connected insurer side by side. The core agency system underneath stays exactly where it is.",
    mark: MarkBrokerOs,
    icon: "tender" as const,
    capabilities: ["Aggregator portal", "Tender management", "Bind and pay", "Whole book view"],
    who: "Brokers running placement at volume",
  },
];

const industries = [
  {
    key: "government" as const,
    name: "Government",
    region: "The Gulf and Australia",
    line: "Budget, delivery and reporting an auditor can follow",
    body: "Strategic planning down to committed spend, citizen services on Power Pages, grant and tender assessment, and correspondence that stops living in a shared mailbox.",
    proof: "Governance and Performance",
    icon: "shield" as const,
  },
  {
    key: "notForProfit" as const,
    name: "Not for Profit",
    region: "Australia",
    line: "Fundraising, NDIS, health and professional associations",
    body: "Pledge campaigns and donor management, NDIS scheduling and approvals, patient engagement, and the accountability reporting each funder asks for in its own format.",
    proof: "Community Work Australia",
    icon: "handshake" as const,
  },
  {
    key: "financialServices" as const,
    name: "Financial Services",
    region: "The Gulf and Australia",
    line: "Banks, lenders, insurers and brokers",
    body: "Onboarding that reads the document before the officer opens it, lending origination with the policy configured rather than compiled, and the insurer to broker connection neither vendor built.",
    proof: "InsureOS and BrokerOS",
    icon: "shield" as const,
  },
  {
    key: "education" as const,
    name: "Education",
    region: "Australia",
    line: "One request routed across admin, finance and records",
    body: "Admissions, degree issuance, digital transactions and assessment, moved from manual review into a routed process with a visible state.",
    proof: "UNSW and University of Melbourne",
    icon: "book" as const,
  },
];

const stats = [
  {
    figure: "25+",
    label: "implementations delivered",
    detail: "across government, education, not for profit, insurance and energy",
  },
  {
    figure: "50",
    label: "people, 35 of them in delivery",
    detail: "consultants, developers, architects and quality assurance specialists",
  },
  {
    figure: "4",
    label: "regions served",
    detail: "Australia, the United Arab Emirates, Saudi Arabia and the United States",
  },
];

const testimonials = [
  {
    quote:
      "Datanox helped us automate our workflows and reduce manual processing time by 40 percent. Their solution is reliable, scalable and easy to use.",
    name: "Ahmed Khan",
    role: "Operations Manager",
    org: "Community Work Australia",
  },
  {
    quote:
      "Their team understood our needs perfectly and delivered a solution that improved efficiency across our entire organisation.",
    name: "Sarah Mitchell",
    role: "Head of Digital Transformation",
    org: "CHF Australia",
  },
  {
    quote:
      "We saw a significant improvement in productivity and accuracy after implementing the Datanox solution.",
    name: "Michael Brown",
    role: "IT Director",
    org: "FYP Hub",
  },
  {
    quote:
      "Datanox transformed a complex manual process into a smooth, automated workflow. Our team now spends far less time on repetitive administrative tasks.",
    name: "Daniel Wilson",
    role: "Business Operations Lead",
    org: null,
  },
];

/* ==========================================================================
   Page
   ========================================================================== */

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(breadcrumbs([{ name: "Home", path: "/" }])),
        }}
      />

      {/* ================================================================ */}
      {/* Hero                                                             */}
      {/* ================================================================ */}
      <Band tone="canvas" block="hero" className="overflow-hidden">
        <div
          aria-hidden="true"
          data-orb=""
          className="pointer-events-none absolute right-[-14%] top-[-22%] hidden h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,var(--color-o-100)_0%,var(--color-o-50)_46%,transparent_68%)] opacity-80 lg:block"
        />

        <Container wide className="relative">
          <div className="grid items-start gap-12 pb-16 pt-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:pb-24 lg:pt-16">
            <div data-hero-interactive="">
              <Reveal>
                <Eyebrow>Microsoft business applications</Eyebrow>
              </Reveal>

              <Reveal
                as="h1"
                mask
                delay={90}
                className="home-hero-title mt-7 text-d1"
                aria-label="Excellence in Microsoft business applications."
              >
                <span>
                  <span
                    data-home-gradient=""
                    className="bg-gradient-to-br from-o-500 via-o-600 to-o-700 bg-clip-text text-transparent"
                  >
                    Excellence in{" "}
                  </span>
                </span>
                <span>
                  <span>Microsoft business{" "}</span>
                </span>
                <span>
                  <span>applications.</span>
                </span>
              </Reveal>

              <Reveal delay={340} className="home-hero-lead mt-7">
                <Lead>
                  Datanox designs, builds and runs Dynamics 365 and Power
                  Platform systems for governments, universities, insurers and
                  not for profit organisations. Fifty people, thirty five of them
                  in delivery, and more than twenty five implementations across
                  four regions.
                </Lead>
              </Reveal>

              <Reveal
                delay={3000}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <Action href={href("contact")}>Talk to us about a project</Action>
                <Action href={href("services")} variant="ghost">
                  How we work
                  <ArrowRight />
                </Action>
              </Reveal>

              <Reveal
                delay={3220}
                className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-rule pt-7"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  Built on
                </span>
                {["Dynamics 365", "Power Platform", "Dataverse", "Copilot"].map(
                  (platform) => (
                    <span
                      key={platform}
                      className="text-[0.875rem] font-medium text-ink-2"
                    >
                      {platform}
                    </span>
                  ),
                )}
              </Reveal>
            </div>

            <Reveal delay={200} className="hero-media lg:pt-12">
              <FigThreeWays />
            </Reveal>
          </div>
        </Container>
      </Band>

      <ClientLogos />

      {/* ================================================================ */}
      {/* Three ways to buy                                                */}
      {/* ================================================================ */}
      <Band tone="warm" block="models">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="How to work with us"
                title="One practice. Three separate ways to buy."
                lead="These are different commercial lines with different buyers, not tiers of one thing. Most clients start with one and add another later."
              />
            </Reveal>

            <ul className="mt-12 grid gap-5 lg:grid-cols-3">
              {[
                {
                  key: "governance" as const,
                  label: "Products",
                  headline: "License our software",
                  body: "Five products built on Power Platform, each sold on its own and shaped by real deployments rather than drawn up on a whiteboard.",
                  cta: "See the five products",
                },
                {
                  key: "services" as const,
                  label: "Services",
                  headline: "We design and build it",
                  body: "Dynamics 365, Power Platform, AI and Copilot, and migration off on premises infrastructure. Implementation through to support.",
                  cta: "See what we deliver",
                },
                {
                  key: "staffAug" as const,
                  label: "People",
                  headline: "Our team inside yours",
                  body: "Senior consultants from the same delivery practice, working your week, in your tenant, for terms from six months to three years.",
                  cta: "See who we place",
                },
              ].map((model, index) => (
                <Reveal as="li" key={model.label} delay={index * 90}>
                  <Link
                    data-interactive-card=""
                    href={href(model.key) as Route}
                    className="group flex h-full flex-col rounded-lg bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-o-200 lg:p-8"
                  >
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-o-700">
                      {model.label}
                    </span>
                    <span className="mt-4 block font-display text-[1.5rem] font-semibold leading-tight text-ink">
                      {model.headline}
                    </span>
                    <span className="mt-4 block text-[0.9375rem] leading-relaxed text-body">
                      {model.body}
                    </span>
                    <span className="mt-auto flex items-center gap-2 border-t border-rule pt-6 text-[0.875rem] font-medium text-o-700 mt-7">
                      {model.cta}
                      <ArrowRight />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Band>

      {/* ================================================================ */}
      {/* The problem                                                      */}
      {/* ================================================================ */}
      <Band tone="canvas" block="problem">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="The gap"
                align="center"
                title={
                  <>
                    You approved it.
                    <br />
                    Then the trail goes cold.
                  </>
                }
                lead="Between the decision and the outcome, where money turns into work and work is supposed to turn into results, accountability quietly disappears. Every organisation already governs itself. The activities just live in separate systems, run on different clocks, and never reference one another."
                className="mx-auto max-w-[46rem]"
              />
            </Reveal>

            <Reveal delay={140} className="mt-14">
              <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-10">
                <FigDisconnect />
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      <ProofStrip tone="peach" stats={stats} />

      {/* ================================================================ */}
      {/* Products, as five rows rather than a grid of three               */}
      {/* ================================================================ */}
      <Band tone="canvas" id="products" block="products">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Products"
                title="Five products, sold separately"
                lead="Each one solves a problem on its own and is bought on its own. They share a platform, which is not the same thing as being a suite."
              />
            </Reveal>

            <ul className="mt-14 flex flex-col gap-6">
              {products.map((product, index) => {
                const Mark = product.mark;
                const flipped = index % 2 === 1;
                return (
                  <Reveal as="li" key={product.key} delay={index * 70}>
                    <Card
                      hoverable
                      className={`grid items-center gap-8 !p-6 lg:!p-8 ${
                        flipped
                          ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]"
                          : "lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]"
                      }`}
                    >
                      {/* Explicit column placement rather than order, because
                          order changes placement sequence and would drop the
                          mark into whichever track came next. */}
                      <div
                        data-fig=""
                        data-reveal=""
                        suppressHydrationWarning
                        className={`overflow-hidden rounded-lg lg:row-start-1 ${
                          flipped ? "lg:col-start-2" : "lg:col-start-1"
                        }`}
                      >
                        <Mark />
                      </div>

                      <div
                        className={`lg:row-start-1 ${
                          flipped ? "lg:col-start-1" : "lg:col-start-2"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <IconChip name={product.icon} size="sm" />
                          <h3 className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
                            {product.name}
                          </h3>
                        </div>
                        <p className="mt-3 font-display text-[1.0625rem] leading-snug text-o-700">
                          {product.line}
                        </p>
                        <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-body">
                          {product.body}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                          {product.capabilities.map((capability) => (
                            <span
                              key={capability}
                              className="rounded-pill bg-o-50 px-3 py-1.5 text-[0.75rem] font-medium text-o-800"
                            >
                              {capability}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                            {product.who}
                          </span>
                          <TextLink href={href(product.key)}>
                            Open {product.name}
                          </TextLink>
                        </div>
                      </div>
                    </Card>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </Container>
      </Band>

      {/* ================================================================ */}
      {/* Industries                                                       */}
      {/* ================================================================ */}
      <Band tone="warmer" block="industries">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Industries"
                title="Where the work concentrates"
                lead="Regulated, reported on, and short of the people needed to move data by hand. Depth in approval heavy environments is what the practice has, and it does not transfer evenly to every sector."
              />
            </Reveal>

            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((industry, index) => (
                <Reveal as="li" key={industry.key} delay={index * 110}>
                  <Link
                    data-interactive-card=""
                    href={href(industry.key) as Route}
                    className="group flex h-full flex-col rounded-lg bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-o-200 lg:p-8"
                  >
                    <span className="inline-flex w-fit items-center gap-2 rounded-pill bg-o-50 px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-o-700">
                      {industry.region}
                    </span>
                    <h3 className="mt-5 text-d3">{industry.name}</h3>
                    <p className="mt-3 font-display text-[1.0625rem] leading-snug text-ink-2">
                      {industry.line}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed">
                      {industry.body}
                    </p>
                    <span className="mt-auto flex items-center justify-between gap-4 border-t border-rule pt-6 mt-7">
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                        {industry.proof}
                      </span>
                      <ArrowRight className="text-o-600" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={220} className="mt-8">
              <p className="text-[0.9375rem] text-muted">
                Energy work, and anything outside these four, runs through the{" "}
                <TextLink href={href("services")}>delivery practice</TextLink>{" "}
                and through{" "}
                <TextLink href={href("staffAug")}>placed consultants</TextLink>.
                The full list of organisations is on the{" "}
                <TextLink href={href("clients")}>clients page</TextLink>.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ================================================================ */}
      {/* Proof                                                            */}
      {/* ================================================================ */}
      <Band tone="canvas" block="proofwall">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="In their words"
                align="center"
                title="What the work produced"
                lead="Named people, named organisations, and the change they measured."
                className="mx-auto max-w-[40rem]"
              />
            </Reveal>

            <ul className="mt-14 grid gap-6 sm:grid-cols-2">
              {testimonials.map((item, index) => (
                <Reveal as="li" key={item.name} delay={index * 80}>
                  <Card className="flex h-full flex-col">
                    <svg
                      viewBox="0 0 32 24"
                      aria-hidden="true"
                      className="h-5 w-7 fill-o-300"
                    >
                      <path d="M13 24V13.5C13 6 8.5 1 0 0v5c4.5 1 7 4 7 8.5H0V24h13Zm19 0V13.5C32 6 27.5 1 19 0v5c4.5 1 7 4 7 8.5h-7V24h13Z" />
                    </svg>
                    <blockquote className="mt-5 font-display text-[1.0625rem] leading-relaxed text-ink lg:text-[1.125rem]">
                      {item.quote}
                    </blockquote>
                    <div className="mt-auto flex items-center gap-3 border-t border-rule pt-6 mt-7">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-o-400 to-o-600 font-display text-[0.9375rem] font-semibold text-white">
                        {item.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block text-[0.9375rem] font-medium text-ink">
                          {item.name}
                        </span>
                        <span className="block text-[0.8125rem] text-muted">
                          {item.role}
                          {item.org ? `, ${item.org}` : ""}
                        </span>
                      </span>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="mt-6">
              <Link
                data-interactive-card=""
                href={href("caseStudies") as Route}
                className="group flex flex-col gap-6 overflow-hidden rounded-xl bg-gradient-to-br from-o-500 to-o-700 p-8 shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between lg:p-10"
              >
                <span>
                  <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/70">
                    Case study
                  </span>
                  <span className="mt-3 block max-w-[28ch] font-display text-d3 !text-white">
                    Community Work Australia moved its reporting off
                    spreadsheets.
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-white px-6 py-3.5 text-[0.9375rem] font-medium text-o-700">
                  Read the case study
                  <ArrowRight />
                </span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ================================================================ */}
      {/* Close                                                            */}
      {/* ================================================================ */}
      <Band tone="peach" block="close">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-lift)] ring-1 ring-o-100">
                <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:p-16">
                  <div>
                    <Eyebrow>Next step</Eyebrow>
                    <h2 className="mt-6 text-d2 max-w-[22ch]">
                      Start from the estate you already run.
                    </h2>
                    <Lead className="mt-6">
                      Almost every conversation begins with a Microsoft estate
                      somebody inherited and nobody is entirely happy with. Show
                      us that, and we will tell you what is worth fixing, what is
                      worth replacing, and what is already fine.
                    </Lead>
                  </div>

                  <div className="flex flex-col items-start gap-4">
                    <Action href={href("contact")} className="w-full sm:w-auto">
                      Talk to us about a project
                    </Action>
                    <Action
                      href={href("staffAug")}
                      variant="ghost"
                      className="w-full sm:w-auto"
                    >
                      Or start with one person
                      <ArrowRight />
                    </Action>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                      {site.name} publishes{" "}
                      <Link
                        href={href("resources") as Route}
                        className="font-medium text-o-700 underline underline-offset-4"
                      >
                        six white papers
                      </Link>{" "}
                      with no form in front of them, if you would rather read
                      first.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>
    </>
  );
}
