import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  Band,
  Card,
  Container,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { IconChip, type IconName } from "@/components/ui/icons";
import { FigPowerHero } from "@/components/figures/hero-visuals";
import { Capabilities } from "@/components/page/capabilities";
import {
  ClosingCta,
  FaqSection,
  InsightPanel,
  PageHero,
  RelatedPages,
  type Faq,
} from "@/components/page/blocks";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service } from "@/lib/schema";
import { site } from "@/content/site";

const PATH = "/services/power-platform/";

export const metadata: Metadata = pageMetadata({
  title: "Power Platform Consulting and Development",
  description:
    "Power Pages, model driven and canvas apps, code apps, Power Automate, Dataverse, Power BI and the governance that keeps a platform estate maintainable.",
  path: PATH,
});

/**
 * Power Platform delivery.
 *
 * The credible claim here is unusual and worth leading on: Datanox ships
 * commercial products on this platform, so the limits are known from having
 * hit them rather than from a datasheet. Everything else on this page is
 * ordinary capability that every partner also has.
 */

const AREAS: {
  name: string;
  body: string;
  detail: string;
  icon: IconName;
}[] = [
  {
    name: "Power Pages",
    body: "External facing portals with authentication, role based access and direct Dataverse binding. The hard part is almost never the pages, it is the security model deciding who may see which record.",
    detail: "Public facing, governed",
    icon: "portal",
  },
  {
    name: "Model driven apps",
    body: "Data first internal applications with business process flows and complex security models, for the cases where the shape of the data should drive the shape of the screen.",
    detail: "Data first",
    icon: "database",
  },
  {
    name: "Canvas apps",
    body: "Task specific, mobile first applications with a tailored interface, for the field work and single purpose jobs a model driven app makes unnecessarily heavy.",
    detail: "Task specific",
    icon: "remote",
  },
  {
    name: "Code apps",
    body: "Pro code applications running on Power Platform for the cases where low code hits its ceiling, keeping the data, identity and governance rather than starting a separate stack.",
    detail: "Past the ceiling",
    icon: "api",
  },
  {
    name: "Power Automate",
    body: "Approval chains, integrations, scheduled processing and document generation. Most of the value is in the approval design rather than the connectors.",
    detail: "Approvals and integration",
    icon: "rules",
  },
  {
    name: "Dataverse",
    body: "Data modelling, security roles, business rules and solution architecture. This is the layer that decides whether the estate is still maintainable in three years.",
    detail: "The layer that decides",
    icon: "layers",
  },
  {
    name: "Power BI",
    body: "Executive dashboards, embedded analytics and dataset modelling, reading from the tables the work is recorded in rather than from a copy that has to be kept in step.",
    detail: "No second copy",
    icon: "chart",
  },
  {
    name: "Application lifecycle and governance",
    body: "Solution management, environment strategy and deployment pipelines, so a change reaches production the same way every time and an estate stays maintainable as it grows.",
    detail: "Repeatable releases",
    icon: "check",
  },
];

/** The three failure modes a platform estate reaches without governance. */
const DRIFT = [
  {
    title: "Nobody knows what is in production",
    body: "Apps built in personal environments, flows owned by people who have left, and no solution boundary anywhere. The first task on most remediation engagements is an inventory, not a build.",
  },
  {
    title: "Every change is a manual deployment",
    body: "Without pipelines a release is somebody exporting a solution and importing it while everyone waits. It works until it does not, and the failure lands in production.",
  },
  {
    title: "Security was decided per app",
    body: "Role design repeated app by app diverges within a year, and the organisation loses the ability to answer who can see what. Fixing it later is far more expensive than modelling it once.",
  },
];

const faqs: Faq[] = [
  {
    question: "What makes you different from any other Power Platform partner?",
    answer:
      "We ship commercial software on this platform. Five products of our own run in production for government entities and universities, which means the limits of Power Pages, Dataverse and the licensing model are things we have hit rather than read about. That shows up as an architecture that anticipates the ceiling instead of discovering it in month four.",
  },
  {
    question: "We already have apps built by our own team. Can you take those on?",
    answer:
      "Yes, and it is common. The usual first step is an inventory and a review of the data model and the security roles, because a platform estate that grew organically almost always has more apps than anyone thinks and less governance than anyone assumes. We will tell you what is worth keeping.",
  },
  {
    question: "Low code or pro code?",
    answer:
      "Whichever survives longer. Configuration and low code survive upgrades and can be maintained by your own people, so we push as far as they will go. When a requirement genuinely needs pro code, code apps and custom connectors keep it inside the platform rather than starting a parallel stack with its own identity and hosting.",
  },
  {
    question: "Can you help with environment strategy and licensing?",
    answer:
      "Yes, and it is worth doing before the first build rather than after. Environment strategy, solution boundaries and deployment pipelines cost very little to set up at the start and are painful to retrofit. Licensing advice is included in scoping, though licences themselves are bought from Microsoft or a licensing partner.",
  },
  {
    question: "Do you build on Power Platform or on Azure?",
    answer:
      "Both, where each belongs. Business process, data and security sit on Power Platform. Azure Functions, integration and AI workloads sit on Azure and are called from it. Putting everything in one of the two is a decision people usually regret in opposite directions.",
  },
];

