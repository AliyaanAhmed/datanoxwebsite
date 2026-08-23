import type { Metadata } from "next";

import { FigFormToRecord } from "@/components/figures/form-to-record";
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
  PageHero,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph } from "@/lib/schema";

const PATH = "/compare/power-pages-vs-jotform-formstack-kissflow/";

export const metadata: Metadata = pageMetadata({
  title: "Power Pages vs Jotform, Formstack and Kissflow",
  description:
    "An even handed comparison of Intelli Form on Power Pages against Jotform, Formstack and Kissflow, including where each of the three is the better choice.",
  path: PATH,
});

type Support = "yes" | "no" | "partial";

const vendors = ["Intelli Form", "Jotform", "Formstack", "Kissflow"] as const;

const rows: {
  criterion: string;
  note: string;
  values: [Support | string, Support | string, Support | string, Support | string];
}[] = [
  {
    criterion: "Writes directly into Dataverse",
    note: "A submission lands in your existing Dynamics 365 table with no export, sync or second copy.",
    values: ["yes", "no", "no", "no"],
  },
  {
    criterion: "Reaches Dataverse at all",
    note: "Through an integration, a connector or a scheduled job rather than natively.",
    values: ["yes", "partial", "partial", "partial"],
  },
  {
    criterion: "Inherits your existing permissions",
    note: "Row level security and business rules already defined on the table apply automatically.",
    values: ["yes", "no", "no", "no"],
  },
  {
    criterion: "No code builder",
    note: "Someone who owns the process can build the form without a developer.",
    values: ["yes", "yes", "yes", "yes"],
  },
  {
    criterion: "Multi step conditional forms",
    note: "Long forms split across steps with logic that shows and hides sections.",
    values: ["yes", "yes", "yes", "yes"],
  },
  {
    criterion: "Payment capture",
    note: "Collecting a fee as part of the submission rather than as a separate step.",
    values: ["yes", "yes", "yes", "partial"],
  },
  {
    criterion: "Approval and process routing",
    note: "Sending a submission through a defined approval path after it arrives.",
    values: ["yes", "partial", "yes", "yes"],
  },
  {
    criterion: "Document generation and signature",
    note: "Producing a document from the submission and collecting a signature on it.",
    values: ["partial", "yes", "yes", "partial"],
  },
  {
    criterion: "Template library size",
    note: "How much you can start from rather than build.",
    values: ["Modest", "Very large", "Large", "Moderate"],
  },
  {
    criterion: "Works without Microsoft",
    note: "Useful to an organisation with no Power Platform footprint.",
    values: ["no", "yes", "yes", "yes"],
  },
  {
    criterion: "Published list pricing",
    note: "A price you can read before speaking to anyone.",
    values: ["no", "yes", "yes", "yes"],
  },
];

const verdicts = [
  {
    name: "Jotform",
    line: "Best for the fastest rollout and the largest template library",
    body: "If you need a form live this afternoon and your data does not have to land in Dynamics 365, Jotform will get you there faster than anything here, including us. Its template library is the largest in the comparison and its pricing is public.",
  },
  {
    name: "Formstack",
    line: "Best when forms, documents and signature are one flow",
    body: "Formstack is strongest where a submission has to become a document and then get signed. If that is the actual job, it does more of it out of the box than Intelli Form does.",
  },
  {
    name: "Kissflow",
    line: "Best when the approval process matters more than the form",
    body: "Kissflow treats the form as the entry point to a configurable process. If your requirement is really about routing and approval design, and your data can live in its platform, it fits that shape well.",
  },
  {
    name: "Intelli Form",
    line: "Best when the data has to live in Dataverse",
    body: "Intelli Form is the only option here that writes a submission straight into your existing Dynamics 365 tables, under the permissions and business rules already defined on them. That is the whole reason to choose it, and if your data does not live in Dataverse it is the wrong choice.",
  },
];

const faqs: Faq[] = [
  {
    question: "What is the actual difference between these tools?",
    answer:
      "Jotform, Formstack and Kissflow are platform agnostic. A submission lands in their storage first, and reaching Dataverse means an export, a connector or a scheduled sync. Intelli Form is Dataverse native, so the submission is written into your table directly. Everything else in the comparison follows from that one architectural difference.",
  },
  {
    question: "Is Intelli Form better than Jotform?",
    answer:
      "Not in general, and it would be dishonest to say otherwise. Jotform is faster to start, has far more templates, publishes its pricing and works for any organisation. Intelli Form is better on exactly one axis, which is whether the data ends up in your Dynamics 365 data model without a second copy. If that axis matters to you it tends to outweigh the rest. If it does not, choose Jotform.",
  },
  {
    question: "Can Jotform or Formstack connect to Dataverse?",
    answer:
      "They can reach it through connectors, Power Automate or a custom integration. That works. What it does not do is remove the second copy of the data, the sync that can fail quietly, and the permissions model that has to be maintained twice. Whether that is acceptable depends on how much your governance obligations weigh.",
  },
  {
    question: "Why does Intelli Form not publish pricing?",
    answer:
      "Scope varies enough between a small internal form and an enterprise portal that a list price would mislead. It is a fair criticism of the comparison and it is why the row is marked no rather than left out.",
  },
  {
    question: "What if we are moving to Dynamics 365 but are not there yet?",
    answer:
      "Then a platform agnostic tool now and a migration later is usually the cheaper path, because the second copy problem only starts costing once your data model matters. Ask us and we will tell you honestly whether it is worth waiting.",
  },
];

