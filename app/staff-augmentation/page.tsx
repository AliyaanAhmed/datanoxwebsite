import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Band,
  Container,
  Eyebrow,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { IconChip, type IconName } from "@/components/ui/icons";
import { ClosingCta, FaqSection, PageHero, RelatedPages } from "@/components/page/blocks";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";
import { site } from "@/content/site";

const PATH = "/staff-augmentation/";

export const metadata: Metadata = pageMetadata({
  title: "Power Platform and Dynamics 365 Staff Augmentation",
  description:
    "Senior Power Platform and Dynamics 365 consultants placed inside your delivery team, drawn from our own practice rather than recruited to fill a requirement.",
  path: PATH,
});

/**
 * Staff augmentation.
 *
 * Zero occurrences of this phrase existed anywhere in the site before August
 * 2026, despite eight resources placed, forty eight resource months delivered
 * and three of five engagements extended beyond their original term.
 *
 * The argument here is the one from the company profile, and it is a good
 * one: you are not hiring a contractor, you are borrowing a practice. The
 * full roles table gets its own page in a later batch.
 */

const DIFFERENCE: { title: string; body: string; icon: IconName }[] = [
  {
    title: "A practice, not a placement",
    body: "When your developer hits a hard Dataverse, Power Pages or integration problem, they escalate inside our team rather than stalling. Solution architect capability sits behind every resource we place.",
    icon: "layers",
  },
  {
    title: "From our delivery team",
    body: "We place people who already work on our projects, not candidates recruited to fill your requirement. They arrive with delivery habits, standards and product knowledge already formed.",
    icon: "people",
  },
  {
    title: "Practised on complex work",
    body: "The same people have delivered multi entity government governance, member platforms at scale and enterprise integration, rather than configuration work alone.",
    icon: "route",
  },
  {
    title: "Aligned to your week",
    body: "Resources work your calendar, not ours. Against a Gulf working week that means a two hour offset and a full shared working day, with stand up inside your morning.",
    icon: "clock",
  },
  {
    title: "Inside your environment",
    body: "Work happens in your Microsoft tenant, under your conditional access, your security roles and your audit logging. Your data stays in your environment.",
    icon: "shield",
  },
  {
    title: "Scales without recontracting",
    body: "Start with one, add more as scope grows, reduce when it does not. The commercial arrangement flexes with the work instead of locking a headcount.",
    icon: "variety",
  },
];

const ROLES: { role: string; level: string; scope: string }[] = [
  {
    role: "Developer and consultant",
    level: "Senior and mid",
    scope:
      "Power Pages, model driven and canvas apps, Dataverse, Power Automate and custom plugins. Requirements, configuration, business process design and stakeholder workshops.",
  },
  {
    role: "Solution architect",
    level: "Senior",
    scope:
      "Solution design, data modelling, security architecture, application lifecycle management and environment strategy.",
  },
  {
    role: "Dynamics 365 functional consultant",
    level: "Senior and mid",
    scope: "Sales and Customer Service configuration, process design and user enablement.",
  },
  {
    role: "Integration developer",
    level: "Senior and mid",
    scope: "C sharp plugins, custom APIs, Azure Functions and third party system integration.",
  },
  {
    role: "Power BI and data analyst",
    level: "Senior and mid",
    scope: "Dataset modelling, executive dashboards and embedded analytics.",
  },
  {
    role: "Copilot and AI engineer",
    level: "Senior and mid",
    scope: "Copilot Studio agents and Azure AI Foundry workloads inside business applications.",
  },
  {
    role: "Quality assurance and test analyst",
    level: "Senior and mid",
    scope: "Functional, regression and user acceptance testing across Power Platform and Dynamics 365.",
  },
  {
    role: "DevOps engineer",
    level: "Senior and mid",
    scope: "Deployment pipelines, cloud infrastructure and reliable release workflow.",
  },
  {
    role: "Business analyst",
    level: "Senior and mid",
    scope:
      "Requirements and process work with domain background in banking, capital markets, insurance and the public sector.",
  },
  {
    role: "Scrum master, project or delivery manager",
    level: "Senior",
    scope: "Agile execution, sprint planning and cross functional delivery.",
  },
];

