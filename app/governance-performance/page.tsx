import type { Metadata } from "next";

import { FigBudgetCycle } from "@/components/figures/budget-cycle";
import { FigMaturityIndex } from "@/components/figures/maturity-index";
import { MarkGovernance } from "@/components/figures/product-marks";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Band,
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
  ProofStrip,
  RelatedPages,
  UseCases,
  type Faq,
} from "@/components/page/blocks";
import { Capabilities } from "@/components/page/capabilities";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import {
  breadcrumbs,
  faqPage,
  graph,
  softwareApplication,
} from "@/lib/schema";

const PATH = "/governance-performance/";

export const metadata: Metadata = pageMetadata({
  title: "Budgeting and Governance Software on Power BI",
  description:
    "Budgeting, project execution and KPI management in one governed system. It sits above your ERP and answers whether a given spend achieved anything.",
  path: PATH,
});

/**
 * Governance and Performance.
 *
 * Rewritten August 2026 to stand entirely on its own. The previous version
 * pointed at Intelli Form from the hero and closed by linking to both other
 * products, which made it read as one third of a suite rather than as a
 * platform a finance lead would buy.
 *
 * The argument now runs the way the company's own white paper runs it: the
 * gap is between the approved decision and the measured result, an ERP does
 * not cover that gap, and this is the layer that does.
 */

/** The chain. Any link can be bought alone. The line through them cannot. */
const CHAIN = [
  {
    stage: "01",
    name: "Budgeting",
    body: "Turns requests into approved allocations against strategic priorities.",
    delivers: [
      "Allocated budgets",
      "General ledger coded lines",
      "Capital and operational split",
      "Complete approval history",
    ],
    icon: "budget" as const,
  },
  {
    stage: "02",
    name: "Project planning and execution",
    body: "Turns approved budgets into scheduled, resourced, tracked work.",
    delivers: [
      "Project plans",
      "Milestones and schedules",
      "Phased cashflow",
      "Procurement plans",
      "Actuals against plan",
    ],
    icon: "plan" as const,
  },
  {
    stage: "03",
    name: "KPI and performance management",
    body: "Links delivered work to the indicators it was meant to move.",
    delivers: [
      "KPI results with evidence",
      "Targets against actuals",
      "Status rating",
      "Live dashboards and reports",
    ],
    icon: "gauge" as const,
  },
];

const capabilities = [
  {
    name: "Multi entity governance",
    body: "Report a group and each entity inside it from the same model, with permissions deciding who sees which entity rather than which file they were emailed. Built for organisations coordinating dozens of bodies rather than one.",
    detail: "Group and entity",
    icon: "layers" as const,
  },
  {
    name: "Routed, digitised approval",
    body: "Submission, review and approval run inside the system with role based workflows spanning entities, reviewers and regulators. Nobody chases a signature by email, and every decision is timestamped where it happened.",
    detail: "Controls without delay",
    icon: "check" as const,
  },
  {
    name: "Maturity assessment",
    body: "Score the organisation against a defined scale on each dimension that matters, keep the evidence attached to the score, and show movement between cycles rather than a single snapshot.",
    detail: "Scored, evidenced, tracked",
    icon: "target" as const,
  },
  {
    name: "Annual operating plans",
    body: "Hold the plan, the budget behind it and the measures that prove it in one place, so the operating plan stops being a document that goes stale the week after it is signed.",
    detail: "Plan and proof together",
    icon: "plan" as const,
  },
  {
    name: "Live executive reporting",
    body: "Power BI reports read directly from the tables the budget is entered into. There is no export, no scheduled copy and no separate reporting database, so a figure changed at source is the figure leadership sees.",
    detail: "No export step",
    icon: "chart" as const,
  },
  {
    name: "Tamper resistant audit trail",
    body: "Every dollar, task and result carries a visible line back to the decision that started it. Internal controls and external regulatory review read the same record, and an audit that took weeks takes hours.",
    detail: "Weeks to hours",
    icon: "record" as const,
  },
];

/** Straight from the white paper, and the sharpest qualifying tool there is. */
const QUESTIONS = [
  {
    q: "Does it connect everything?",
    a: "Can budgets, plans, execution and KPIs be seen together, with a traceable line between them?",
  },
  {
    q: "Does it make approvals easier?",
    a: "Can it enforce controls without adding delay? Governance that slows an organisation down gets routed around.",
  },
  {
    q: "Does it improve performance over time?",
    a: "Does it support continuous, measurable improvement, or only produce an annual report?",
  },
  {
    q: "Does it help leaders decide faster?",
    a: "Does it deliver insight that changes a decision, or a dashboard that only confirms what already happened?",
  },
];

