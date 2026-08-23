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
import {
  ClosingCta,
  FaqSection,
  PageHero,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { Capabilities } from "@/components/page/capabilities";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";
import { site } from "@/content/site";

const PATH = "/services/ai-and-copilot/";

export const metadata: Metadata = pageMetadata({
  title: "Copilot Studio and Azure AI Foundry Development",
  description:
    "Copilot Studio agents, Azure AI Foundry workloads and document understanding, built into Dynamics 365 and Power Platform rather than bolted beside them.",
  path: PATH,
});

/**
 * AI and Copilot.
 *
 * The word Copilot appeared zero times on this website before August 2026,
 * and the only mention of artificial intelligence as a deliverable attributed
 * it to a partner in the United States rather than to Datanox.
 *
 * The position taken here is the company's own, from the governance white
 * paper, and it is a commercially useful one in regulated sectors: the
 * assistant advises and never decides.
 */

const CAPABILITIES: {
  name: string;
  body: string;
  detail: string;
  icon: IconName;
}[] = [
  {
    name: "Copilot Studio",
    body: "Custom copilots and conversational agents grounded in Dataverse and your own knowledge sources, so an answer comes from your records under your permissions rather than from a general model guessing.",
    detail: "Grounded in your data",
    icon: "remote",
  },
  {
    name: "Azure AI Foundry",
    body: "Model selection, prompt orchestration and evaluation for production workloads. Evaluation is the part most projects skip and the part that decides whether the thing is safe to leave running.",
    detail: "Evaluated, not assumed",
    icon: "target",
  },
  {
    name: "Agents inside business process",
    body: "Triage, summarisation, classification and drafting placed at the specific step where a person is currently doing work a machine does adequately, inside Dynamics 365 and Power Platform.",
    detail: "At the step, not around it",
    icon: "rules",
  },
  {
    name: "Document understanding",
    body: "Custom models trained on your own documents, reading and extracting the fields an application needs. The reviewer sees the document, the extracted values and a confidence level together rather than a black box result.",
    detail: "Extraction with confidence",
    icon: "preview",
  },
  {
    name: "Governance and audit",
    body: "Every output labelled as machine generated, approved by a person before it takes effect, and preserved in the audit trail. This is what makes an AI feature survive a procurement review rather than stall in one.",
    detail: "Labelled, approved, logged",
    icon: "shield",
  },
  {
    name: "Rules from policy documents",
    body: "Reading a written policy and extracting the conditions, eligibility rules and requirements it contains as draft digital rules, which a person then confirms. Weeks of transcription become an afternoon of checking.",
    detail: "Policy to rule set",
    icon: "record",
  },
];

const POSITION = [
  {
    t: "Draft and assist",
    b: "Suggesting values from history and preparing a first pass, so the person starts from something rather than from an empty field.",
  },
  {
    t: "Check and validate",
    b: "Cross checking entries against source data and catching mismatches before they reach an approver.",
  },
  {
    t: "Flag risk",
    b: "Watching continuously for anomalies, duplicates and work drifting away from its stated objective.",
  },
  {
    t: "Answer in plain language",
    b: "Letting somebody ask a question and get an answer from live, governed data instead of requesting a report.",
  },
];

const faqs: Faq[] = [
  {
    question: "What is your position on AI making decisions?",
    answer:
      "It advises and it never decides. It drafts, checks, flags and explains. It does not approve, reject or publish anything on its own. Every output is labelled as machine generated, approved by a person before it takes effect, and preserved in the audit trail. That rule is absolute across everything we build, including our own products.",
  },
  {
    question: "Why build AI into the system of record rather than beside it?",
    answer:
      "Because a copilot that can read your security model, respect your approval workflow and write back to your case records is worth considerably more than a chatbot bolted onto a portal. The value is not the language model, it is the access to governed data and the ability to act inside a process that already has controls around it.",
  },
  {
    question: "Will this satisfy our compliance and procurement review?",
    answer:
      "Human oversight is now central to the European Union AI Act, the artificial intelligence principles published by the Organisation for Economic Cooperation and Development, and the UNESCO recommendation on AI ethics. Building to a person approves, always leaves you aligned with all three by design rather than by exception, which is usually the difference between a feature that ships and one that stalls in review.",
  },
  {
    question: "Where does the data go?",
    answer:
      "Into your own Microsoft tenant and the Azure services you have chosen, under your access controls and your logging. We work inside your environment rather than moving your data into ours, which is the same arrangement that applies to every other kind of engagement here.",
  },
  {
    question: "Is this worth doing yet, or should we wait?",
    answer:
      "Narrow tasks are worth doing now: extraction, summarisation, validation, triage and drafting are all reliable enough for production when a person confirms the result. Anything where the model makes the call unsupervised is not, in a regulated process, and we will say so rather than sell it.",
  },
];

export default function AiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            service({
              name: "AI and Copilot development for business applications",
              path: PATH,
              description:
                "Copilot Studio agents, Azure AI Foundry workloads, document understanding and governed automation built inside Dynamics 365 and Power Platform.",
              serviceType: "Artificial intelligence consulting",
              areaServed: [...site.regions],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Services", path: href("services") },
              { name: "AI and Copilot", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Services, AI and Copilot"
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: href("services") },
          { name: "AI and Copilot", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Built into the system</span>
            </span>
            <span>
              <span>of record, not</span>
            </span>
            <span>
              <span>bolted beside it.</span>
            </span>
          </>
        }
        lead="A copilot that can read your Dataverse security model, respect your approval workflow and write back to your case records is worth more than a chatbot on a portal. We put the intelligence at the step where somebody is currently doing work a machine does adequately, and nowhere else."
        primaryCta={{ label: "Find the step worth automating", key: "contact" }}
        secondaryCta={{ label: "The whole practice", key: "services" }}
        meta={{
          label: "Building with",
          items: ["Copilot Studio", "Azure AI Foundry", "Dataverse", "Power Automate"],
        }}
      />

      {/* ---------------------------------------------------------------
          The rule, first, because in regulated sectors it is the thing
          that decides whether anything else gets bought.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="rule">
        <Container wide>
          <div className="py-band">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
              <Reveal>
                <Eyebrow>The rule</Eyebrow>
                <h2 className="mt-6 measure-tight text-d2">
                  It advises. A person decides.
                </h2>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-body">
                  Simple, absolute, and applied to our own products as well as
                  to client work. Nothing is approved, rejected or published by a
                  model on its own. In government, banking, insurance and higher
                  education this is not a limitation, it is the reason a project
                  clears review.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {[
                    "AI drafts and flags",
                    "A person approves",
                    "Logged in the audit trail",
                  ].map((step, index) => (
                    <span key={step} className="flex items-center gap-3">
                      <span className="rounded-pill bg-surface px-4 py-2 text-[0.8125rem] font-medium text-ink-2 ring-1 ring-o-200">
                        {step}
                      </span>
                      {index < 2 ? <ArrowRight className="text-o-400" /> : null}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={140}>
                <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {POSITION.map((item) => (
                    <div
                      key={item.t}
                      data-interactive-card=""
                      data-rich-card=""
                      className="rounded-lg bg-surface p-5 shadow-[var(--shadow-soft)] ring-1 ring-rule"
                    >
                      <dt data-card-float="" className="font-display text-[1.0625rem] font-semibold text-ink">
                        {item.t}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-body">
                        {item.b}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </Band>

      <Capabilities
        eyebrow="What we build"
        title="Six things, all of them narrow on purpose"
        lead="Every item here replaces a specific piece of manual work rather than promising a general improvement. The narrowness is what makes them reliable enough to leave running."
        items={CAPABILITIES}
        variant="feature"
        tone="canvas"
      />

      {/* ---------------------------------------------------------------
          A concrete worked example, without publishing the client metrics.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="example">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Worked example"
                title="Customer onboarding, rebuilt around document understanding"
                lead="A banking client in the Gulf where officers filled every form by hand, back office staff retyped the same details, and compliance review meant reading each document line by line."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {[
                {
                  t: "What was happening",
                  b: "The same information was entered three times by three people, and the review step was a person reading a document looking for fields.",
                  icon: "error" as const,
                },
                {
                  t: "What we built",
                  b: "A custom document model trained on the bank's own documents, reading applications and filling them automatically inside Power Platform.",
                  icon: "preview" as const,
                },
                {
                  t: "What changed",
                  b: "Officers now see the document, the extracted data and a confidence score in one place. The person still makes the call, with the reading already done.",
                  icon: "check" as const,
                },
              ].map((item, index) => (
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

            <Reveal delay={340} className="mt-9">
              <p className="measure text-[0.9375rem] leading-relaxed text-muted">
                The same pattern appears in{" "}
                <TextLink href={href("intelliAssessment")}>
                  our assessment product
                </TextLink>
                , which reads a written policy and proposes the scoring rules
                inside it. In both cases the machine does the reading and a
                person keeps the decision.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What compliance and technology leads ask about AI"
        items={faqs}
        tone="canvas"
      />

      <RelatedPages
        title="Where this gets applied"
        items={[
          {
            key: "servicesD365",
            blurb:
              "The customer engagement suite these agents are usually placed inside.",
          },
          {
            key: "servicesPowerPlatform",
            blurb:
              "The platform layer where the data, identity and governance live.",
          },
          {
            key: "staffAug",
            blurb:
              "A Copilot and AI engineer placed inside your team, if the work is ongoing.",
          },
        ]}
      />

      <ClosingCta
        title="Name one task somebody does forty times a week."
        lead="Not a strategy, a task. Reading a document for four fields, sorting a queue, writing the same summary in different words. That is where this pays for itself, and it is a much shorter conversation than an AI roadmap."
        primary={{ label: "Find the step worth automating", key: "contact" }}
        secondary={{ label: "See the whole practice", key: "services" }}
      />
    </>
  );
}
