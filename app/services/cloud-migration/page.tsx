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
import { Capabilities } from "@/components/page/capabilities";
import {
  ClosingCta,
  FaqSection,
  InsightPanel,
  PageHero,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { FigMigrationPath } from "@/components/figures/migration-path";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";
import { site } from "@/content/site";

const PATH = "/services/cloud-migration/";

export const metadata: Metadata = pageMetadata({
  title: "On Premise to Cloud Migration for Dynamics 365",
  description:
    "Moving Dynamics CRM and legacy applications to the cloud, with agents reading the estate first so the roadmap is priced against an inventory, not a guess.",
  path: PATH,
});

/**
 * On premise to cloud migration.
 *
 * Added August 2026 on the client's instruction. Datanox has delivered
 * multiple migrations in the Australian market, none of which can be named
 * under the confidentiality terms of those engagements, so this page carries
 * no client names at all and makes its argument from method instead.
 *
 * The commercially distinctive claim is the assessment: agents read the
 * existing customisation layer and produce the inventory, which is the phase
 * that traditionally takes weeks of consultant time and produces the estimate
 * everybody later discovers was wrong.
 */

const WHAT_MOVES: { name: string; body: string; detail: string; icon: IconName }[] = [
  {
    name: "Dynamics CRM on premise",
    body: "On premise Dynamics CRM and early Dynamics 365 deployments moved to Dynamics 365 online, with the customisation layer assessed rather than assumed. This is the largest single category of the work.",
    detail: "To Dynamics 365 online",
    icon: "database",
  },
  {
    name: "Power Platform on premise gateways",
    body: "Estates that reach back into on premise data through gateways, where the intent was cloud but half the dependencies never left the server room. Usually a data platform decision rather than an application one.",
    detail: "Off the gateway",
    icon: "layers",
  },
  {
    name: "Legacy line of business applications",
    body: "Access databases, bespoke web applications, and the departmental system somebody built fifteen years ago that the organisation cannot switch off because four processes still depend on it.",
    detail: "Rebuilt, not lifted",
    icon: "error",
  },
  {
    name: "SharePoint and workflow estates",
    body: "Classic SharePoint workflows and InfoPath forms, where the platform has moved on and the process has not. These migrate to Power Automate and Power Pages rather than to a newer version of the same thing.",
    detail: "To Power Automate",
    icon: "rules",
  },
  {
    name: "Reporting and integration",
    body: "Server hosted reports, scheduled jobs and point to point integrations rewritten as Power BI datasets, cloud flows and supported connectors, which is where most of the ongoing running cost disappears.",
    detail: "To Power BI and cloud flows",
    icon: "chart",
  },
  {
    name: "Custom portals",
    body: "Bespoke public facing portals and their separate identity systems, rebuilt on Power Pages or as code apps in a single page application style, sharing the same Dataverse and the same sign in as everything else.",
    detail: "To Power Pages or code apps",
    icon: "portal",
  },
];

/** The four phases. Assessment is the one that has actually changed. */
const PHASES = [
  {
    n: "01",
    title: "Assessment, run by agents",
    body: "Agents read the existing environment: entities, fields, forms, views, plugins, workflows, client script, reports, integrations and security roles. What comes out is an inventory with every item classified as supported, deprecated, unused or needing a rewrite. This is the phase that traditionally consumed several weeks of consultant time and still missed things.",
    aside: "Days rather than weeks, and complete rather than sampled.",
  },
  {
    n: "02",
    title: "Roadmap and the honest conversation",
    body: "The inventory turns into a sequence, and into a set of decisions. What moves as it is, what gets rebuilt on the platform properly, what is quietly switched off because nobody has used it in two years. The switch off list is the uncomfortable one and it is usually the most valuable.",
    aside: "Every migration we have run has found features nobody uses.",
  },
  {
    n: "03",
    title: "Build, migrate and run in parallel",
    body: "The target environment is built and the data moves in rehearsed passes, each one reconciled against the source before the next. Both systems run together for a defined period so that a discrepancy is found by a test rather than by a customer.",
    aside: "Nobody should discover a data problem on the Monday after cutover.",
  },
  {
    n: "04",
    title: "Cutover and the weeks after",
    body: "A cutover with a rehearsed sequence, a named decision point and a documented way back. Then hypercare, because the fortnight after go live is when the requirements nobody mentioned during discovery finally surface.",
    aside: "The rollback plan is written even when it is never used.",
  },
];

/** Why a migration is the cheapest moment to change a process. */
const REDESIGN = [
  {
    t: "The process was shaped by the old tool",
    b: "A great deal of what looks like policy turns out to be a workaround for something the previous system could not do. Carrying it forward preserves a constraint that no longer exists.",
  },
  {
    t: "Rebuilding is often cheaper than porting",
    b: "A heavily customised entity with eleven plugins is usually faster to rebuild against a clean model than to translate line by line, and the result is maintainable afterwards rather than being the same debt on newer infrastructure.",
  },
  {
    t: "The users are already accepting change",
    b: "Change management is being paid for once either way. Spending it on a better process rather than on a visually different version of the old one is the same money for a materially better outcome.",
  },
  {
    t: "Interfaces can finally be built properly",
    b: "Where a screen genuinely needs to be an application rather than a form, code apps and single page application style Power Pages let it be one without leaving the platform, its identity or its governance.",
  },
];

const faqs: Faq[] = [
  {
    question: "Can you name the migrations you have delivered?",
    answer:
      "No. The migration engagements are in the Australian market and are covered by confidentiality terms that do not permit naming the organisations involved. We will not stretch a permission that was not given. What we can do in a conversation is describe the shape of comparable estates and the specific problems they turned up.",
  },
  {
    question: "What exactly do the agents do during assessment?",
    answer:
      "They read the source environment and produce the inventory: every entity, field, form, view, workflow, plugin, script, report, integration and security role, each classified as supported on the target, deprecated, unused or requiring a rewrite. A person reviews and signs off the classification. The agents remove the transcription work, not the judgement.",
  },
  {
    question: "Is this a lift and shift?",
    answer:
      "Only where lifting is the right answer, which is less often than people expect. A customisation layer built against an older platform frequently costs more to translate than to rebuild, and rebuilding leaves you with something maintainable. We publish that recommendation item by item rather than as a single position on the whole estate.",
  },
  {
    question: "How long does a migration take?",
    answer:
      "Assessment is days rather than weeks. Everything after that depends on what the assessment found, and any partner quoting a duration before seeing an inventory is guessing. The pattern we argue for is a first workload live early, followed by the remainder in sequence, rather than one large cutover at the end of a year.",
  },
  {
    question: "What happens to our historical data?",
    answer:
      "It migrates, and it is reconciled at each rehearsal pass rather than at the end. Where data is genuinely not worth carrying, which is common with audit tables and staging entities, we say so and it stays in a read only archive rather than being loaded into a system it will slow down for a decade.",
  },
  {
    question: "Can our own team run it afterwards?",
    answer:
      "That is the intended outcome. Environment strategy, solution boundaries, deployment pipelines and documentation are delivered with the system. If you would rather we kept running it, that is a support arrangement, not a dependency we design in.",
  },
];

export default function CloudMigrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            service({
              name: "On premise to cloud migration for Dynamics 365 and Power Platform",
              path: PATH,
              description:
                "Assessment, roadmap, rebuild and cutover for on premise Dynamics CRM, legacy line of business applications, SharePoint workflow estates and custom portals moving to Dynamics 365 and Power Platform.",
              serviceType: "Cloud migration consulting",
              areaServed: [...site.regions],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Services", path: href("services") },
              { name: "Cloud Migration", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Services, cloud migration"
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: href("services") },
          { name: "Cloud Migration", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Know what is</span>
            </span>
            <span>
              <span>in the estate</span>
            </span>
            <span>
              <span>before it moves.</span>
            </span>
          </>
        }
        lead="Most migration proposals are priced against an estimate of the customisation layer, and most of those estimates are wrong. We start by reading the whole estate with agents and producing a classified inventory, so the roadmap is built on what is actually there rather than on what anybody remembers building."
        figure={<FigMigrationPath />}
        primaryCta={{ label: "Start with an assessment", key: "contact" }}
        secondaryCta={{ label: "The whole practice", key: "services" }}
        meta={{
          label: "Moving from",
          items: ["Dynamics CRM on premise", "Legacy applications", "SharePoint workflows"],
        }}
      />

      {/* ---------------------------------------------------------------
          The confidentiality position, stated immediately rather than
          discovered later when somebody asks for references.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="nda">
        <Container>
          <div className="py-band">
            <Reveal from="scale">
              <InsightPanel
                eyebrow="A note on references"
                title={
                  <>
                    We cannot name the organisations, and we will not pretend
                    otherwise.
                  </>
                }
                icon="shield"
                titleClassName="text-d3"
                side={
                  <div className="rounded-lg border border-o-100 bg-gradient-to-br from-white to-o-50 p-5 shadow-[var(--shadow-soft)]">
                    <div className="grid gap-3">
                      {["Confidentiality terms", "Comparable estates", "Method before logo wall"].map(
                        (item) => (
                          <span
                            key={item}
                            className="rounded-md bg-surface px-4 py-3 font-display text-[1rem] font-semibold text-ink shadow-[0_10px_24px_rgba(122,62,12,0.08)] ring-1 ring-o-100"
                          >
                            {item}
                          </span>
                        ),
                      )}
                    </div>
                    <TextLink href={href("clients")} className="mt-6">
                      See the organisations we can name
                    </TextLink>
                  </div>
                }
              >
                <p>
                  The migration work sits in the Australian market and every one
                  of those engagements carries confidentiality terms that do not
                  permit us to publish the client. A supplier who quietly
                  stretches a permission for a website is a supplier who will do
                  the same with your data, so this page argues from method
                  rather than from a logo wall. In a conversation we can
                  describe comparable estates and what they turned up in detail,
                  which is more useful than a name in any case.
                </p>
              </InsightPanel>
            </Reveal>
          </div>
        </Container>
      </Band>

      <Capabilities
        eyebrow="What moves"
        title="Six things that turn up in an on premise estate"
        lead="Almost no migration is only one of these. The Dynamics database is the visible part, and the reporting, the integrations and the portal nobody documented are the part that decides the timeline."
        items={WHAT_MOVES}
        variant="grid"
        tone="canvas"
      />

      {/* ---------------------------------------------------------------
          The four phases, with assessment carrying the weight.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="phases">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="How it runs"
                title="Four phases, and the first one has genuinely changed"
                lead="Assessment used to be several weeks of a consultant opening forms one at a time and writing down what they found. That is the part agents are good at, and it is the part where being complete rather than being fast actually matters."
              />
            </Reveal>

            <ol className="mt-12 grid gap-5 lg:grid-cols-2">
              {PHASES.map((phase, index) => (
                <Reveal as="li" key={phase.n} delay={index * 90}>
                  <Card className="h-full">
                    <span className="font-mono text-[1.5rem] font-medium leading-none text-o-200">
                      {phase.n}
                    </span>
                    <h3 className="mt-5 font-display text-[1.25rem] font-semibold leading-snug text-ink">
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                      {phase.body}
                    </p>
                    <p className="mt-5 flex items-start gap-2.5 border-t border-rule pt-4 text-[0.875rem] leading-relaxed text-o-700">
                      <ArrowRight className="mt-1 shrink-0 text-o-400" />
                      {phase.aside}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------------------
          The argument the client asked for: a migration is the moment to
          change the process, not just the hosting.
          --------------------------------------------------------------- */}
      <Band tone="canvas" block="redesign">
        <Container wide>
          <div className="py-band">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <Reveal>
                <Eyebrow>The recommendation</Eyebrow>
                <h2 className="mt-6 measure-tight text-d2">
                  The cheapest moment to fix the process is while you are
                  already moving it.
                </h2>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-body">
                  We will always propose changes alongside a migration rather
                  than reproducing the old system on newer infrastructure. That
                  is not upselling, it is the arithmetic: the discovery, the
                  testing and the change management are being paid for once
                  either way, and spending them on a system worth having costs
                  very little more than spending them on a copy.
                </p>
              </Reveal>

              <Reveal delay={140}>
                <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {REDESIGN.map((item) => (
                    <div
                      key={item.t}
                      data-interactive-card=""
                      data-rich-card=""
                      className="rounded-lg bg-surface p-5 shadow-[var(--shadow-soft)] ring-1 ring-rule"
                    >
                      <dt data-card-float="" className="font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                        {item.t}
                      </dt>
                      <dd className="mt-2 text-[0.9375rem] leading-relaxed text-body">
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

      <FaqSection
        eyebrow="Answers"
        title="What people ask before committing to a move"
        items={faqs}
        tone="warmer"
      />

      <RelatedPages
        title="What the target looks like"
        items={[
          {
            key: "servicesD365",
            blurb:
              "The Dynamics 365 side of the destination, once the estate has landed.",
          },
          {
            key: "servicesPowerPlatform",
            blurb:
              "Dataverse, governance and the pipelines that keep the new estate maintainable.",
          },
          {
            key: "servicesAi",
            blurb:
              "The same agent techniques, applied to business process rather than to an inventory.",
          },
        ]}
      />

      <ClosingCta
        title="Give us read access and a fortnight."
        lead="The assessment is a discrete piece of work with its own deliverable: a classified inventory of the estate and a sequenced roadmap. You can take that document to any partner, including one that is not us, which is the point of buying it separately."
        primary={{ label: "Start with an assessment", key: "contact" }}
        secondary={{ label: "See who we place", key: "staffAug" }}
      />
    </>
  );
}
