import type { Metadata } from "next";

import { FigFormToRecord } from "@/components/figures/form-to-record";
import { MarkIntelliForm } from "@/components/figures/product-marks";
import { Reveal } from "@/components/ui/reveal";
import {
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

const PATH = "/intelli-form/";

export const metadata: Metadata = pageMetadata({
  title: "Drag and Drop Form Builder for Power Pages",
  description:
    "Build multi step forms with conditional logic, validation and payments on Microsoft Power Pages. Every submission lands as a Dataverse record, not an email.",
  path: PATH,
});

/**
 * Intelli Form.
 *
 * Rewritten August 2026. The previous page argued its case almost entirely by
 * contrast with Intelli Assessment and the platform story, said "no code" five
 * times, and closed by linking to another product. It now argues on its own
 * terms: the distance between collecting an answer and holding a record, and
 * everything that falls into that distance.
 */

/**
 * The self diagnostic. A buyer who answers yes to three of these is already
 * sold, and a buyer who answers no to all six should not buy anything.
 */
const DIAGNOSTIC = [
  {
    q: "How many hours has your team spent fixing incomplete forms or chasing missing information?",
    a: "Fields become intelligent, so a person cannot skip what matters and you stop chasing email.",
  },
  {
    q: "How often do applicants abandon a form because it feels too long or confusing?",
    a: "Multi step logic shows only what is relevant to the answer just given, which keeps a long process short on screen.",
  },
  {
    q: "How many times has somebody manually retyped a submission into Dynamics 365?",
    a: "Submissions are written straight into Dataverse and Dynamics 365 under the permissions that already exist there.",
  },
  {
    q: "How confident are you that the data arriving is accurate and validated?",
    a: "Real time validation and machine assisted checks run before submission rather than after somebody reads it.",
  },
  {
    q: "How much time is lost handling payments separately from applications?",
    a: "Payment is taken inside the same flow, so the money and the application stay attached to each other.",
  },
  {
    q: "Can your current form handle a new programme, or a sudden spike in demand?",
    a: "It runs on Power Pages, so more forms, more programmes and more volume do not mean a rebuild.",
  },
];

const capabilities = [
  {
    name: "Drag and drop builder",
    body: "Lay out fields, sections and steps by dragging them. The person who owns the process builds the form, which removes the wait for a developer that kills most internal projects.",
    detail: "Built by the process owner",
    icon: "drag" as const,
  },
  {
    name: "Multi step conditional flows",
    body: "Split a long form across steps, show and hide sections based on earlier answers, and let people save and return. A twelve page application stops looking like a twelve page application.",
    detail: "Long process, short screen",
    icon: "steps" as const,
  },
  {
    name: "Validation as they type",
    body: "Rules check entries in real time and flag missing or unusual values before submission. Fewer rejections downstream, cleaner data arriving, and less back and forth with the applicant.",
    detail: "Caught at the source",
    icon: "check" as const,
  },
  {
    name: "Payments inside the flow",
    body: "Collect a fee as part of the submission rather than as a separate step people forget. The payment record and the application record are created together and stay linked.",
    detail: "Paid at submission",
    icon: "card" as const,
  },
  {
    name: "Direct Dataverse write",
    body: "A submission is written into the table it belongs to, under the permissions, relationships and business rules already defined there. Nothing is exported, synced or reconciled afterwards.",
    detail: "One record, one place",
    icon: "database" as const,
  },
  {
    name: "Embedded and branded",
    body: "Forms embed inside your existing portal carrying your own branding, so an applicant never notices they crossed into another system. Universities customise forms and workflow without rebuilding the portal around them.",
    detail: "Your portal, your brand",
    icon: "portal" as const,
  },
];

/** What organisations actually get when they optimise for speed alone. */
const FAILURES = [
  {
    title: "Complicated forms",
    body: "Every field anyone might ever need, on one page, because trimming it required a decision nobody wanted to own. The result overloads the applicant instead of simplifying the journey.",
    icon: "error" as const,
  },
  {
    title: "Disconnected systems",
    body: "Payments in one place, submissions in another, the customer record in a third. Each gap is closed by a person, and every person closing a gap is a delay and a transcription error waiting to happen.",
    icon: "link" as const,
  },
  {
    title: "Poor data quality",
    body: "Without structured validation, submissions arrive incomplete, inaccurate or inconsistent, and the cost lands on whoever has to process them rather than on whoever designed the form.",
    icon: "database" as const,
  },
];

const faqs: Faq[] = [
  {
    question: "What is Intelli Form?",
    answer:
      "A form builder that runs on Microsoft Power Pages and writes into Dataverse. You lay a form out by dragging fields, add conditional steps and validation without writing code, and publish it into your own portal with your own branding. Every submission becomes a record in the table it belongs to, under the permissions that table already has.",
  },
  {
    question: "How is it different from Jotform, Formstack or Kissflow?",
    answer:
      "Those tools are platform agnostic, so a submission lands in their storage first and then has to reach Dataverse through an export, an integration or a scheduled sync. Each hop is a place two copies can drift apart. This writes directly, so there is no second copy. If you are not running Dynamics 365 or Power Platform, those three are genuinely the better choice and we will tell you so.",
  },
  {
    question: "Where is it used in practice?",
    answer:
      "University transcript requests and admissions, government certifications and licensing, and not for profit research and registration. The common shape is a multi step application with supporting documents, an approval behind it, and often a fee.",
  },
  {
    question: "Do I need a developer to build a form?",
    answer:
      "No. Fields, sections, steps and conditional logic are configured by dragging and setting options. A developer is needed only when a form has to call something unusual outside Power Platform.",
  },
  {
    question: "What does the artificial intelligence actually do?",
    answer:
      "It validates information in real time, detects missing or unusual entries, and guides a person through the steps so errors are caught before submission rather than during processing. It does not decide anything on your behalf, and it does not approve or reject an application.",
  },
  {
    question: "Can it take payments?",
    answer:
      "Yes, inside the submission rather than as a separate step. The payment and the application are created as linked records, so reconciling a fee against an application is not a manual job at the end of the month.",
  },
  {
    question: "Does it work outside Power Pages?",
    answer:
      "No, and that is deliberate rather than a gap. The direct Dataverse write is only possible because of where it runs. If your data does not live in Dataverse, a platform agnostic form builder will serve you better.",
  },
];

export default function IntelliFormPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            softwareApplication({
              name: "Intelli Form",
              path: PATH,
              description:
                "A drag and drop form builder on Microsoft Power Pages with multi step conditional flows, real time validation and integrated payments, writing submissions directly into Dynamics 365 Dataverse tables.",
              features: [
                "Drag and drop form builder",
                "Multi step conditional flows",
                "Real time and machine assisted validation",
                "Payments taken inside the submission",
                "Direct Dataverse write",
                "Portal embedding with your own branding",
              ],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Intelli Form", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Intelli Form"
        trail={[
          { name: "Home", path: "/" },
          { name: "Intelli Form", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Complex forms on</span>
            </span>
            <span>
              <span>Power Pages, without</span>
            </span>
            <span>
              <span>custom code.</span>
            </span>
          </>
        }
        lead="Collecting an answer and holding a record are not the same thing, and almost all of the work sits in the distance between them. Intelli Form closes that distance: multi step flows, validation as people type, payment taken inside the submission, and a Dataverse record at the end of it rather than an email somebody has to retype."
        primaryCta={{ label: "See it on one of your forms", key: "contact" }}
        secondaryCta={{ label: "Compare against standalone tools", key: "compare" }}
        meta={{
          label: "Used for",
          items: ["Transcript requests", "Certifications", "Applications", "Registrations"],
        }}
        figure={
          <div
            data-fig=""
            data-reveal=""
            suppressHydrationWarning
            className="overflow-hidden rounded-xl shadow-[var(--shadow-lift)] ring-1 ring-o-100"
          >
            <MarkIntelliForm />
          </div>
        }
      />

      {/* ---------------------------------------------------------------
          Self diagnostic. Six questions a process owner already knows the
          answer to, which is a faster route to recognition than features.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="diagnostic">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Six questions"
                title="You already know if this is your problem"
                lead="None of these are hypothetical. Every one is a cost somebody in your organisation is absorbing this week."
              />
            </Reveal>

            <ul className="mt-12 grid gap-x-10 gap-y-8 lg:grid-cols-2">
              {DIAGNOSTIC.map((item, index) => (
                <Reveal as="li" key={item.q} delay={index * 60}>
                  <div className="border-t border-rule-strong pt-6">
                    <p className="font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                      {item.q}
                    </p>
                    <p className="mt-3 flex gap-3 text-[0.9375rem] leading-relaxed text-body">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1.5 w-4 shrink-0 rounded-pill bg-o-500"
                      />
                      {item.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Band>

      {/* The differentiator, drawn rather than asserted */}
      <Band tone="canvas" block="routes">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="The difference"
                title="Same submission. Two very different routes."
                lead="Every form builder can collect an answer. The question is what happens next. A standalone tool has to move the answer to where your data actually lives, and each move is a place the two copies can drift apart."
              />
            </Reveal>
            <Reveal delay={140} className="mt-12">
              <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-10">
                <FigFormToRecord />
              </div>
            </Reveal>
            <Reveal delay={220} className="mt-8">
              <TextLink href={href("compare")}>
                See the full comparison against Jotform, Formstack and Kissflow
              </TextLink>
            </Reveal>
          </div>
        </Container>
      </Band>

      <Capabilities
        eyebrow="Capabilities"
        title="What a process owner can build without waiting"
        items={capabilities}
        variant="grid"
        tone="warmer"
      />

      {/* ---------------------------------------------------------------
          What speed without structure produces.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="failures">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="The usual outcome"
                title="Speed without structure creates more problems than it solves"
                lead="Organisations under pressure to digitise usually attack the symptom, which is that the form takes too long. Three things reliably follow."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {FAILURES.map((item, index) => (
                <Reveal key={item.title} delay={index * 90}>
                  <div className="flex h-full flex-col rounded-xl border border-dashed border-rule-strong bg-warm-1 p-7 lg:p-8">
                    <IconChip name={item.icon} size="sm" />
                    <h3 className="mt-5 font-display text-[1.1875rem] font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={320} className="mt-10">
              <p className="measure text-[1.0625rem] leading-relaxed text-ink-2">
                Scaling is not adding more forms or absorbing more volume. It is
                building workflows that grow without a rebuild each time a new
                programme, a new department or a new payment type arrives.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <ProofStrip
        tone="peach"
        eyebrow="Why it matters commercially"
        title="A form is often the only thing an applicant ever sees of you"
        stats={[
          {
            figure: "74%",
            label: "of organisations rank digital experience a top priority",
            detail: "while still running forms that need manual validation and re entry",
          },
          {
            figure: "80%",
            label: "of customers weigh experience as heavily as the product",
            detail: "a slow or confusing application is a decision, not an inconvenience",
          },
          {
            figure: "30%",
            label: "operational efficiency improvement",
            detail: "reported by organisations that automate workflows end to end",
          },
        ]}
      />

      {/* ---------------------------------------------------------------
          AI, stated narrowly and honestly.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="ai">
        <Container>
          <div className="py-band">
            <Reveal>
              <Eyebrow>What the intelligence is for</Eyebrow>
            </Reveal>
            <Reveal delay={90} className="mt-6">
              <h2 className="measure-tight text-d3">
                It checks the answer before you have to.
              </h2>
            </Reveal>
            <Reveal delay={180} className="mt-6 measure">
              <p className="text-[1.0625rem] leading-relaxed text-body">
                The intelligence here is deliberately narrow. It validates in
                real time, detects entries that are missing or that look wrong
                against everything else on the form, and guides a person through
                the steps so the error is caught while they are still there to
                fix it. It does not read a submission and decide anything, and it
                does not approve or reject an application. Fewer rejections,
                cleaner data, faster processing, and no judgement handed to a
                machine.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What process owners ask before rebuilding a form"
        items={faqs}
        tone="warm"
      />

      <RelatedPages
        title="Related to this"
        items={[
          {
            key: "government",
            blurb:
              "Permits, licences and registrations published by the team that owns the service.",
          },
          {
            key: "compare",
            blurb:
              "How a Dataverse native form differs from Jotform, Formstack and Kissflow.",
          },
          {
            key: "services",
            blurb:
              "The Power Pages practice, if the portal around the form needs work too.",
          },
        ]}
      />

      <ClosingCta
        title="Pick the form your team complains about most."
        lead="Send us the one that generates the most chasing, the most re entry or the most abandonment. We will rebuild that one in front of you and you can judge it against what you run today."
        primary={{ label: "See it on one of your forms", key: "contact" }}
        secondary={{ label: "Read the Intelli Form paper", key: "resources" }}
      />
    </>
  );
}
