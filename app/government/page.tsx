import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
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
import { FigTraceChain } from "@/components/figures/trace-chain";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";

const PATH = "/government/";

export const metadata: Metadata = pageMetadata({
  title: "Dynamics 365 and Power Platform for Government",
  description:
    "Strategic planning, budget allocation, citizen services, grant assessment and performance reporting for public entities, inside your own Microsoft tenant.",
  path: PATH,
});

/**
 * Government and public sector.
 *
 * This vertical had no page at all before August 2026, despite being the
 * sector the Governance and Performance product was designed for and the one
 * where the audit argument lands hardest.
 *
 * The published client metrics for this sector are deliberately absent, on
 * instruction. What carries the page instead is the structural argument: a
 * public sector system is judged on whether it can explain how a number was
 * reached, and almost none of the spreadsheet based ones can.
 */

const segments: Segment[] = [
  {
    tag: "Strategy and performance",
    title: "From the published strategy down to the invoice",
    intro:
      "Most public entities can produce a strategy document and a budget spreadsheet. What they cannot usually produce, in the same afternoon a minister or a board asks for it, is the line connecting a strategic objective to the initiatives funded under it, the money committed against those initiatives, and the indicator that was supposed to move as a result.",
    blocks: [
      {
        heading: "One model from objective to spend",
        body: "Objectives, initiatives, projects, budget lines, commitments and actuals sit in one Dataverse model rather than in four systems that agree once a quarter. The link between a number and its cause is a relationship in the data, not a footnote somebody typed.",
      },
      {
        heading: "Allocation with a version history",
        body: "A reallocation between initiatives is a recorded event with a requester, an approver, a date and a reason. When the question later becomes why this programme ran short, the answer is in the record rather than in somebody's memory of a meeting.",
      },
      {
        heading: "Indicators attached to the work",
        body: "Key performance indicators are defined against the initiative that is meant to move them, with the source of each measurement named. An indicator with no owner and no source is the most common thing we remove.",
      },
      {
        heading: "Reporting that reads from the record",
        body: "The quarterly pack is generated from the same rows the work was recorded in. Nobody assembles it from exports, which is the step where the numbers usually stop matching.",
      },
    ],
  },
  {
    tag: "Citizen and business services",
    title: "Public facing services that do not need a new stack",
    intro:
      "A permit application, a licence renewal, a complaint, a registration, a grant submission. Each of these tends to arrive as its own procurement, its own portal and its own database, and an entity ends up running nine of them with nine sets of credentials for the same citizen.",
    blocks: [
      {
        heading: "Power Pages on the same Dataverse",
        body: "The public form and the internal case record are the same data, seen through two different security models. There is no synchronisation job in the middle and no reconciliation when the two drift.",
      },
      {
        heading: "Forms built by the service owner",
        body: "Intelli Form lets the team that owns a service publish and change its own form, with conditional logic, document upload and payment, without a development cycle for every wording change a policy update forces.",
      },
      {
        heading: "Arabic and English, right to left included",
        body: "Bilingual delivery is a requirement in the Gulf rather than an enhancement, and a portal that reverses its layout properly is considerably harder to retrofit than to build correctly at the start.",
      },
      {
        heading: "Accessible because it has to be",
        body: "Public sector procurement asks for accessibility conformance in writing. Building on a platform whose components already carry it is a great deal cheaper than proving it about a bespoke front end later.",
      },
    ],
  },
  {
    tag: "Grants, tenders and eligibility",
    title: "Assessment that survives an appeal",
    intro:
      "Any process where a public body decides between applicants attracts scrutiny, and sometimes a formal challenge. The defensible version is not the one with the best scoring spreadsheet, it is the one that can show which rule was applied, what evidence it was applied to, who applied it and what the criteria were on that date.",
    blocks: [
      {
        heading: "Policy expressed as rules",
        body: "Intelli Assessment turns written eligibility criteria into weighted, versioned scoring rules. When the policy changes, the new version applies to new applications and the old one still explains the decisions already made under it.",
      },
      {
        heading: "Evidence attached to the criterion",
        body: "Each score points at the document or the field it was derived from, so a reviewer or an auditor sees the basis without asking the assessor to reconstruct it.",
      },
      {
        heading: "Consistent across assessors",
        body: "The same rule set applied by twelve people produces comparable outcomes. Variation between assessors is the finding that damages a grant programme most, and it is almost entirely a tooling problem.",
      },
      {
        heading: "The whole trail preserved",
        body: "Submission, completeness check, scoring, moderation, decision and notification are one record. An appeal is answered from it rather than from an inbox.",
      },
    ],
  },
  {
    tag: "Correspondence and case work",
    title: "The work that arrives without a form",
    intro:
      "Ministerial correspondence, inter entity requests, escalations and anything else that starts as a letter or a phone call. This is the category most likely to still be tracked in a shared mailbox and a register that somebody updates by hand.",
    blocks: [
      {
        heading: "Routing by subject, not by inbox",
        body: "A request is classified once and routed to the unit that owns the subject, with a due date derived from the service standard rather than from whoever remembered to set one.",
      },
      {
        heading: "Service level visible while it matters",
        body: "Time remaining on an obligation is visible during the obligation rather than in the report about it afterwards, which is the only point at which anybody can still act.",
      },
      {
        heading: "One citizen, one history",
        body: "Correspondence, applications, complaints and payments belong to the same record, so an officer answering a call is not the last person in the entity to find out what happened last month.",
      },
      {
        heading: "Records retention built in",
        body: "Retention rules and disposal schedules are configured against the record type rather than left to the discipline of individual officers, which is what a records audit actually tests.",
      },
    ],
  },
];

