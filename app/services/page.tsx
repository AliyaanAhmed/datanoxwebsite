import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  Action,
  ArrowRight,
  Band,
  Card,
  Container,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { IconChip, type IconName } from "@/components/ui/icons";
import {
  ClosingCta,
  FaqSection,
  InsightPanel,
  PageHero,
  RelatedPages,
} from "@/components/page/blocks";
import { href, type RouteKey } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";
import { site } from "@/content/site";

const PATH = "/services/";

export const metadata: Metadata = pageMetadata({
  title: "Microsoft Business Applications Partner",
  description:
    "Dynamics 365 and Power Platform delivery from one engineering practice. Implementation, customisation, integration, AI and cloud migration.",
  path: PATH,
});

/**
 * The services hub.
 *
 * Until August 2026 this site had no services page at all, and the partners
 * page told visitors that Datanox builds products while partners deliver them.
 * That is not what the company does. Twenty five implementations and a thirty
 * five person delivery team were invisible to every search engine.
 *
 * All four service lines now have their own page. This hub still carries the
 * full argument for each of them rather than being a menu of links, because a
 * visitor who arrives here should be able to decide which line they need
 * without opening four tabs first.
 */

const LINES: {
  key: RouteKey | null;
  name: string;
  icon: IconName;
  lead: string;
  items: { title: string; body: string }[];
}[] = [
  {
    key: "servicesD365",
    name: "Dynamics 365",
    icon: "record",
    lead: "Out of the box implementation through to deep customisation, across the customer engagement suite.",
    items: [
      {
        title: "Sales and Customer Service",
        body: "Pipeline, forecasting and quoting on one side. Case management, service level agreements, entitlements and omnichannel routing on the other.",
      },
      {
        title: "Customer Insights and Contact Center",
        body: "Unified profiles and event based journeys, with voice and digital channels integrated into the service desk rather than beside it.",
      },
      {
        title: "Project Operations",
        body: "Lead through opportunity, order and into a live project with resourcing built in, all inside the system that originated the deal.",
      },
      {
        title: "Customisation and extension",
        body: "Plugins, custom APIs, JavaScript, Azure Functions and third party integration for the point where configuration reaches its limit.",
      },
    ],
  },
  {
    key: "servicesPowerPlatform",
    name: "Power Platform",
    icon: "layers",
    lead: "The platform our own products are built on, which is how we know where its limits are.",
    items: [
      {
        title: "Portals and applications",
        body: "Power Pages with real security models, model driven apps for data first work, canvas apps for task specific jobs, and code apps past the low code ceiling.",
      },
      {
        title: "Automation and data",
        body: "Power Automate approval chains and scheduled processing, over a Dataverse model designed to still be maintainable in three years.",
      },
      {
        title: "Reporting",
        body: "Power BI dashboards and embedded analytics reading the tables the work is recorded in, with no second copy to keep in step.",
      },
      {
        title: "Lifecycle and governance",
        body: "Solution management, environment strategy and deployment pipelines, so a change reaches production the same way every time.",
      },
    ],
  },
  {
    key: "servicesAi",
    name: "AI and Copilot",
    icon: "rules",
    lead: "Applied inside business applications, where the data and the process already live.",
    items: [
      {
        title: "Copilot Studio and Azure AI Foundry",
        body: "Agents grounded in Dataverse and your own knowledge sources, with model selection, orchestration and the evaluation step most projects skip.",
      },
      {
        title: "Document understanding",
        body: "Custom models trained on your own documents, presenting the extraction and a confidence level to the person who still makes the call.",
      },
      {
        title: "Governed by design",
        body: "Every output labelled as machine generated, approved by a person before it takes effect, and preserved in the audit trail.",
      },
    ],
  },
  {
    key: "servicesMigration",
    name: "Cloud migration",
    icon: "route",
    lead: "Moving Dynamics 365 and Power Platform estates from on premises infrastructure into the cloud.",
    items: [
      {
        title: "Assessment first",
        body: "Agents read the source environment and classify every entity, plugin, workflow, report and integration in it, so the roadmap is priced against an inventory rather than against a guess.",
      },
      {
        title: "On premises to online",
        body: "Customer Engagement estates still running on local infrastructure, moved onto Dataverse with the working knowledge already built into them preserved.",
      },
      {
        title: "What comes with it",
        body: "Environment strategy, data migration, remediation of plugins and workflows that assumed a local server, integration rework and a cutover plan.",
      },
    ],
  },
];

