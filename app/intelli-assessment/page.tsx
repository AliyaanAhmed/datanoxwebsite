import type { Metadata } from "next";

import { MarkIntelliAssessment } from "@/components/figures/product-marks";
import { FigScoringChain } from "@/components/figures/scoring-chain";
import { Reveal } from "@/components/ui/reveal";
import {
  Band,
  Card,
  Container,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { IconChip } from "@/components/ui/icons";
import {
  ClosingCta,
  FaqSection,
  PageHero,
  ProductInsightPanel,
  ProofStrip,
  RelatedPages,
  UseCases,
  type Faq,
} from "@/components/page/blocks";
import { Capabilities } from "@/components/page/capabilities";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, softwareApplication } from "@/lib/schema";

const PATH = "/intelli-assessment/";

export const metadata: Metadata = pageMetadata({
  title: "Rule Based Assessment and Eligibility Scoring",
  description:
    "Turn policy into weighted scoring rules with automated eligibility outcomes. Built for admissions, certification and eligibility decisions on Dynamics 365.",
  path: PATH,
});

/**
 * Intelli Assessment.
 *
 * Rewritten August 2026. The previous page opened on evaluator agreement,
 * which is a real benefit but a narrow one, and closed with a FAQ whose only
 * job was to explain the product bundle.
 *
 * The product's actual reason to exist is stated plainly in the company's own
 * white paper and appeared nowhere on this site: Dynamics 365 has no native
 * support for complex rule based assessment. That is now the second thing a
 * visitor reads.
 */

const capabilities = [
  {
    name: "Structured scoring framework",
    body: "A policy becomes a hierarchy of categories, criteria, questions and rules, which is how something written in prose becomes something measurable. Complex eligibility policy stops being a document people interpret differently.",
    detail: "Policy made measurable",
    icon: "rules" as const,
  },
  {
    name: "Weighted scoring",
    body: "Every question carries a defined weight, and results roll up from question to criterion to category to an overall score. Evaluation reflects policy priorities rather than treating every section as equal.",
    detail: "Priorities, not flat marks",
    icon: "rubric" as const,
  },
  {
    name: "Automated outcomes",
    body: "Thresholds resolve a score into a decision without anyone recalculating anything: eligible, conditional approval, manual review, not eligible, an offer, or a certification issued.",
    detail: "Rules, not recollection",
    icon: "check" as const,
  },
  {
    name: "Full transparency",
    body: "Every decision is traceable back to the scoring rules and the evidence behind it. If somebody asks why an applicant was approved, the answer is in the record rather than in a reconstruction.",
    detail: "Audit and appeal ready",
    icon: "record" as const,
  },
  {
    name: "Evaluator dashboard",
    body: "Each evaluator sees what is assigned, what is outstanding and where their scoring sits relative to the cohort. Chasing happens in the system rather than by email, and drift between assessors is visible.",
    detail: "Assigned and outstanding",
    icon: "dashboard" as const,
  },
  {
    name: "Secure, role based delivery",
    body: "Assessments are delivered with the same identity and permission model as the rest of your Microsoft environment, with role based access and validation protecting candidate and institutional data.",
    detail: "Same identity model",
    icon: "shield" as const,
  },
  {
    name: "Rules updated, not rebuilt",
    body: "Regulations change and criteria evolve. When they do you update rules rather than rebuild the system or add manual review capacity, which is what lets volume grow without accuracy falling.",
    detail: "Change without a project",
    icon: "variety" as const,
  },
  {
    name: "Analytics across cohorts",
    body: "Compare total scores, pass rates and section level performance to find where candidates struggle, then refine weighting and question design for the next cycle on evidence rather than instinct.",
    detail: "Improve the next round",
    icon: "chart" as const,
  },
];

const useCases = [
  {
    who: "University admissions",
    problem:
      "Applications are scored across several criteria by several people, then combined by hand into a ranking that nobody can reproduce a month later.",
    outcome:
      "Scores combine automatically by their weights, and the ranking is a report rather than a rebuild.",
    icon: "book" as const,
  },
  {
    who: "Professional certification",
    problem:
      "Member certification is assessed by a volunteer panel working from a shared document, and consistency between assessors cannot be evidenced.",
    outcome:
      "A weighted rubric with defined levels, and a record of who scored what against which criterion.",
    icon: "people" as const,
  },
  {
    who: "Eligibility and licensing",
    problem:
      "Eligibility rules live in a policy document, and officers apply them from memory under time pressure, so similar cases get different answers.",
    outcome:
      "The policy is the rule set. Similar cases get the same answer, and the difference between two cases is visible.",
    icon: "rules" as const,
  },
];