const useCases = [
  {
    who: "Government portals",
    problem:
      "Budget submissions arrive from every department in a different spreadsheet layout, and consolidation is a manual rebuild every cycle.",
    outcome:
      "Departments submit into one structured model. Consolidation happens as they submit, not after.",
    icon: "portal" as const,
  },
  {
    who: "Not for profit",
    problem:
      "Restricted funds, grant reporting and the operating budget live in separate places, so acquitting a grant means rebuilding the numbers by hand.",
    outcome:
      "Fund, grant and operating budget sit in one model, and the acquittal report reads from it directly.",
    icon: "handshake" as const,
  },
  {
    who: "Capital programmes",
    problem:
      "Infrastructure programmes run for years and outlast the leadership that approved them, so the original rationale is lost by the time results arrive.",
    outcome:
      "The approval, the plan and the measures stay attached to the programme, and survive a change of sponsor intact.",
    icon: "clock" as const,
  },
];

const faqs: Faq[] = [
  {
    question: "We already have an ERP. Why would we need this as well?",
    answer:
      "An ERP is very good at recording transactions: invoices, ledgers, payments, records. It is poor at linking those transactions to the decisions and outcomes behind them. This platform sits on top of the ERP rather than beside it, and governs the decision while the ERP governs the transaction. Nothing in your core finance system is replaced.",
  },
  {
    question: "What does it actually connect?",
    answer:
      "Budgeting, project planning and execution, and KPI management. Any one of the three can be bought separately from any number of vendors. What cannot be bought separately is the line running through them, which is what makes the question of whether a given spend achieved anything answerable in seconds rather than weeks.",
  },
  {
    question: "How does the AI work, and who approves what?",
    answer:
      "It advises and it never decides. It drafts budget ranges and targets from history, cross checks entries against source data and reconciles figures, flags anomalies and spend drifting from its stated objective, and answers plain language questions from live governed data. It does not approve, reject or publish anything on its own. Every output is labelled as machine generated, approved by a person before it takes effect, and preserved in the audit trail.",
  },
  {
    question: "What does the maturity index measure?",
    answer:
      "You define the dimensions and the level descriptions that matter to your organisation. Each dimension is scored against that scale, the evidence for the score is attached to it, and the target level is recorded on the same axis. The output is a scored position with a documented gap rather than an opinion in a slide.",
  },
  {
    question: "Can it replace spreadsheet based budgeting?",
    answer:
      "That is the usual reason organisations adopt it. The parts a spreadsheet cannot do are the parts that hurt: routed approval, version history, permissions per entity, and reporting that cannot drift from its source. Familiar grid entry stays, so the change is in the plumbing rather than in the daily habit.",
  },
  {
    question: "Which industries is it built for?",
    answer:
      "Public administration was the proving ground, and the same gap appears anywhere spending, delivery and performance face close scrutiny. Banking and financial services, healthcare systems, insurance, energy and utilities, and higher education all run the pattern of a documented line from budget to outcome.",
  },
];