/** The five procurement questions, and honest answers to them. */
const ASSURANCE: { name: string; body: string; icon: IconName }[] = [
  {
    name: "Data stays in your tenant",
    body: "Every system is built in the entity's own Microsoft environment, in the region the entity has chosen, under its identity provider and its logging. Datanox works inside it rather than hosting anything.",
    icon: "shield",
  },
  {
    name: "The audit trail is not optional",
    body: "Who changed what, when, and against which version of the rule, preserved as a matter of design rather than as an add on. This is the requirement that decides whether a system survives its first review.",
    icon: "record",
  },
  {
    name: "AI advises, a person decides",
    body: "Machine generated output is labelled as such, approved by a named person before it takes effect, and kept in the trail. That rule is absolute and it is what keeps a proposal aligned with the human oversight principles procurement now asks about.",
    icon: "check",
  },
  {
    name: "Handover is part of the work",
    body: "Solution boundaries, environment strategy, deployment pipelines and documentation are delivered with the system, so an entity that wants to run it with its own team can.",
    icon: "layers",
  },
  {
    name: "Local delivery where it is required",
    body: "Work in the Gulf is delivered alongside a local partner where presence in the room is part of the requirement, rather than remotely by default.",
    icon: "globe",
  },
  {
    name: "Licences bought from Microsoft",
    body: "We scope what an entity needs and say so plainly. The licences themselves are bought from Microsoft or a licensing partner, and there is no margin on them here.",
    icon: "handshake",
  },
];

const faqs: Faq[] = [
  {
    question: "Where does the data physically sit?",
    answer:
      "In your own Microsoft tenant, in the Azure region you select, including the regions offered for data residency in the United Arab Emirates and Australia. We build inside your environment under your access controls. Nothing is hosted by Datanox and no client data is copied into our systems.",
  },
  {
    question: "We already have a finance or enterprise resource planning system. Does this replace it?",
    answer:
      "No, and it should not. The finance system stays the ledger. What sits above it is the planning, allocation, delivery and performance layer that a general ledger was never designed to hold, reading actuals from finance rather than duplicating them. Replacing a working finance system to solve a planning problem is an expensive way to solve the wrong thing.",
  },
  {
    question: "How is this procured?",
    answer:
      "Two lines, kept separate on purpose. Microsoft licences are bought from Microsoft or a licensing partner. Implementation, configuration and support are bought from us, either directly or through a local partner where a contract requires a local entity. We are happy to be a subcontractor to a prime where that is the structure.",
  },
  {
    question: "What about accessibility and bilingual requirements?",
    answer:
      "Both are treated as requirements rather than as enhancements. Power Pages components carry accessibility conformance, and bilingual delivery including right to left layout is designed in at the start. Retrofitting either into a finished portal costs several times what building it correctly costs.",
  },
  {
    question: "Can you work with our existing systems rather than around them?",
    answer:
      "That is the usual shape of the work. Identity from your directory, actuals from finance, documents from your records system, and integration through supported connectors or an application programming interface rather than through a nightly file. Where a legacy system has no interface at all we will say so early, because that constraint changes the plan.",
  },
  {
    question: "How long before something is live?",
    answer:
      "A first governed slice, one directorate or one service, is typically live inside a quarter, and that is the shape we argue for. An entity wide rollout designed in full before anything reaches a user is the pattern that produces a two year programme and a system nobody wanted by the time it arrived.",
  },
];

