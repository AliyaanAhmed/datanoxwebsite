import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";

import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Band, Container, SectionHead } from "@/components/ui/primitives";
import { IconChip, type IconName } from "@/components/ui/icons";
import { ClosingCta, PageHero, RelatedPages } from "@/components/page/blocks";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

const PATH = "/case-studies/";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Named organisations, the problem they brought, and what changed. Community Work Australia and Melanoma Patients Australia, published with permission.",
  path: PATH,
});

/**
 * Only organisations Datanox has confirmed appear here, and each entry says
 * exactly what is evidenced rather than implying more. The competitor analysis
 * identified this as the single largest trust gap on the site, and the way to
 * close it is with named work rather than with more adjectives.
 */
const studies: {
  org: string;
  sector: string;
  icon: IconName;
  headline: string;
  problem: string;
  outcome: string;
  href?: string;
}[] = [
  {
    org: "Community Work Australia",
    sector: "Professional association",
    icon: "people",
    headline: "Structured assessment for skilled migration pathways",
    problem:
      "Applicants seeking recognition in community services occupations were evaluated through manual scoring, which made consistency hard to evidence and made changing intake volumes difficult to absorb.",
    outcome:
      "Intelli Assessment, implemented by Datanox, improved assessment consistency and reduced manual scoring effort. Automating the surrounding workflows cut manual processing time by forty percent, measured by the operations team rather than estimated by us.",
    href: "/case-studies/community-work-australia/",
  },
  {
    org: "Melanoma Patients Australia",
    sector: "Patient support",
    icon: "handshake",
    headline: "Support programmes and funder reporting in one system",
    problem:
      "Patient support, advocacy and community programmes were coordinated separately from the reporting obligations attached to the funding behind them.",
    outcome:
      "A CRM built by Datanox holds contact history and programme participation together, so the report a funder receives is assembled from the records that captured the work.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Case studies"
        trail={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Named organisations.</span>
            </span>
            <span>
              <span>Stated outcomes.</span>
            </span>
          </>
        }
        lead="Three pieces of work we can name, with what the organisation brought us and what changed. Where a number is quoted it came from the organisation rather than from our estimate, and where there is no number we have not invented one."
        secondaryCta={{ label: "Read the white papers", key: "resources" }}
      />

      <Band tone="warm">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="The work"
                title="What each one brought us"
              />
            </Reveal>

            <ul className="mt-12 flex flex-col gap-5">
              {studies.map((study, index) => (
                <Reveal as="li" key={study.org} delay={index * 80}>
                  <article className="grid overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-soft)] ring-1 ring-rule lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="flex flex-col gap-4 bg-gradient-to-br from-o-50 to-o-100 p-7 lg:p-8">
                      <IconChip name={study.icon} />
                      <h2 className="font-display text-[1.25rem] font-semibold leading-snug text-ink">
                        {study.org}
                      </h2>
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-o-700">
                        {study.sector}
                      </p>
                      {study.href ? (
                        <Link
                          href={study.href as Route}
                          className="group mt-auto inline-flex items-center gap-2 pt-4 text-[0.875rem] font-medium text-o-700"
                        >
                          Read the full study
                          <ArrowRight />
                        </Link>
                      ) : null}
                    </div>

                    <div className="border-t border-rule bg-warm-1 p-7 lg:border-l lg:border-t-0 lg:p-8">
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                        What they brought
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed">
                        {study.problem}
                      </p>
                    </div>

                    <div className="border-t border-rule p-7 lg:border-l lg:border-t-0 lg:p-8">
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-o-700">
                        What changed
                      </p>
                      <p className="mt-1.5 font-display text-[1.0625rem] leading-snug text-ink">
                        {study.headline}
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed">
                        {study.outcome}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="mt-10">
              <p className="measure text-[0.875rem] leading-relaxed text-muted">
                More work exists than is listed here. What is listed is what we
                have permission to name, which is a shorter list than the real
                one and the only one worth publishing.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <RelatedPages
        title="More evidence than this"
        items={[
          {
            key: "notForProfit",
            blurb:
              "Fundraising, professional association assessment, NDIS and community health.",
          },
          {
            key: "intelliAssessment",
            blurb: "The assessment engine behind the Community Work Australia study.",
          },
          {
            key: "clients",
            blurb:
              "Every organisation we can name, which is more than have written up case studies.",
          },
        ]}
      />

      <ClosingCta
        title="Bring us the problem that made you open this page."
        lead="If one of these resembles your situation, say which and why. Starting from a comparison is faster than starting from a requirements document, and it surfaces the differences that actually matter sooner."
      />
    </>
  );
}