export default function GovernancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            softwareApplication({
              name: "Governance and Performance",
              path: PATH,
              description:
                "Budgeting, project planning and execution, and KPI management in one governed system built on Microsoft Power Platform and Power BI. It sits above an ERP and governs the decision rather than the transaction.",
              features: [
                "Enterprise budgeting with routed approval",
                "Project planning and execution",
                "KPI and performance management",
                "Multi entity governance",
                "Maturity assessment",
                "Tamper resistant audit trail",
              ],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Governance and Performance", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Governance and Performance"
        trail={[
          { name: "Home", path: "/" },
          { name: "Governance and Performance", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Close the gap between</span>
            </span>
            <span>
              <span>the budget and</span>
            </span>
            <span>
              <span>the result.</span>
            </span>
          </>
        }
        lead="You approved the strategy and signed the budget. Somewhere after that, where money turns into work and work is supposed to turn into results, the trail goes cold. This platform holds budgeting, delivery and KPI management in one governed system, so the question a leader most wants answered is answerable from live data."
        primaryCta={{ label: "See it on your own budget cycle", key: "contact" }}
        secondaryCta={{ label: "Read the white paper", key: "resources" }}
        meta={{
          label: "Built on",
          items: ["Power BI", "Power Apps", "Dataverse", "Power Automate"],
        }}
        figure={
          <div
            data-fig=""
            data-reveal=""
            suppressHydrationWarning
            className="overflow-hidden rounded-xl shadow-[var(--shadow-lift)] ring-1 ring-o-100"
          >
            <MarkGovernance />
          </div>
        }
      />

      {/* ---------------------------------------------------------------
          The cost of the gap. Cited, because a number without a source is
          worth less than no number at all.
          --------------------------------------------------------------- */}
      <ProofStrip
        tone="peach"
        eyebrow="What the gap costs"
        title="Every one of these is the same failure showing up on the profit and loss"
        stats={[
          {
            figure: "67 to 90%",
            label: "of well formulated strategies fail",
            detail: "from poor execution, per Harvard Business Review and Robert Kaplan",
          },
          {
            figure: "12.9m",
            label: "US dollars a year",
            detail: "the average annual cost of poor data quality, per Gartner",
          },
          {
            figure: "80%+",
            label: "of large technology programmes run late",
            detail: "an industry benchmark that has not moved in a decade",
          },
        ]}
      />

      {/* ---------------------------------------------------------------
          The chain. This is the product's actual structure.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="chain">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="What it holds"
                title="Money, work and results finally share one record"
                lead="Three stages, each a complete capability. Any one of them can be bought separately from any number of vendors. The line running through them cannot."
              />
            </Reveal>

            <ol className="mt-14 grid gap-6 lg:grid-cols-3">
              {CHAIN.map((link, index) => (
                <Reveal as="li" key={link.stage} delay={index * 100}>
                  <div className="flex h-full flex-col rounded-xl bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-8">
                    <div className="flex items-center justify-between">
                      <IconChip name={link.icon} />
                      <span className="font-mono text-[1.75rem] font-medium leading-none text-o-200">
                        {link.stage}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[1.3125rem] font-semibold leading-snug text-ink">
                      {link.name}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {link.body}
                    </p>
                    <ul className="mt-6 flex flex-col gap-2 border-t border-rule pt-5">
                      {link.delivers.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.875rem] text-ink-2"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-o-500"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The ERP argument. The single most important thing this page says.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="layer">
        <Container>
          <div className="py-band">
            <Reveal>
              <Eyebrow>Where it sits</Eyebrow>
            </Reveal>
            <Reveal delay={90} className="mt-6">
              <h2 className="measure-tight text-d2">
                It sits on top of your ERP, not beside it.
              </h2>
            </Reveal>
            <Reveal delay={180} className="mt-8 grid gap-x-14 gap-y-8 sm:grid-cols-2">
              <div className="rounded-xl bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-o-200">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-o-700">
                  This platform
                </p>
                <p className="mt-3 font-display text-[1.25rem] font-semibold text-ink">
                  Governs the decision
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                  Budget, plan, delivery, KPI. The layer most organisations have
                  nothing at all in.
                </p>
              </div>
              <div className="rounded-xl border border-dashed border-rule-strong p-7">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                  Your ERP
                </p>
                <p className="mt-3 font-display text-[1.25rem] font-semibold text-ink-2">
                  Governs the transaction
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                  Invoices, ledgers, payments, records. Untouched, and still the
                  system of record for all of it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={280} className="mt-8">
              <p className="measure text-[1.0625rem] leading-relaxed text-body">
                Enterprise resource planning systems excel at recording
                transactions and struggle to link those transactions to
                strategic outcomes. That missing layer is where accountability
                disappears, and it is the only place this platform operates.
                There is no need to replace a core system to install it.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The cycle, including the revision loop.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="cycle">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="How a budget moves"
                title="The cycle, including the part everyone forgets"
                lead="Most budgeting tools draw a straight line from plan to report. The time is actually lost in the loop back, when something is sent for revision and the trail of who changed what goes missing."
              />
            </Reveal>
            <Reveal delay={140} className="mt-12">
              <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-10">
                <FigBudgetCycle />
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      <Capabilities
        eyebrow="Capabilities"
        title="Six things that normally live in six places"
        items={capabilities}
        variant="list"
        tone="warm"
      />

      {/* ---------------------------------------------------------------
          AI position. Procurement relevant, and absent from the old page.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="ai">
        <Container wide>
          <div className="py-band">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
              <Reveal>
                <SectionHead
                  eyebrow="Artificial intelligence"
                  title="It advises. It never decides."
                  lead="AI runs across the platform under one absolute rule. It drafts, checks, flags and explains. It does not approve, reject or publish anything on its own."
                />
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {["AI drafts and flags", "A person approves", "Logged in the audit trail"].map(
                    (step, index) => (
                      <span key={step} className="flex items-center gap-3">
                        <span className="rounded-pill bg-o-50 px-4 py-2 text-[0.8125rem] font-medium text-o-800">
                          {step}
                        </span>
                        {index < 2 ? <ArrowRight className="text-o-400" /> : null}
                      </span>
                    ),
                  )}
                </div>
              </Reveal>

              <Reveal delay={140}>
                <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {[
                    {
                      t: "Draft and assist",
                      b: "Suggesting budget ranges and targets from history, and preparing first pass analysis.",
                    },
                    {
                      t: "Check and validate",
                      b: "Cross checking entries against source data, reconciling figures and catching mismatches before approval.",
                    },
                    {
                      t: "Flag risk",
                      b: "Watching for anomalies, duplicate entries and spend drifting off its stated objective.",
                    },
                    {
                      t: "Ask in plain language",
                      b: "Letting executives query the platform and get answers from live, governed data.",
                    },
                  ].map((item) => (
                    <div key={item.t}>
                      <dt className="font-display text-[1.0625rem] font-semibold text-ink">
                        {item.t}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-body">
                        {item.b}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-7 border-t border-rule pt-6 text-[0.875rem] leading-relaxed text-muted">
                  Human oversight sits at the centre of the European Union AI
                  Act, the principles published by the Organisation for Economic
                  Cooperation and Development, and the UNESCO recommendation on
                  AI ethics. Every output here is built to satisfy all three.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Band>

      {/* Maturity index */}
      <Band tone="warmer" block="maturity">
        <Container wide>
          <div className="py-band">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
              <Reveal>
                <SectionHead
                  eyebrow="Maturity index"
                  title="A score with the evidence still attached"
                  lead="Most maturity assessments end as a slide. This one is a record: each dimension scored against a defined level, the evidence stored with the score, and the target the board agreed sitting on the same axis so the gap is visible rather than described."
                />
              </Reveal>
              <Reveal delay={140}>
                <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-8">
                  <FigMaturityIndex />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Band>

      <UseCases
        eyebrow="Use cases"
        title="Where the line from budget to result matters most"
        items={useCases}
        tone="canvas"
      />

      {/* ---------------------------------------------------------------
          Four questions. A qualifying tool, which is more useful to a
          buyer than another list of features.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="questions">
        <Container>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Before you buy anything"
                title="Four questions to ask any vendor, including us"
                lead="If a platform cannot answer all four, it is a reporting tool with a governance label on it."
              />
            </Reveal>
            <ol className="mt-12 flex flex-col gap-4">
              {QUESTIONS.map((item, index) => (
                <Reveal as="li" key={item.q} delay={index * 70}>
                  <div className="flex gap-5 rounded-lg bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-7">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-o-50 font-mono text-[0.75rem] font-medium text-o-700">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.125rem] font-semibold text-ink">
                        {item.q}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-body">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={340} className="mt-8">
              <p className="text-[0.9375rem] text-muted">
                The same four questions are worked through in full in the{" "}
                <TextLink href={href("resources")}>
                  governance white paper
                </TextLink>
                , which is open and needs no form.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What finance and strategy leads ask first"
        items={faqs}
        tone="canvas"
      />

      <RelatedPages
        title="Adjacent to this"
        items={[
          {
            key: "government",
            blurb:
              "The sector this product was designed against, and where the audit argument lands hardest.",
          },
          {
            key: "services",
            blurb:
              "The delivery practice that implements this and the rest of your Microsoft estate.",
          },
          {
            key: "caseStudies",
            blurb:
              "What the governance work produced in practice, named and dated.",
          },
        ]}
      />

      <ClosingCta
        title="Ask us the question your current reporting cannot answer."
        lead="Pick one programme, one budget line, one decision from last year. If we cannot show you how the line from that decision to its result would be visible in seconds, the platform is not for you and we will say so."
        primary={{ label: "See it on your own budget cycle", key: "contact" }}
        secondary={{ label: "Read the white paper", key: "resources" }}
      />
    </>
  );
}