const TIMELINE: { when: string; title: string; body: string }[] = [
  {
    when: "Week 0",
    title: "Role definition",
    body: "We agree the skills, seniority, duration and success measures for the role with your delivery lead.",
  },
  {
    when: "Week 1",
    title: "Profiles and interviews",
    body: "You receive a shortlist from our delivery team and interview them directly. You choose.",
  },
  {
    when: "Week 2",
    title: "Onboarding",
    body: "Access to your tenant, tooling and repositories. Context handover from your team, documented on our side.",
  },
  {
    when: "Weeks 2 to 3",
    title: "Ramp",
    body: "The resource is paired with one of our architects while they learn your environment, and delivers first work items.",
  },
  {
    when: "Ongoing",
    title: "Steady state",
    body: "Daily stand up on your calendar, delivery to your sprint cadence, monthly review against the agreed measures.",
  },
  {
    when: "As needed",
    title: "Scale or hand over",
    body: "Add resources as scope grows, or hand over with documentation when the engagement closes.",
  },
];

const FAQ = [
  {
    question: "How is this different from hiring a contractor?",
    answer:
      "A contractor is one person and one set of knowledge. Everyone we place stays inside our engineering practice, so when they hit a hard architecture or integration problem it escalates to our architects rather than becoming your delay. You are borrowing the practice, not renting an individual.",
  },
  {
    question: "Do you run a bench?",
    answer:
      "No. Every resource comes out of our own delivery team, which caps how many we can place and raises the floor on who we place. Eight resources placed and forty eight resource months delivered so far, with three of five engagements extended beyond their original term.",
  },
  {
    question: "Whose systems and tools do they work in?",
    answer:
      "Yours. Work is performed inside your Microsoft tenant, under your conditional access, your security roles and your audit logging. Teams for daily contact, your ticketing system for work items, your repositories for code. We work inside your tooling rather than asking you to switch to ours.",
  },
  {
    question: "What is the minimum engagement?",
    answer:
      "Engagements have run from six months to three years, with one to five resources at a time. Shorter than six months usually means a scoped project is the better shape, and we will say so.",
  },
  {
    question: "How do you handle time zone overlap?",
    answer:
      "Resources assigned to an engagement work your week rather than ours, including a Sunday to Thursday week where that is what the client runs. Against the Gulf we are two hours apart, which is a full shared working day rather than a handover window.",
  },
];

