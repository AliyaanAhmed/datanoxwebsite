import type { Metadata } from "next";

import { FigRequestRouting } from "@/components/figures/request-routing";
import { Reveal } from "@/components/ui/reveal";
import { Band, Container, SectionHead, TextLink } from "@/components/ui/primitives";
import { ClientGrid } from "@/components/page/logo-wall";
import { clients } from "@/content/clients";
import { href } from "@/lib/routes";
import {
  ClosingCta,
  FaqSection,
  PageHero,
  ProofStrip,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { Capabilities } from "@/components/page/capabilities";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";

const PATH = "/education/";

const EDU_CLIENTS = clients.filter((client) => client.sector === "Education");

export const metadata: Metadata = pageMetadata({
  title: "Power Platform for Education Institutions",
  description:
    "An education CRM that routes a student request across admin, finance and records in seconds rather than days, with transcripts in the same system.",
  path: PATH,
});

const capabilities = [
  {
    name: "Enter once, route everywhere",
    body: "Staff or applicants enter the basic information and upload documentation a single time. A connected CRM routes the request to every department that has to act, so nobody chases an approval across a siloed team.",
    detail: "One entry point",
    icon: "steps" as const,
  },
  {
    name: "Rules based routing",
    body: "Requests reach finance, academic records, admissions or wherever else they belong based on rules defined in advance rather than on somebody knowing who to forward it to.",
    detail: "Defined, not remembered",
    icon: "route" as const,
  },
  {
    name: "Fewer errors at volume",
    body: "A finance team receiving a hundred separate manual requests will miss details. With the data held once and connected digitally, the checks that used to depend on attention happen structurally.",
    detail: "Structural, not manual",
    icon: "error" as const,
  },
  {
    name: "Secure remote work",
    body: "Because records and approvals live in one governed system rather than on a campus network, staff keep working through disruption without losing access to student records or approval workflows.",
    detail: "Access without the office",
    icon: "remote" as const,
  },
  {
    name: "Transcript and degree delivery",
    body: "Transcripts can be sent directly to the institutions a student is applying to, with express and standard delivery rates shown, and the transaction completed on the page.",
    detail: "Sent and paid in place",
    icon: "send" as const,
  },
  {
    name: "Intake and evaluation together",
    body: "Intelli Form handles complex multi page collection without custom code and Intelli Assessment runs the evaluation lifecycle, so applying, verifying, routing and delivering happen in one environment.",
    detail: "Two products, one model",
    icon: "layers" as const,
  },
];

const faqs: Faq[] = [
  {
    question: "What does Datanox offer education institutions?",
    answer:
      "An automated education CRM built on Microsoft Power Platform that routes student requests across administration, finance and academic records in seconds rather than days, and covers application intake, document verification, approval routing and official transcript delivery in one connected environment.",
  },
  {
    question: "How does routing across departments actually work?",
    answer:
      "Information and documentation are entered once. Rules defined in advance decide which departments have to act, and the request reaches all of them at the same time rather than moving between them in a queue. Each department works in the same record, so the outcome comes back as one answer.",
  },
  {
    question: "Which institutions already use this?",
    answer:
      "The University of New South Wales, the University of Melbourne and Melbourne Business School. All three are large, structurally complex institutions with many departments that have to act on the same request, which is exactly the environment where routing earns its place. A small single faculty college has the same problem in a form it can usually survive without software.",
  },
  {
    question: "Does this serve schools, higher education, or both?",
    answer:
      "The work to date has been with higher education, where the volume of applications, the multi department approval path and transcript delivery create the pressure this solves. The platform is not restricted to universities, but higher education is where it has been proven.",
  },
  {
    question: "How does this relate to Intelli Form and Intelli Assessment?",
    answer:
      "The education solution uses both. Intelli Form handles the complex, multi page data collection without custom code. Intelli Assessment runs the evaluation lifecycle from scoring rubrics through to automated outcomes. They are separate products that write to the same Dataverse model, which is why they combine without an integration.",
  },
  {
    question: "Can students pay for transcript delivery in the same flow?",
    answer:
      "Yes. Express and standard delivery rates are shown to the student and the transaction is completed on the page, so the request and the payment stay attached to each other rather than being reconciled later.",
  },
];

export default function EducationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            service({
              name: "Education CRM on Microsoft Power Platform",
              path: PATH,
              description:
                "An automated education CRM that routes student requests across administration, finance and academic records, with application intake, evaluation and transcript delivery in one system.",
              serviceType: "Education CRM and workflow automation",
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Education", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Education"
        trail={[
          { name: "Home", path: "/" },
          { name: "Education", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>One request.</span>
            </span>
            <span>
              <span>Every department.</span>
            </span>
            <span>
              <span>No waiting.</span>
            </span>
          </>
        }
        lead="A student request crosses admissions, finance and academic records, and in most institutions it crosses them one at a time. Days pass while it queues. Our education CRM routes the same request to every department that has to act at the same moment, and carries intake, evaluation and transcript delivery in the same system."
        secondaryCta={{ label: "See Intelli Assessment", key: "intelliAssessment" }}
        meta={{
          label: "Used by",
          items: [
            "UNSW",
            "University of Melbourne",
            "Melbourne Business School",
          ],
        }}
      />

      <ProofStrip
        tone="peach"
        stats={[
          {
            figure: "Three",
            label: "institutions running this today",
            detail:
              "each of them large enough that a request has to reach several departments at once",
          },
          {
            figure: "Seconds",
            label: "to route a request across departments",
            detail: "where the same request previously took days to move",
          },
          {
            figure: "Once",
            label: "is how often information is entered",
            detail:
              "documentation is uploaded a single time and reused everywhere it is needed",
          },
        ]}
      />

      {/* The routing figure */}
      <Band tone="canvas">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="From manual to routed"
                title="The same request, taking seconds instead of days"
                lead="Applicants used to come to campus for an assessment in person, communication happened by hand, and each issue was solved on its own as it moved from one desk to the next. The change is not that any single step became faster. It is that the steps stopped happening in a queue."
              />
            </Reveal>
            <Reveal delay={140} className="mt-12">
              <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule sm:p-10">
                <FigRequestRouting />
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      <Capabilities
        eyebrow="Capabilities"
        title="What the platform covers"
        items={capabilities}
        variant="ledger"
        tone="warm"
      />

      {/* Centralisation */}
      <Band tone="canvas">
        <Container>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Why a university in particular"
                title="Many organisations, one name above the door"
                lead="A university is a federation. Faculties, schools, research centres, a finance function and a records office all have their own systems, their own approvals and often their own view of who a student is. That is why the same request has to be re entered so often, and it is a problem a shared data layer is unusually well suited to."
              />
            </Reveal>

            <Reveal delay={140} className="mt-12">
              <div className="rounded-xl bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-8">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-o-700">
                  Named in this sector
                </p>
                <div className="mt-6">
                  <ClientGrid items={EDU_CLIENTS} maxColumns={2} />
                </div>
                <p className="mt-6 border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-muted">
                  The full list, across all five sectors we deliver in, is on the{" "}
                  <TextLink href={href("clients")}>clients page</TextLink>.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What registrars and IT directors ask first"
        items={faqs} tone="warm" />

      <RelatedPages
        title="The products behind the routing"
        items={[
          {
            key: "intelliForm",
            blurb:
              "Complex multi page application collection without custom code.",
          },
          {
            key: "intelliAssessment",
            blurb:
              "Scoring rubrics through to automated outcomes for admissions.",
          },
          {
            key: "governance",
            blurb:
              "Budgeting and KPI reporting for the institution behind the workflow.",
          },
        ]}
      />

      <ClosingCta
        title="Bring the student request that currently crosses three departments."
        lead="Trace it with us end to end: who touches it, what each of them waits for, and where the days actually go. That conversation tends to be more useful than a requirements workshop, because the delay is almost never where the institution assumes it is."
        primary={{ label: "Trace a request with us", key: "contact" }}
        secondary={{ label: "See who we work with", key: "clients" }}
      />
    </>
  );
}