export default function PowerPlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            service({
              name: "Microsoft Power Platform consulting and development",
              path: PATH,
              description:
                "Power Pages, model driven and canvas apps, code apps, Power Automate, Dataverse architecture, Power BI and application lifecycle governance.",
              serviceType: "Power Platform consulting",
              areaServed: [...site.regions],
            }),
            faqPage(PATH, faqs),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Services", path: href("services") },
              { name: "Power Platform", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Services, Power Platform"
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: href("services") },
          { name: "Power Platform", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>We know where this</span>
            </span>
            <span>
              <span>platform stops, because</span>
            </span>
            <span>
              <span>we ship on it.</span>
            </span>
          </>
        }
        lead="Five commercial products of ours run on Power Platform in production, inside government entities, universities and insurers. Every limit in Power Pages, Dataverse and the licensing model is one we have met rather than read about, which is what an architecture benefits from most."
        primaryCta={{ label: "Review your platform estate", key: "contact" }}
        secondaryCta={{ label: "See the products", key: "governance" }}
        meta={{
          label: "Building on",
          items: ["Power Pages", "Dataverse", "Power Automate", "Power BI"],
        }}
        figure={<FigPowerHero />}
      />

      {/* ---------------------------------------------------------------
          The one claim on this page that a competitor cannot copy.
          --------------------------------------------------------------- */}
      <Band tone="warmer" block="reference">
        <Container>
          <div className="py-band">
            <Reveal from="scale">
              <InsightPanel
                eyebrow="Why that matters"
                title="Our own software is the reference implementation."
                icon="layers"
                titleClassName="text-d3"
                side={
                  <div className="rounded-lg border border-o-100 bg-gradient-to-br from-white to-o-50 p-5 shadow-[var(--shadow-soft)]">
                    <div className="space-y-3">
                      {["Products", "Platform", "Practice"].map((item) => (
                        <span
                          key={item}
                          className="block rounded-md bg-surface px-4 py-3 font-display text-[1rem] font-semibold text-ink shadow-[0_10px_24px_rgba(122,62,12,0.08)] ring-1 ring-o-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <TextLink href={href("governance")} className="mt-6">
                      See what we build on it
                    </TextLink>
                  </div>
                }
              >
              <p className="text-[1.0625rem] leading-relaxed text-body">
                Most partners learn a platform by delivering other people’s
                requirements on it. We also maintain products on it, which is a
                different relationship: an upgrade that breaks something is our
                problem for years rather than somebody else’s problem after
                handover. That shows up in an architecture that anticipates the
                ceiling instead of discovering it in month four, and in a
                willingness to say when the platform is the wrong answer.
              </p>
              </InsightPanel>
            </Reveal>
          </div>
        </Container>
      </Band>

      <Capabilities
        eyebrow="Coverage"
        title="Eight areas, and one of them decides the other seven"
        lead="Dataverse architecture is the layer that determines whether the estate is still maintainable in three years, which is why it is not last on this list by accident."
        items={AREAS}
        variant="grid"
        tone="canvas"
      />

      {/* ---------------------------------------------------------------
          The remediation argument, which is most of the inbound work.
          --------------------------------------------------------------- */}
      <Band tone="warm" block="drift">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="Estate remediation"
                title="Three things we find in almost every estate that grew on its own"
                lead="Power Platform is easy to start with, which is its great strength and the source of nearly all of its trouble. None of this is a criticism of the teams involved."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {DRIFT.map((item, index) => (
                <Reveal key={item.title} delay={index * 90}>
                  <Card className="h-full">
                    <span className="font-mono text-[1.5rem] font-medium leading-none text-o-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-display text-[1.125rem] font-semibold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {item.body}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>

            <Reveal delay={340} className="mt-9">
              <p className="measure text-[0.9375rem] leading-relaxed text-muted">
                A remediation engagement starts with an inventory and a review of
                the data model, and produces a plan that says what to keep, what
                to rebuild and what to switch off. Nobody enjoys the third
                category, and leaving it running costs more.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <FaqSection
        eyebrow="Answers"
        title="What platform owners ask before handing anything over"
        items={faqs}
        tone="warmer"
      />

      <RelatedPages
        title="The layers either side"
        items={[
          {
            key: "servicesD365",
            blurb:
              "The customer engagement suite sitting on the same Dataverse layer.",
          },
          {
            key: "servicesAi",
            blurb:
              "Copilot Studio and Azure AI Foundry applied inside the process.",
          },
          {
            key: "intelliForm",
            blurb:
              "A Power Pages product of ours, if you would rather buy the pattern than build it.",
          },
        ]}
      />

      <ClosingCta
        title="Send us an inventory, or tell us you do not have one."
        lead="Either answer is useful. If you know what is running we will review the architecture. If nobody is sure, that is the finding, and building the picture is the first week of work rather than an obstacle to starting."
        primary={{ label: "Review your platform estate", key: "contact" }}
        secondary={{ label: "See the whole practice", key: "services" }}
      />
    </>
  );
}