const FAQ = [
  {
    question: "Do you deliver projects, or only license products?",
    answer:
      "Both. Datanox runs a single engineering practice of roughly fifty people, thirty five of them in technical delivery as consultants, developers, architects and quality assurance specialists. That practice builds our own products and delivers client projects, which is why a project gets people who have shipped production software rather than a team assembled for the engagement.",
  },
  {
    question: "Do we have to buy a Datanox product to work with you?",
    answer:
      "No. Most delivery work involves no Datanox product at all. Implementation, customisation, integration and migration are bought on their own, and a client running standard Dynamics 365 is a completely normal engagement.",
  },
  {
    question: "Where does delivery happen, and in which time zone?",
    answer:
      "Delivery comes from one practice serving Australia, the United Arab Emirates, Saudi Arabia and the United States, with partner companies providing local presence in each region. Work is performed inside your Microsoft tenant, under your access controls and your logging.",
  },
  {
    question: "How is a project scoped and priced?",
    answer:
      "Projects start with a scoping engagement that produces a solution design, an environment strategy and a phased plan before any commitment to build. Pricing follows the shape of that plan rather than a rate card applied to a guess.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Services", path: PATH },
            ]),
            service({
              name: "Dynamics 365 and Power Platform delivery",
              path: PATH,
              description:
                "Implementation, customisation, integration, AI and cloud migration across Microsoft Dynamics 365 and Power Platform.",
              serviceType: "Microsoft business applications consulting",
              areaServed: [...site.regions],
            }),
            faqPage(PATH, FAQ),
          ),
        }}
      />

      <PageHero
        eyebrow="Services"
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Microsoft business</span>
            </span>
            <span>
              <span>applications, designed</span>
            </span>
            <span>
              <span>and delivered.</span>
            </span>
          </>
        }
        lead="Dynamics 365 and Power Platform, from first workshop to live system and the support that follows. The same practice that builds our own products does the delivery work, so the people on your project have shipped software that other organisations depend on."
        primaryCta={{ label: "Talk to the delivery team", key: "contact" }}
        secondaryCta={{ label: "See who we place", key: "staffAug" }}
        meta={{
          label: "Covering",
          items: ["Dynamics 365", "Power Platform", "AI and Copilot", "Cloud migration"],
        }}
      />

      {/* ---------------------------------------------------------------
          Three ways to buy. This is the structure of the business, and
          until now the site showed only one of the three.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="models">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="How Datanox works"
                title="One Microsoft foundation. Three ways to buy."
                lead="Every engagement draws on the same delivery practice, the same standards and the same people. What changes is what you are buying."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {[
                {
                  label: "Products",
                  summary: "Software we own and license",
                  body: "Five products built on Power Platform and shaped by real deployments. Each one is bought on its own.",
                  link: { label: "See the products", key: "governance" as const },
                  current: false,
                },
                {
                  label: "Platform services",
                  summary: "Projects we design and deliver",
                  body: "Dynamics 365, Power Platform, AI and Copilot, and cloud migration. Implementation through to support.",
                  link: null,
                  current: true,
                },
                {
                  label: "People",
                  summary: "Our team inside yours",
                  body: "Senior consultants from the same delivery team, working your week, in your tenant, to your cadence.",
                  link: { label: "Staff augmentation", key: "staffAug" as const },
                  current: false,
                },
              ].map((model, index) => (
                <Reveal key={model.label} delay={index * 90}>
                  <Card
                    className={`h-full p-7 lg:p-8 ${
                      model.current ? "bg-gradient-to-br from-o-50 to-peach ring-o-200" : ""
                    }`}
                  >
                    {model.current ? (
                      <span className="mb-4 inline-flex rounded-pill bg-ink px-3 py-1 font-mono text-[0.75rem] tracking-[0.02em] text-o-100">
                        This page
                      </span>
                    ) : null}
                    <h3 className="font-display text-[1.375rem] font-semibold text-ink">
                      {model.label}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] text-muted">{model.summary}</p>
                    <p className="mt-5 border-t border-rule pt-5 text-[0.9375rem] leading-relaxed text-body">
                      {model.body}
                    </p>
                    {model.link ? (
                      <p className="mt-5">
                        <TextLink href={href(model.link.key)}>
                          {model.link.label}
                          <ArrowRight />
                        </TextLink>
                      </p>
                    ) : null}
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The four lines, written out rather than listed. Each becomes its
          own page in a later batch.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="lines">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="What we deliver"
                title="Four practice areas, one team"
                lead="Not four vendors coordinated by a project manager. The architect who designs your data model is in the same practice as the developer who writes the plugin."
              />
            </Reveal>

            <div className="mt-14 flex flex-col gap-14">
              {LINES.map((line, index) => (
                <Reveal key={line.name} delay={index * 60}>
                  <div
                    data-interactive-card=""
                    data-rich-card=""
                    className="grid gap-8 rounded-xl border border-rule bg-surface p-6 shadow-[var(--shadow-soft)] lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-14 lg:p-8"
                  >
                    <div>
                      <IconChip name={line.icon} data-card-float="" />
                      <h3 data-card-float="" className="mt-5 font-display text-[1.625rem] font-semibold leading-tight text-ink">
                        {line.name}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                        {line.lead}
                      </p>
                    </div>

                    <div>
                      <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                        {line.items.map((item) => (
                          <div key={item.title}>
                            <dt className="font-display text-[1.0625rem] font-semibold text-ink">
                              {item.title}
                            </dt>
                            <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-body">
                              {item.body}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      {line.key ? (
                        <p className="mt-7 border-t border-rule pt-6">
                          <TextLink href={href(line.key)}>
                            Open {line.name}
                            <ArrowRight />
                          </TextLink>
                        </p>
                      ) : (
                        <p className="mt-7 border-t border-rule pt-6 text-[0.875rem] text-muted">
                          A page of its own is being written for this one. Ask us
                          in the meantime and you will get the detail directly.
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The ERP argument, taken from the Governance white paper. It is the
          sharpest thing Datanox says about where its work sits, and it was
          nowhere on the site.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="layer">
        <Container>
          <div className="py-band">
            <Reveal from="scale">
              <InsightPanel
                eyebrow="Where this sits"
                title={
                  <>
                    An ERP governs the transaction. We build the layer that
                    governs the decision.
                  </>
                }
                icon="layers"
                titleClassName="text-d3"
                side={
                  <div className="rounded-lg border border-o-100 bg-gradient-to-br from-white to-o-50 p-5 shadow-[var(--shadow-soft)]">
                    <div className="grid gap-3">
                      {["Transaction", "Decision", "Result"].map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-surface px-4 py-3 font-display text-[1rem] font-semibold text-ink shadow-[0_10px_24px_rgba(122,62,12,0.08)] ring-1 ring-o-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <Action href={href("governance")} variant="ghost" className="mt-6">
                      See that as a product
                      <ArrowRight />
                    </Action>
                  </div>
                }
              >
                <p>
                  Enterprise resource planning systems are very good at
                  recording what happened: invoices, ledgers, payments, records.
                  They are poor at connecting those transactions to the decisions
                  that caused them, which is why the question a leader most
                  wants answered, whether the spending achieved anything, takes
                  weeks. None of our work replaces a core system. It sits above
                  one, and gives the organisation a governed line between the
                  decision and the result.
                </p>
              </InsightPanel>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What organisations ask before scoping a project"
        items={FAQ}
      />

      <RelatedPages
        title="If a project is not the shape you need"
        items={[
          {
            key: "staffAug",
            blurb:
              "When the work is ongoing and you would rather grow your own team than hand a project over.",
          },
          {
            key: "partners",
            blurb:
              "The four companies giving this practice local presence in your market.",
          },
          {
            key: "clients",
            blurb:
              "The organisations this practice has delivered for, grouped by sector.",
          },
        ]}
      />

      <ClosingCta
        title="Start with the system you already have."
        lead="Bring the Dynamics 365 or Power Platform estate you are running now, whatever state it is in, and we will tell you what we would change first and what we would leave alone."
        primary={{ label: "Talk to the delivery team", key: "contact" }}
        secondary={{ label: "Read a white paper", key: "resources" }}
      />
    </>
  );
}