export default function GovernmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            service({
              name: "Dynamics 365 and Power Platform for government and public sector",
              path: PATH,
              description:
                "Strategic planning and budget allocation, citizen and business services on Power Pages, grant and tender assessment, correspondence management and performance reporting for public sector entities.",
              serviceType: "Public sector digital transformation",
              areaServed: ["the United Arab Emirates", "Australia", "Saudi Arabia"],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Government", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Government and public sector"
        trail={[
          { name: "Home", path: "/" },
          { name: "Government", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Explain how</span>
            </span>
            <span>
              <span>the number was</span>
            </span>
            <span>
              <span>reached.</span>
            </span>
          </>
        }
        lead="Public entities are not judged on whether they have a dashboard. They are judged on whether the figure on it can be traced back to a decision, an approval and a record, months after the person who produced it has moved on. That is a data model problem before it is a reporting problem, and it is the one we solve."
        figure={<FigTraceChain />}
        primaryCta={{ label: "Arrange a briefing", key: "contact" }}
        secondaryCta={{ label: "See the platform product", key: "governance" }}
        meta={{
          label: "Delivering in",
          items: ["United Arab Emirates", "Australia", "Saudi Arabia"],
        }}
      />

      {/* ---------------------------------------------------------------
          The sector specific argument, before any capability list.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="tracechain">
        <Container wide>
          <div className="py-band">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
              <Reveal>
                <Eyebrow>Why this sector is different</Eyebrow>
                <h2 className="mt-6 measure-tight text-d2">
                  The record outlives everyone who made it.
                </h2>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-body">
                  A commercial system is usually asked what the number is. A
                  public one is asked how it was arrived at, by an auditor, a
                  parliamentary committee, a journalist or an unsuccessful
                  applicant, and often several years later. Systems designed for
                  the first question fail the second, which is why so much public
                  sector reporting still ends in a spreadsheet somebody keeps in
                  order to be able to answer it.
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  Every design decision on this page follows from that. The
                  point is not the dashboard, it is what sits underneath it.
                </p>
              </Reveal>

              <Reveal delay={140}>
                <ul className="grid gap-3">
                  {[
                    {
                      q: "Which objective funded this?",
                      a: "A relationship in the model, not a note in a cell.",
                    },
                    {
                      q: "Who approved the reallocation?",
                      a: "A named person, a date and a stated reason.",
                    },
                    {
                      q: "Which version of the rule applied?",
                      a: "The one in force on the day the decision was made.",
                    },
                    {
                      q: "Where did this measurement come from?",
                      a: "A named source attached to the indicator itself.",
                    },
                  ].map((item, index) => (
                    <li
                      key={item.q}
                      className="rounded-lg bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule"
                    >
                      <p className="font-display text-[1.0625rem] font-semibold text-ink">
                        <span className="mr-3 font-mono text-[0.75rem] font-normal text-o-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.q}
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                        {item.a}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Band>

      <Segments
        eyebrow="Where we work"
        title="Four kinds of public sector work, one governed layer"
        lead="These arrive as separate procurements and usually end as separate systems. They share a citizen, a budget and an audit obligation, which is a strong argument for them sharing a data model as well."
        segments={segments}
      />

      {/* ---------------------------------------------------------------
          Procurement assurance, answered before it is asked.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="assurance">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Before procurement asks"
                title="Six answers that usually take three meetings"
                lead="None of these are commercial positions we would rather not state. Putting them in writing here saves everybody the discovery call where they are asked one at a time."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ASSURANCE.map((item, index) => (
                <Reveal key={item.name} delay={index * 80}>
                  <Card className="h-full">
                    <IconChip name={item.icon} size="sm" />
                    <h3 className="mt-5 font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {item.body}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>

            <Reveal delay={520} className="mt-9">
              <p className="measure text-[0.9375rem] leading-relaxed text-muted">
                The position on machine generated output is set out in full on
                the{" "}
                <TextLink href={href("servicesAi")}>
                  AI and Copilot page
                </TextLink>
                , and it applies to our own products as well as to work we
                deliver for a client.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What public sector buyers ask first"
        items={faqs}
        tone="canvas"
      />

      <RelatedPages
        title="The pieces this is built from"
        items={[
          {
            key: "governance",
            blurb:
              "The planning, allocation and indicator product this sector drove the design of.",
          },
          {
            key: "intelliAssessment",
            blurb:
              "Weighted scoring for grants, tenders and eligibility decisions.",
          },
          {
            key: "clients",
            blurb:
              "The entities and organisations already running on this work.",
          },
        ]}
      />

      <ClosingCta
        title="Bring the question your last audit asked."
        lead="Not a requirements document. One question somebody could not answer quickly from the systems you have, and we will show you what the model would need to look like for the answer to be a query rather than a project."
        primary={{ label: "Arrange a briefing", key: "contact" }}
        secondary={{ label: "Read the governance paper", key: "resources" }}
      />
    </>
  );
}
