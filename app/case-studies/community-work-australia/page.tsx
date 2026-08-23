import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import { Band, Container, SectionHead } from "@/components/ui/primitives";
import {
  ClosingCta,
  PageHero,
  ProofStrip,
  RelatedPages,
} from "@/components/page/blocks";
import { Capabilities } from "@/components/page/capabilities";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/content/site";
import { breadcrumbs, graph, ORG_ID } from "@/lib/schema";
import { href } from "@/lib/routes";

const PATH = "/case-studies/community-work-australia/";

export const metadata: Metadata = pageMetadata({
  title: "Community Work Australia Case Study",
  description:
    "How Community Work Australia moved skills assessment for migration pathways off manual scoring and onto Intelli Assessment, implemented by Datanox.",
  path: PATH,
  type: "article",
});

const mechanics = [
  {
    name: "Structured intake",
    body: "Applicant information and supporting documentation are captured through guided workflows rather than arriving as attachments to be sorted.",
    detail: "Guided, not gathered",
    icon: "steps" as const,
  },
  {
    name: "Configurable scoring",
    body: "Scoring models reflect the criteria the association defines, with level descriptions that make two assessors mean the same thing by the same score.",
    detail: "Defined levels",
    icon: "rubric" as const,
  },
  {
    name: "Rule based evaluation",
    body: "Evaluation logic runs against the captured information, so the routine part of an assessment resolves without an assessor reapplying it by hand.",
    detail: "Applied once",
    icon: "rules" as const,
  },
  {
    name: "Adapts across cycles",
    body: "Occupation lists and qualification requirements change between migration intake periods. The scoring model changes with them without previous records losing their meaning.",
    detail: "Cycle aware",
    icon: "clock" as const,
  },
];

export default function CaseStudyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            {
              "@type": "Article",
              "@id": `${SITE_URL}${PATH}#article`,
              headline:
                "Community Work Australia: structured assessment for skilled migration pathways",
              description:
                "How Community Work Australia moved skills assessment off manual scoring and onto Intelli Assessment, implemented by Datanox.",
              url: `${SITE_URL}${PATH}`,
              author: { "@id": ORG_ID },
              publisher: { "@id": ORG_ID },
              about: {
                "@type": "Organization",
                name: "Community Work Australia",
              },
              inLanguage: "en",
            },
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: href("caseStudies") },
              { name: "Community Work Australia", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Case study, professional association"
        trail={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: href("caseStudies") },
          { name: "Community Work Australia", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Assessment that</span>
            </span>
            <span>
              <span>holds up across</span>
            </span>
            <span>
              <span>intake periods.</span>
            </span>
          </>
        }
        lead="Community Work Australia evaluates applicants seeking recognition within community services occupations aligned with skilled migration pathways. It uses Intelli Assessment, implemented by Datanox, to run that evaluation in a structured way."
        secondaryCta={{ label: "See Intelli Assessment", key: "intelliAssessment" }}
      />

      <ProofStrip
        tone="peach"
        stats={[
          {
            figure: "Consistent",
            label: "assessment across assessors",
            detail:
              "defined level descriptions rather than a shared document and a judgement call",
          },
          {
            figure: "Less",
            label: "manual scoring effort",
            detail:
              "routine evaluation resolves through rules rather than by hand each time",
          },
          {
            figure: "Variable",
            label: "application volumes absorbed",
            detail:
              "intake periods change, and throughput no longer depends on adding assessors",
          },
        ]}
      />

      <Band tone="canvas">
        <Container>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="The situation"
                title="Rising volumes against a manual process"
                lead="Associations responsible for skills assessment evaluate qualifications, verify employment experience, and check applicants against occupation standards aligned with national eligibility frameworks. As application volumes rise and occupation lists change between assessment cycles, a manual evaluation process produces delay, inconsistency between assessors, and administrative pressure that lands on the assessment team."
              />
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <p className="measure text-[1.0625rem] leading-relaxed">
                The difficulty is not that any single assessment is hard. It is
                that the same assessment has to be made the same way by
                different people, months apart, against criteria that have
                themselves moved. Fragmented documentation handling and
                spreadsheet based scoring cannot carry that, because neither
                records why a score was given.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <Capabilities
        eyebrow="What was implemented"
        title="Structured digital assessment on Power Platform"
        lead="Intelli Assessment gave the assessment team a secure environment for structured eligibility evaluation, with the capacity to process more without proportionally more people."
        items={mechanics}
        variant="list"
        tone="warm"
      />

      <Band tone="canvas">
        <Container>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="The result"
                title="Consistency that can be evidenced"
                lead="The solution improves assessment consistency, reduces manual scoring effort, and lets the organisation manage application volumes more efficiently across changing migration intake periods."
              />
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <p className="measure text-[1.0625rem] leading-relaxed">
                The word that matters is evidenced. An association can always
                say its assessments are consistent. What changed here is that
                the claim is now backed by a record: which criterion, which
                level, which assessor, and what the evidence behind the score
                was.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <RelatedPages
        title="The product behind this work"
        items={[
          {
            key: "intelliAssessment",
            blurb: "The product behind this work, in full.",
          },
          {
            key: "notForProfit",
            blurb:
              "The wider not for profit picture, including fundraising, NDIS and health.",
          },
          {
            key: "caseStudies",
            blurb: "The other work we can name.",
          },
        ]}
      />

      <ClosingCta
        title="Running assessment against criteria that keep moving?"
        lead="Bring your own scoring model, however it currently exists. A spreadsheet, a policy document, or a rule that only one assessor really understands. All three are normal starting points."
      />
    </>
  );
}