const faqs: Faq[] = [
  {
    question: "We already run Dynamics 365. Why do we need this?",
    answer:
      "Dynamics 365 is a powerful platform for managing data and workflow, but it has no native support for complex rule based assessment or automated evaluation. Organisations trying to run policy driven assessment inside it end up with heavy customisation or with the real decision making happening in spreadsheets beside it. This adds the missing layer: automated rule execution, document based policy interpretation, and consistent assessment logic across enterprise workflows.",
  },
  {
    question: "How does the scoring actually work?",
    answer:
      "Each assessment follows a hierarchy of category, criteria, questions and rules, which breaks a complex policy into measurable components. Every question has a defined weight, and scores roll up from question to criterion to category to an overall score. Thresholds then resolve that score into an outcome automatically.",
  },
  {
    question: "Can it read our policy documents?",
    answer:
      "Yes, as a starting point rather than as a substitute for review. It reads a policy document and extracts the conditions, eligibility rules and requirements it finds, turning them into draft digital assessment rules. A person confirms and adjusts them before anything goes live. It saves the weeks usually spent transcribing policy into a system by hand.",
  },
  {
    question: "If an applicant appeals, what can we show them?",
    answer:
      "The rule that applied, the weight it carried, the score it produced, the evidence attached to that score, and the threshold that resolved the outcome. That chain is the record, so an appeal is answered from the system rather than from somebody's memory of the panel.",
  },
  {
    question: "What kinds of organisations use it?",
    answer:
      "Governments, universities and professional bodies making decisions that carry risk and reputation: visa eligibility, university admissions and offers, professional certification, membership, and workforce or skills assessment. Melbourne University uses it for structured academic evaluation and admissions, and the Australian Community Workers Association for workforce evaluation and certification.",
  },
  {
    question: "Will it handle a full accreditation self study cycle?",
    answer:
      "It handles the scoring and evidence side well. It is not a purpose built accreditation suite with a standards library and a multi year self study workflow, so if that is your requirement, walk us through the specific process before assuming a fit. We would rather say no early than sell you a partial answer.",
  },
];