export default function StaffAugmentationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Staff Augmentation", path: PATH },
            ]),
            service({
              name: "Power Platform and Dynamics 365 staff augmentation",
              path: PATH,
              description:
                "Senior Microsoft business applications consultants placed inside a client delivery team, drawn from the Datanox engineering practice.",
              serviceType: "IT staff augmentation",
              areaServed: [...site.regions],
            }),
            faqPage(PATH, FAQ),
          ),
        }}
      />

      <PageHero
        eyebrow="Staff augmentation"
        trail={[
          { name: "Home", path: "/" },
          { name: "Staff Augmentation", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>You are not hiring</span>
            </span>
            <span>
              <span>a contractor. You are</span>
            </span>
            <span>
              <span>borrowing a practice.</span>
            </span>
          </>
        }
        lead="Senior Power Platform and Dynamics 365 people, placed inside your team for six months to three years. The resource sits in your team. The practice behind them stays ours, and comes with them."
        primaryCta={{ label: "Define a role", key: "contact" }}
        secondaryCta={{ label: "See the delivery practice", key: "services" }}
        meta={{
          label: "Placed into",
          items: ["Energy", "Government", "Financial services"],
        }}
      />

      {/* ---------------------------------------------------------------
          The difference. Six panels on ink, which no other page uses, so
          this section does not read as the usual three card grid.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="difference">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="The difference"
                title="What a placement from a delivery team gives you"
                lead="Six things that are true of every resource we place, and that a recruiter cannot offer because there is no practice standing behind the person."
              />
            </Reveal>

            <div className="mt-12 grid overflow-hidden rounded-xl ring-1 ring-rule sm:grid-cols-2 lg:grid-cols-3">
              {DIFFERENCE.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 70}
                  className="border-b border-rule bg-surface p-7 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0 lg:p-8"
                >
                  <IconChip name={item.icon} size="sm" />
                  <h3 className="mt-5 font-display text-[1.125rem] font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          Roles, as a real table. Nothing else on the site is a table, which
          is the point.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="roles">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="What we place"
                title="Individually, or as a small pod"
                lead="Seniority and mix are set by your requirement rather than by whoever happens to be free."
              />
            </Reveal>

            <Reveal delay={120} className="mt-12 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-soft)] ring-1 ring-rule">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Roles Datanox places, with seniority and scope
                </caption>
                <thead>
                  <tr className="border-b border-rule bg-warm-1">
                    <th
                      scope="col"
                      className="px-6 py-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted lg:px-8"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="hidden px-6 py-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted sm:table-cell lg:px-8"
                    >
                      Level
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted lg:px-8"
                    >
                      Scope
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROLES.map((row) => (
                    <tr key={row.role} className="border-b border-rule last:border-b-0">
                      <th
                        scope="row"
                        className="px-6 py-5 align-top font-display text-[0.9375rem] font-semibold text-ink lg:px-8"
                      >
                        {row.role}
                      </th>
                      <td className="hidden whitespace-nowrap px-6 py-5 align-top text-[0.875rem] text-o-700 sm:table-cell lg:px-8">
                        {row.level}
                      </td>
                      <td className="px-6 py-5 align-top text-[0.9375rem] leading-relaxed text-body lg:px-8">
                        {row.scope}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The engagement timeline.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="timeline">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Process"
                title="From requirement to productive resource, inside three weeks"
              />
            </Reveal>

            <ol className="mt-12 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {TIMELINE.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 70}>
                  <div className="h-1 w-full rounded-pill bg-gradient-to-r from-o-600 to-o-400" />
                  <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-o-700">
                    {step.when}
                  </p>
                  <h3 className="mt-2 font-display text-[1.125rem] font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          Working model, as a single wide statement rather than more cards.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="model">
        <Container>
          <div className="py-band">
            <Reveal>
              <Eyebrow>Working model</Eyebrow>
            </Reveal>
            <Reveal delay={90} className="mt-6">
              <h2 className="measure-tight text-d3">
                Built around your calendar, your environment and your reporting
                rhythm.
              </h2>
            </Reveal>
            <Reveal delay={180} className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
              {[
                {
                  title: "Cadence",
                  body: "Daily stand up, delivery against your sprint cycle, and a monthly written report covering progress, risks and utilisation.",
                },
                {
                  title: "Escalation",
                  body: "Technical escalation runs into our practice, our architects and our product engineers, rather than stopping at the individual.",
                },
                {
                  title: "Communication",
                  body: "Teams for daily contact, your ticketing system for work items, your repositories for code.",
                },
                {
                  title: "Scaling",
                  body: "Resources are added or reduced as scope changes, drawn from the same delivery team.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="font-display text-[1.0625rem] font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-body">
                    {item.body}
                  </p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={260} className="mt-9">
              <TextLink href={href("services")}>
                If the work is a project rather than a role, start here
                <ArrowRight />
              </TextLink>
            </Reveal>
          </div>
        </Container>
      </Band>

      <RelatedPages
        title="The rest of the practice"
        items={[
          {
            key: "services",
            blurb:
              "Scoped delivery, when the work has a shape and an end rather than an ongoing role.",
          },
          {
            key: "servicesMigration",
            blurb:
              "A migration is the engagement most often staffed this way, because it has a defined end.",
          },
          {
            key: "contact",
            blurb: "A forty five minute call to define the role, the seniority and the term.",
          },
        ]}
      />

      <FaqSection
        eyebrow="Answers"
        title="What delivery leads ask before defining a role"
        items={FAQ}
        tone="warm"
      />

      <ClosingCta
        title="Tell us the role, not the CV you want."
        lead="Describe the work that is not getting done and the seniority it needs. We come back with profiles from our delivery team for you to interview directly, and you choose."
        primary={{ label: "Define a role", key: "contact" }}
        secondary={{ label: "See what we deliver", key: "services" }}
      />
    </>
  );
}