function Cell({ value }: { value: Support | string }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5 text-o-700">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8.5 6.5 12 13 4.5" />
        </svg>
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex items-center text-muted/60">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
        <span className="sr-only">No</span>
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex items-center text-o-400">
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4" fill="currentColor">
          <circle cx="8" cy="8" r="6" fillOpacity="0.25" />
          <path d="M8 2a6 6 0 0 1 0 12V2Z" />
        </svg>
        <span className="sr-only">Partial, through an integration</span>
      </span>
    );
  }
  return <span className="text-[0.875rem] text-ink-2">{value}</span>;
}

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Compare", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Comparison"
        trail={[
          { name: "Home", path: "/" },
          { name: "Power Pages vs Jotform, Formstack and Kissflow", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Power Pages against</span>
            </span>
            <span>
              <span>the standalone</span>
            </span>
            <span>
              <span>form tools.</span>
            </span>
          </>
        }
        lead="Every form builder can collect an answer. They differ in what happens next. This page sets Intelli Form on Power Pages against Jotform, Formstack and Kissflow, including the cases where one of those three is the better choice for you."
        secondaryCta={{ label: "See Intelli Form", key: "intelliForm" }}
      />

      {/* The table */}
      <Band tone="warm">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Side by side"
                title="What each one actually does"
                lead="Yes means supported natively. The half filled mark means supported through an integration, a connector or a scheduled job rather than directly."
              />
            </Reveal>

            {/* The table is wider than a phone. It scrolls inside its own
                container rather than pushing the page sideways, but a scroll
                container with no visible edge is one people miss, so the
                affordance is stated. */}
            <Reveal delay={120} className="mt-4 lg:hidden">
              <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                Scroll the table sideways to compare
                <ArrowRight className="text-o-400" />
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-4 lg:mt-12">
              <div className="overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-soft)] ring-1 ring-rule">
                <table className="w-full min-w-[52rem] border-collapse text-left">
                  <caption className="sr-only">
                    Feature comparison of Intelli Form, Jotform, Formstack and
                    Kissflow
                  </caption>
                  <thead>
                    <tr className="border-b border-rule">
                      <th
                        scope="col"
                        className="p-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted lg:p-6"
                      >
                        Criterion
                      </th>
                      {vendors.map((vendor) => (
                        <th
                          key={vendor}
                          scope="col"
                          className={`p-5 font-display text-[0.9375rem] font-semibold lg:p-6 ${
                            vendor === "Intelli Form"
                              ? "bg-o-50 text-o-800"
                              : "text-ink"
                          }`}
                        >
                          {vendor}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.criterion} className="border-b border-rule last:border-0">
                        <th
                          scope="row"
                          className="max-w-[22rem] p-5 align-top font-normal lg:p-6"
                        >
                          <span className="block font-display text-[0.9375rem] font-semibold text-ink">
                            {row.criterion}
                          </span>
                          <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-muted">
                            {row.note}
                          </span>
                        </th>
                        {row.values.map((value, index) => (
                          <td
                            key={vendors[index]}
                            className={`p-5 align-top lg:p-6 ${
                              index === 0 ? "bg-o-50/60" : ""
                            }`}
                          >
                            <Cell value={value} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* The figure */}
      <Band tone="canvas">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Why the first row matters most"
                title="The route a submission takes"
                lead="Most rows in that table are close. The first one is not, and it is the row every other difference comes from."
              />
            </Reveal>
            <Reveal delay={140} className="mt-12">
              <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-10">
                <FigFormToRecord />
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* Verdicts */}
      <Band tone="warmer">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="One sentence each"
                title="When to choose which"
                lead="Written the way we would say it on a call, including the times the answer is not us."
              />
            </Reveal>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2">
              {verdicts.map((verdict, index) => (
                <Reveal as="li" key={verdict.name} delay={index * 80}>
                  <Card
                    className={`h-full ${
                      verdict.name === "Intelli Form" ? "!ring-o-300" : ""
                    }`}
                  >
                    <h3 className="text-d4">{verdict.name}</h3>
                    <p className="mt-2 font-display text-[1rem] leading-snug text-o-700">
                      {verdict.line}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed">
                      {verdict.body}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="mt-8">
              <p className="measure text-[0.875rem] leading-relaxed text-muted">
                Compiled from published product documentation and marketing
                material at the time of writing. Vendors change what they
                support. If a row here is out of date, tell us and it will be
                corrected rather than left to age.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What people ask when comparing these four"
        items={faqs} tone="canvas" />

      <RelatedPages
        title="If the comparison settled it"
        items={[
          {
            key: "intelliForm",
            blurb: "The full product page, including what it does beyond the table.",
          },
          {
            key: "education",
            blurb: "Where multi page application intake actually gets used.",
          },
          {
            key: "resources",
            blurb: "The Intelli Form white paper, with the technical detail.",
          },
        ]}
      />

      <ClosingCta
        title="Still not sure which of the four fits?"
        lead="Tell us what your form has to do and where the data has to end up. If one of the other three is the better answer we will say so."
      />
    </>
  );
}
