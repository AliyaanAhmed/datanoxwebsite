import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  Band,
  Container,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { IconChip, type IconName } from "@/components/ui/icons";
import { FigDynamicsHero } from "@/components/figures/hero-visuals";
import { ClientStrip } from "@/components/page/logo-wall";
import {
  ClosingCta,
  FaqSection,
  InsightPanel,
  PageHero,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { Capabilities } from "@/components/page/capabilities";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";
import { site } from "@/content/site";

const PATH = "/services/dynamics-365/";

export const metadata: Metadata = pageMetadata({
  title: "Dynamics 365 Implementation Partner",
  description:
    "Sales, Customer Service, Customer Insights, Contact Center and Project Operations. Configuration through to plugins, custom APIs and third party integration.",
  path: PATH,
});

/**
 * Dynamics 365 delivery.
 *
 * Written from the capability slides in the company profile. The distinguishing
 * claim on this page is not breadth, because every partner claims breadth. It
 * is that configuration and pro code sit in the same team, so a requirement
 * that outgrows the product does not become a second procurement.
 */

const MODULES: {
  name: string;
  body: string;
  detail: string;
  icon: IconName;
}[] = [
  {
    name: "Sales",
    body: "Pipeline, forecasting, quoting and territory management. Most engagements start in configuration and end somewhere in custom business logic, because a real sales process rarely matches the out of the box one for long.",
    detail: "Pipeline to quote",
    icon: "chart",
  },
  {
    name: "Customer Service",
    body: "Case management, service level agreements, entitlements, knowledge and omnichannel routing. The work that matters is usually the routing rules and the entitlement model rather than the case form.",
    detail: "Case to resolution",
    icon: "route",
  },
  {
    name: "Customer Insights, Data",
    body: "Unified customer profiles built from the systems the data actually sits in, with ingestion, matching and enrichment. A single view is a data engineering job before it is a licensing decision.",
    detail: "One profile, many sources",
    icon: "database",
  },
  {
    name: "Customer Insights, Journeys",
    body: "Real time and outbound journeys, segmentation, triggers and event based orchestration, so a customer action in the system of record can start a journey rather than wait for the next campaign.",
    detail: "Triggered, not scheduled",
    icon: "send",
  },
  {
    name: "Contact Center",
    body: "Voice and digital channel deployment integrated with the service desk rather than bolted beside it, so an agent sees the same record whichever channel the customer used.",
    detail: "One record, every channel",
    icon: "remote",
  },
  {
    name: "Project Operations",
    body: "Resource management and scheduling inside the same system that originated the deal, so delivery teams are staffed and tracked against the opportunity that created the work.",
    detail: "Deal to delivery",
    icon: "plan",
  },
  {
    name: "Customisation and extension",
    body: "Plugins, custom APIs, JavaScript, Azure Functions and third party integration for the point where configuration reaches its limit. Same team, same engagement, no second procurement.",
    detail: "Past the configuration ceiling",
    icon: "api",
  },
  {
    name: "Data and platform migration",
    body: "Years of history moved from a legacy platform without losing a record, including the reference data and the relationships that make the history worth keeping.",
    detail: "History intact",
    icon: "record",
  },
];

/** A real delivered chain, from the company profile, not a generic diagram. */
const PROJECT_OPS = [
  {
    step: "01",
    name: "Lead capture",
    body: "Every inbound and outbound lead is captured and qualified in the CRM, giving one source of truth from the first touch.",
  },
  {
    step: "02",
    name: "Opportunity management",
    body: "Qualified leads convert into tracked opportunities with visibility into stage, value and probability.",
  },
  {
    step: "03",
    name: "Order conversion",
    body: "Won opportunities convert into orders, keeping commercial terms and scope connected to the original deal with no manual re entry.",
  },
  {
    step: "04",
    name: "Project operations",
    body: "Orders convert into live projects with resource management and scheduling built in, staffed and tracked against the system that originated the deal.",
  },
];

const faqs: Faq[] = [
  {
    question: "Do you do implementations, or only customisation on an existing system?",
    answer:
      "Both, and the split is roughly even. Some engagements are a first Dynamics 365 deployment. Others are an estate somebody else implemented that has grown past what its original design assumed. The second kind usually starts with a review of the data model and the security roles before anybody touches a form.",
  },
  {
    question: "Where does configuration stop and code start?",
    answer:
      "Later than most people expect, and we push it as late as we can, because configuration survives an upgrade and code has to be maintained. When a requirement genuinely needs a plugin, a custom API or an Azure Function, the same team writes it inside the same engagement. You do not go back to procurement for a developer.",
  },
  {
    question: "Can you work alongside our internal team?",
    answer:
      "Yes, and it is common. Some clients want a scoped project delivered and handed over. Others want our people embedded in their delivery team for a period, which is a different commercial arrangement covered on the staff augmentation page.",
  },
  {
    question: "What about licensing?",
    answer:
      "Licences are bought from Microsoft or a licensing partner, not from us. We will tell you which licence types your design actually needs and where a cheaper one covers the requirement, because getting that wrong is a recurring cost rather than a one off.",
  },
  {
    question: "How long does an implementation take?",
    answer:
      "It depends entirely on how much of the process is already agreed. A first deployment against a settled process is measured in weeks. A deployment that has to resolve how the business wants to work is measured in months, and most of that time is not technical. We scope before quoting for exactly that reason.",
  },
];

export default function DynamicsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            service({
              name: "Dynamics 365 implementation and customisation",
              path: PATH,
              description:
                "Implementation, configuration, customisation and integration across Dynamics 365 Sales, Customer Service, Customer Insights, Contact Center and Project Operations.",
              serviceType: "Dynamics 365 consulting",
              areaServed: [...site.regions],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Services", path: href("services") },
              { name: "Dynamics 365", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Services, Dynamics 365"
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: href("services") },
          { name: "Dynamics 365", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Configured, extended,</span>
            </span>
            <span>
              <span>and made to fit the</span>
            </span>
            <span>
              <span>way you work.</span>
            </span>
          </>
        }
        lead="Out of the box implementation through to deep customisation, across the customer engagement suite. Configuration and pro code sit in the same team, so a requirement that outgrows the product does not turn into a second procurement and a second vendor."
        primaryCta={{ label: "Scope an implementation", key: "contact" }}
        secondaryCta={{ label: "The whole practice", key: "services" }}
        meta={{
          label: "Across",
          items: ["Sales", "Customer Service", "Customer Insights", "Project Operations"],
        }}
        figure={<FigDynamicsHero />}
      />

      <ClientStrip tone="warm" />

      <Capabilities
        eyebrow="Coverage"
        title="Where the work concentrates inside the suite"
        lead="Eight areas, and the boundary between the first six and the seventh is the one that decides whether a project stalls."
        items={MODULES}
        variant="ledger"
        tone="canvas"
      />

      {/* ---------------------------------------------------------------
          A chain we have actually shipped, rather than a generic diagram.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="chain">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Worked example"
                title="First lead to live project, without leaving the system"
                lead="A Dynamics 365 Project Operations implementation delivered for consulting and service providers. Four conversions, no manual re entry between any of them, and the delivery team staffed against the opportunity that created the work."
              />
            </Reveal>

            <ol className="mt-12 grid gap-5 lg:grid-cols-4">
              {PROJECT_OPS.map((item, index) => (
                <Reveal as="li" key={item.step} delay={index * 90}>
                  <div
                    data-interactive-card=""
                    data-rich-card=""
                    className="flex h-full flex-col rounded-xl bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule lg:p-7"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-o-500 to-o-700 font-mono text-[0.75rem] font-medium text-white">
                      {index + 1}
                    </span>
                    <h3 data-card-float="" className="mt-5 font-display text-[1.125rem] font-semibold leading-snug text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The one thing worth saying about integration.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="integration">
        <Container>
          <div className="py-band">
            <Reveal from="scale">
              <InsightPanel
                eyebrow="Integration"
                title={
                  <>
                    A customer engagement platform is only as good as what it
                    can reach.
                  </>
                }
                icon="link"
                titleClassName="text-d3"
                side={
                  <div className="flex flex-wrap gap-3 rounded-lg border border-o-100 bg-gradient-to-br from-white to-o-50 p-5 shadow-[var(--shadow-soft)]">
                    {[
                      "Integration bus and message queue",
                      "Electronic signature",
                      "Identity and access",
                      "Legacy platform migration",
                      "Custom APIs",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-pill bg-surface px-4 py-2 text-[0.875rem] font-medium text-o-800 shadow-[0_10px_24px_rgba(122,62,12,0.08)] ring-1 ring-o-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                }
              >
                <p>
                  One of our automotive finance engagements connected Dynamics
                  365 to more than ten surrounding systems, from an integration
                  bus to electronic signature and identity, and moved years of
                  lending history off a legacy platform without losing a record.
                  The result was a process that runs start to finish inside the
                  platform, calling out to every system it needs and coming back
                  with an answer, with no person in the middle carrying data
                  between screens.
                </p>
              </InsightPanel>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What comes up before a Dynamics 365 engagement starts"
        items={faqs}
        tone="warm"
      />

      <RelatedPages
        title="Around this engagement"
        items={[
          {
            key: "servicesPowerPlatform",
            blurb:
              "Portals, apps, automation and reporting on the platform underneath Dynamics 365.",
          },
          {
            key: "servicesAi",
            blurb:
              "Copilot and agents applied inside the process rather than beside it.",
          },
          {
            key: "servicesMigration",
            blurb:
              "Moving an on premise Dynamics estate onto this, with the inventory done first.",
          },
        ]}
      />

      <ClosingCta
        title="Show us the process, not the requirements list."
        lead="Walk us through how a deal, a case or a claim actually moves through your organisation today, including the parts that happen outside the system. That conversation tells us more in an hour than a specification does in a fortnight."
        primary={{ label: "Scope an implementation", key: "contact" }}
        secondary={{ label: "See the whole practice", key: "services" }}
      />
    </>
  );
}
