import type { Metadata } from "next";

import { Segments, type Segment } from "@/components/page/segments";
import { FigMaturityIndex } from "@/components/figures/maturity-index";
import { MarkGovernance } from "@/components/figures/product-marks";
import {
  ClosingCta,
  FaqSection,
  PageHero,
  ProofStrip,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";

const PATH = "/not-for-profit/";

export const metadata: Metadata = pageMetadata({
  title: "Power Platform Budgeting Software for Nonprofits",
  description:
    "Compliance ready fundraising, NDIS, health and assessment solutions on Microsoft Power Platform, built to replace spreadsheets and prove impact to funders.",
  path: PATH,
});

const segments: Segment[] = [
  {
    tag: "Fundraising",
    title: "A Microsoft powered CRM for global fundraising",
    intro:
      "Charitable organisations based in Australia running projects worldwide. Donors want to support a specific cause or give zakat, which is restricted to eligible projects. Most of that still runs on spreadsheets. A connected CRM manages the whole ecosystem instead: donors, beneficiaries, field partners, implementation partners, expenses and the central funding pool.",
    blocks: [
      {
        heading: "Impact tracked, not just donations",
        body: "An organisation supporting ten orphans with monthly transfers can track each one over time, including the monthly visits field staff make. What goes back to the donor is an accountability report showing what their money did, rather than a generic receipt.",
      },
      {
        heading: "Pledge campaigns that charge themselves",
        body: "A donor pledging to support four children every month is charged on schedule without anyone intervening. Recurring gifts, zakat restrictions, project allocations and field partner disbursements all run inside one platform.",
      },
      {
        heading: "One place instead of many",
        body: "Donor records, project allocations, partner disbursements and expenses share a data model, so the question of what a campaign actually cost has an answer rather than a reconstruction.",
      },
      {
        heading: "From selection to report",
        body: "The system covers the whole span, from the moment a donor picks a project to the accountability report showing a child's monthly progress. Charities modernise operations, donors get transparency, and beneficiaries get consistent support.",
      },
    ],
  },
  {
    tag: "Professional associations",
    title: "Skills assessment for migration and workforce pathways",
    intro:
      "Associations that assess skills evaluate qualifications, verify employment experience and check applicants against occupation standards. As volumes rise and occupation lists change between assessment cycles, manual evaluation produces delay, inconsistency and pressure on the assessment team.",
    blocks: [
      {
        heading: "Digital assessment on Power Platform",
        body: "Intelli Assessment automates application intake, standardises scoring logic, and keeps evaluation outcomes consistent against occupation requirements, with the whole lifecycle visible rather than sitting across documents and spreadsheets.",
      },
      {
        heading: "Scoring that adapts between cycles",
        body: "Configurable scoring models reflect the criteria the association defines, and can change as qualification requirements move across migration cycles without the previous cycle's records losing their meaning.",
      },
      {
        heading: "Guided intake",
        body: "Applicant information is captured through guided workflows, rule based evaluation logic runs against it, and supporting documentation is organised in the same system rather than in an inbox.",
      },
      {
        heading: "Capacity that scales",
        body: "Review teams gain a secure environment for structured eligibility evaluation, so a busier intake period is a matter of throughput rather than of hiring assessors to read spreadsheets.",
      },
    ],
    proof: {
      label: "Community Work Australia",
      body: "One association runs its recognition assessment for skilled migration pathways this way, and the write up of that engagement is published in full as a case study rather than summarised twice.",
    },
  },
  {
    tag: "NDIS",
    title: "Participant management and compliance for disability providers",
    intro:
      "Providers operating in the NDIS environment manage participant plans, workforce coordination, funding utilisation and compliance documentation across several stakeholders at once. Many still coordinate that through spreadsheets and email, which limits visibility and adds administrative pressure to delivery teams.",
    blocks: [
      {
        heading: "NDIS CRM on Power Platform",
        body: "Participant records, funding visibility and coordination between support workers, coordinators and families sit in one connected platform, aligned with NDIA reporting expectations and the documentation standards each service category requires.",
      },
      {
        heading: "Scheduling, approvals and reporting",
        body: "Structured workflows handle scheduling coordination, documentation tracking, approvals, reminders and reporting preparation, so teams spend less effort on processing and deliver more consistently.",
      },
      {
        heading: "Funding gaps seen earlier",
        body: "Real time funding utilisation makes it possible to spot a support gap during a plan period rather than at the end of one, which is when continuity of service is still recoverable.",
      },
      {
        heading: "Audit ready from the start",
        body: "Specialists experienced in NDIS reporting frameworks help configure documentation structures correctly at implementation and keep them right in operation, which reduces claim rejection risk and strengthens reporting accuracy.",
      },
    ],
  },
  {
    tag: "Health",
    title: "Healthcare CRM for patient engagement and funded reporting",
    intro:
      "Community healthcare organisations run regional programmes, preventative care and grant funded services at the same time. They need structured reporting for funders while staying in contact with patients who may have limited access to digital platforms.",
    blocks: [
      {
        heading: "Connected care across communities",
        body: "Centralising patient interaction data and structuring communication workflows gives providers visibility across community programmes while keeping continuity of care across regional populations.",
      },
      {
        heading: "Automated SMS engagement",
        body: "SMS workflows through Twilio deliver appointment reminders, follow up notifications, immunisation alerts and clinic announcements automatically, which reduces missed appointments and lifts participation in preventative programmes.",
      },
      {
        heading: "Reporting for Department of Health funding",
        body: "Structured reporting automation improves visibility and reduces manual preparation across the datasets required for performance monitoring and funding accountability.",
      },
      {
        heading: "First contact to final report",
        body: "The platform covers the whole span, so the report a funder receives is assembled from the same records that recorded the care rather than rebuilt at the end of the period.",
      },
    ],
    proof: {
      label: "Melanoma Patients Australia",
      body: "Melanoma Patients Australia runs a CRM built by Datanox to coordinate its patient support and advocacy programmes, and to produce the structured reporting its funders require from the same records that captured the work.",
    },
  },
];

const faqs: Faq[] = [
  {
    question: "What problems does Datanox solve for nonprofits?",
    answer:
      "The common ones are the same across fundraising, disability services, professional associations and community health: limited funding, complex reporting obligations, and manual processes that drain staff time. Datanox builds compliance ready solutions on Microsoft Power Platform that replace spreadsheets with automation and connect departments that currently work in isolation.",
  },
  {
    question: "How does this replace spreadsheet based workflows?",
    answer:
      "A spreadsheet cannot route an approval, cannot record who changed a figure, and cannot enforce who is allowed to see which record. Moving the same work into Dataverse keeps the familiar grid entry where it helps and adds the routing, history and permissions underneath it.",
  },
  {
    question: "Does it support grant and fund budgeting specifically?",
    answer:
      "Yes. Restricted funds, grant reporting and the operating budget sit in one model, which is what makes acquitting a grant a report rather than a rebuild. Governance and Performance is the product that covers this side.",
  },
  {
    question: "What fundraising tools are included?",
    answer:
      "Donor management, project selection including zakat restricted giving, pledge campaigns with automated recurring payments, field and implementation partner disbursement, expense tracking against a central funding pool, and accountability reporting that shows a donor what their money produced.",
  },
  {
    question: "Is this the same product as Governance and Performance, or separate?",
    answer:
      "Not for profit is a vertical rather than a product. Depending on the requirement it draws on Governance and Performance for budgeting and reporting, Intelli Form for intake, and Intelli Assessment for evaluation. Because all three write to the same Dataverse model, an organisation can start with one and add another without an integration project.",
  },
  {
    question: "Are you familiar with NDIS reporting requirements?",
    answer:
      "Yes. Datanox works with specialists experienced in NDIS reporting frameworks who help configure documentation structures correctly from implementation onward, which is what keeps providers audit ready and reduces claim rejection risk.",
  },
];

export default function NotForProfitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            service({
              name: "Power Platform solutions for not for profit organisations",
              path: PATH,
              description:
                "Compliance ready fundraising, professional association assessment, NDIS participant management and community health CRM built on Microsoft Power Platform.",
              serviceType: "Nonprofit CRM and budgeting software",
              areaServed: ["Australia"],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Not for Profit", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Not for Profit, Australia"
        trail={[
          { name: "Home", path: "/" },
          { name: "Not for Profit", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Prove the impact,</span>
            </span>
            <span>
              <span>not just the</span>
            </span>
            <span>
              <span>donation.</span>
            </span>
          </>
        }
        lead="Not for profit organisations run on limited funding, complex reporting obligations and manual processes that drain staff time. Datanox builds compliance ready solutions on Microsoft Power Platform that replace spreadsheets with automation, connect departments that work in isolation, and let an organisation show a funder what actually happened."
        secondaryCta={{ label: "See the case study", key: "caseStudies" }}
        meta={{
          label: "Serving",
          items: ["Fundraising", "Professional associations", "NDIS", "Health"],
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

      <ProofStrip
        tone="peach"
        stats={[
          {
            figure: "Four",
            label: "service lines under one platform",
            detail:
              "fundraising, professional association assessment, NDIS and community health",
          },
          {
            figure: "Audit",
            label: "ready configuration from day one",
            detail:
              "set up with specialists experienced in NDIS reporting frameworks",
          },
          {
            figure: "Zero",
            label: "spreadsheets in the reporting path",
            detail:
              "the funder report reads from the records that captured the work",
          },
        ]}
      />

      <Segments
        eyebrow="What we build"
        title="Four kinds of organisation, one platform underneath"
        lead="Each of these has a different buyer, a different funder and a different obligation. What they share is Microsoft underneath and a reporting deadline that currently costs somebody a week."
        segments={segments}
      />

      <FaqSection
        eyebrow="Answers"
        title="What boards and funders ask about a new system"
        items={faqs} tone="warm" />

      <RelatedPages
        title="What sits underneath this"
        items={[
          {
            key: "governance",
            blurb:
              "Fund, grant and operating budgets in one model, with acquittal reporting that reads from it.",
          },
          {
            key: "intelliAssessment",
            blurb:
              "The assessment engine behind professional association evaluation.",
          },
          {
            key: "caseStudies",
            blurb:
              "How Community Work Australia moved its assessment off spreadsheets.",
          },
        ]}
      />

      <ClosingCta
        title="Bring the funder report that currently takes a week to assemble."
        lead="One real reporting obligation of yours, walked through properly: what has to be in it, where each number currently comes from, and how much of that path can be removed. Most of the week turns out to be assembly rather than analysis."
        primary={{ label: "Walk through a report", key: "contact" }}
        secondary={{ label: "Read the case study", key: "caseCommunityWork" }}
      />
    </>
  );
}