export default function IntelliAssessmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            softwareApplication({
              name: "Intelli Assessment",
              path: PATH,
              description:
                "A rule based eligibility and scoring platform on Microsoft Power Platform. Policy becomes a weighted hierarchy of categories, criteria, questions and rules, producing automated outcomes traceable to the rule and the evidence behind them.",
              features: [
                "Structured category, criteria, question and rule framework",
                "Weighted scoring with roll up to an overall score",
                "Automated eligibility outcomes",
                "Business rule extraction from policy documents",
                "Evaluator dashboard and cohort analytics",
                "Traceable decisions for audit and appeal",
              ],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Intelli Assessment", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Intelli Assessment"
        trail={[
          { name: "Home", path: "/" },
          { name: "Intelli Assessment", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Turn policy into</span>
            </span>
            <span>
              <span>decisions you</span>
            </span>
            <span>
              <span>can defend.</span>
            </span>
          </>
        }
        lead="Every visa approval, university offer, certification and membership decision carries risk, responsibility and reputation. Most are still made through manual review, disconnected systems and inconsistent scoring. This converts the policy itself into weighted scoring logic, automates the outcome, and keeps every decision traceable."
        primaryCta={{ label: "See it on your own criteria", key: "contact" }}
        secondaryCta={{ label: "Read the assessment guide", key: "resources" }}
        meta={{
          label: "Deciding on",
          items: ["Admissions", "Eligibility", "Certification", "Membership"],
        }}
        figure={
          <div
            data-fig=""
            data-reveal=""
            suppressHydrationWarning
            className="overflow-hidden rounded-xl shadow-[var(--shadow-lift)] ring-1 ring-o-100"
          >
            <MarkIntelliAssessment />
          </div>
        }
      />

      {/* ---------------------------------------------------------------
          Why it exists. The clearest sentence in the whole product line,
          and it appeared nowhere on this site before now.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="why">
        <Container>
          <div className="py-band">
            <Reveal from="scale">
              <ProductInsightPanel
                eyebrow="Why it exists"
                title={
                  <>
                    Dynamics 365 cannot do rule based assessment. This is the
                    layer that adds it.
                  </>
                }
                icon="rules"
                side={
                  <div className="rounded-lg border border-o-100 bg-gradient-to-br from-white to-o-50 p-5 shadow-[var(--shadow-soft)]">
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-10 w-10 rounded-md bg-o-100 ring-1 ring-o-200"
                      />
                      <span
                        aria-hidden="true"
                        className="h-2 flex-1 rounded-pill bg-o-200/80"
                      />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "Automated rule execution",
                        "Policy document interpretation",
                        "Consistent logic across workflows",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-pill bg-surface px-4 py-2 text-[0.875rem] font-medium text-ink-2 shadow-[0_10px_24px_rgba(122,62,12,0.08)] ring-1 ring-o-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                }
              >
                <p>
                  Dynamics 365 manages data and workflow extremely well and has
                  no native support for policy driven evaluation. Organisations
                  that need it either commission heavy customisation, or accept
                  that the real decision making happens in a spreadsheet sitting
                  beside the system of record. We built this after watching that
                  same gap appear across government, education and enterprise
                  clients, and it extends the platform rather than competing
                  with it.
                </p>
              </ProductInsightPanel>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The mechanism, drawn.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="mechanism">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="How scoring works"
                title="Policy goes down. Score comes back up."
                lead="Reading left to right is decomposition, which is how something written in prose becomes something measurable. Reading right to left is scoring, which is how a weighted result becomes a decision somebody can defend."
              />
            </Reveal>
            <Reveal delay={140} className="mt-12">
              <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-10">
                <FigScoringChain />
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      <Capabilities
        eyebrow="Capabilities"
        title="What the platform runs"
        items={capabilities}
        variant="ledger"
        tone="warm"
      />

      <ProofStrip
        tone="peach"
        eyebrow="Measured"
        title="What changes when the policy becomes the rule set"
        stats={[
          {
            figure: "84%",
            label: "faster decision making",
            detail: "with automated scoring and machine assisted evaluation",
          },
          {
            figure: "38%",
            label: "less manual work",
            detail: "through structured digital workflows replacing review by hand",
          },
          {
            figure: "Two",
            label: "named institutions in production",
            detail:
              "Melbourne University for admissions, and the Australian Community Workers Association for certification",
          },
        ]}
      />

      {/* ---------------------------------------------------------------
          AI, and specifically the one thing that saves weeks.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="ai">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Machine assistance"
                title="The weeks usually spent transcribing policy into a system"
                lead="Two narrow jobs, both of which a person confirms before anything takes effect."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {[
                {
                  t: "Rules extracted from policy documents",
                  b: "It reads the policy you already have, identifies the conditions, eligibility rules and requirements inside it, and turns them into draft digital assessment rules. Somebody reviews and adjusts them before they go live. What normally takes weeks of transcription takes an afternoon of checking.",
                  icon: "rules" as const,
                },
                {
                  t: "Submitted documents summarised and matched",
                  b: "It reviews the documents an applicant submits, matches their content against the assessment criteria, and produces a first pass result. Large volumes become manageable without adding reviewers, and the reviewer sees the document, the extraction and a confidence level together.",
                  icon: "preview" as const,
                },
              ].map((item, index) => (
                <Reveal key={item.t} delay={index * 100}>
                  <Card className="h-full">
                    <IconChip name={item.icon} />
                    <h3 className="mt-5 font-display text-[1.25rem] font-semibold leading-snug text-ink">
                      {item.t}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                      {item.b}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>

            <Reveal delay={260} className="mt-8">
              <p className="measure text-[0.9375rem] leading-relaxed text-muted">
                Neither of these approves or rejects anybody. The scoring rules
                decide the outcome, a person owns the rules, and the trail shows
                which was which.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* Honest scope */}
      <Band tone="warm" block="scope">
        <Container>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Scope"
                title="What it does well, and what it does not"
                lead="Assessment software is a crowded category, and most of it is sold as though it fits everything. It is more useful to be plain about the line."
              />
            </Reveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <Reveal>
                <Card className="h-full">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-o-700">
                    Strong fit
                  </p>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {[
                      "Policy driven eligibility where the rule has to be defensible later",
                      "Several people scoring the same submission against defined criteria",
                      "Weighted criteria where consistency has to be evidenced",
                      "Organisations already running Dynamics 365 or Power Platform",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-o-600"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
              <Reveal delay={90}>
                <Card className="h-full">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                    Ask us first
                  </p>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {[
                      "Full multi year accreditation self study cycles with standards libraries",
                      "High stakes proctored examinations with identity verification",
                      "Adaptive testing that changes questions based on live performance",
                      "Organisations with no Microsoft footprint at all",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rule-strong"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Band>

      <UseCases
        eyebrow="Use cases"
        title="Decisions that have to survive being questioned"
        items={useCases}
        tone="canvas"
      />

      <FaqSection
        eyebrow="Answers"
        title="What admissions and eligibility teams ask first"
        items={faqs}
        tone="warmer"
      />

      <RelatedPages
        title="Related to this"
        items={[
          {
            key: "education",
            blurb:
              "Admissions scoring and student assessment for institutions already on Microsoft.",
          },
          {
            key: "government",
            blurb:
              "Grant, tender and eligibility decisions that have to survive an appeal.",
          },
          {
            key: "services",
            blurb:
              "The practice that configures the rules and integrates the result into your workflow.",
          },
        ]}
      />

      <ClosingCta
        title="Send us the policy, not the requirements document."
        lead="Give us the eligibility policy you actually apply, however long and however written. We will come back with it decomposed into scoring rules, and you can tell us where we read it wrong."
        primary={{ label: "See it on your own criteria", key: "contact" }}
        secondary={{ label: "Read the assessment guide", key: "resources" }}
      />
    </>
  );
}
