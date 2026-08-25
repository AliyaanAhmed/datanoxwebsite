import type { Metadata } from "next";

import { Reveal } from "@/components/ui/reveal";
import { Band, Container, SectionHead, TextLink } from "@/components/ui/primitives";
import type { IconName } from "@/components/ui/icons";
import {
  ClosingCta,
  PageHero,
  RelatedPages,
} from "@/components/page/blocks";
import { PaperLibrary, type Paper } from "@/components/page/paper-library";
import { href, type RouteKey } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";

const PATH = "/resources/";

export const metadata: Metadata = pageMetadata({
  title: "White Papers",
  description:
    "Five product white papers covering Governance and Performance, Intelli Form, Intelli Assessment, InsureOS and BrokerOS, written for a technical buyer.",
  path: PATH,
});

/**
 * The white papers already existed on the live site and were linked from
 * product pages, but they were scattered, four of them were named "White
 * Pager", and nothing gathered them. This page gathers them and fixes the
 * names.
 *
 * Gated from 21 August 2026 on the client's instruction. The gate asks three
 * fields and remembers the answer per browser, so a reader who wants all five
 * fills it in once. The card titles and descriptions stay in the static HTML
 * either way, so nothing is hidden from search.
 *
 * The company overview is no longer in this list. It is a corporate
 * introduction rather than a technical paper, and putting a form in front of
 * a document whose whole job is to introduce the company would be working
 * against it. It sits open, below.
 */
const papers: Paper[] = [
  {
    name: "Governance and Performance",
    file: "/papers/governance-and-performance.pdf",
    blurb:
      "Budgeting, project performance, KPI reporting and maturity assessment, including how the approval and version trail works.",
    icon: "budget",
    product: "governance",
  },
  {
    name: "Intelli Form",
    file: "/papers/intelli-form.pdf",
    blurb:
      "The no code builder, multi step conditional flows, payment capture, and the technical detail of the direct Dataverse write.",
    icon: "drag",
    product: "intelliForm",
  },
  {
    name: "Intelli Assessment",
    file: "/papers/intelli-assessment.pdf",
    blurb:
      "Weighted rubrics, level definitions, automated outcomes and how evidence stays attached to a score.",
    icon: "rubric",
    product: "intelliAssessment",
  },
  {
    name: "InsureOS",
    file: "/papers/datanox-insureos.pdf",
    blurb:
      "The insurer side: product studio, rating and quoting, approval routing, and publishing a product as a governed API.",
    icon: "shield",
    product: "insureos",
  },
  {
    name: "BrokerOS",
    file: "/papers/datanox-brokeros.pdf",
    blurb:
      "The broker side: aggregator portal, tender management, and quoting directly against every connected insurer.",
    icon: "tender",
    product: "brokeros",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "White Papers", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="White papers"
        trail={[
          { name: "Home", path: "/" },
          { name: "White Papers", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Read it before</span>
            </span>
            <span>
              <span>you talk to anyone.</span>
            </span>
          </>
        }
        lead="Five papers, one for each product, written at the depth a technical buyer needs rather than the depth a web page can carry. Three fields before the first download and nothing asked again after that, because we would rather know who is reading than collect an address and never use it."
        primaryCta={{ label: "Book a demo", key: "contact" }}
        secondaryCta={{ label: "See the comparison", key: "compare" }}
      />

      <Band tone="warm">
        <Container wide>
          <div className="py-band">
            <Reveal>
              <SectionHead
                eyebrow="The library"
                title="Five papers, one per product"
                lead="Each one goes further than its product page does, because a page has to stay readable and a paper does not."
              />
            </Reveal>

            <PaperLibrary papers={papers} />

            <Reveal delay={280} className="mt-8">
              <p className="measure text-[0.875rem] leading-relaxed text-muted">
                Papers are updated when a product changes rather than on a
                schedule, so a paper that has not moved in a while has not
                needed to. What we do with the details you leave is set out in
                the <TextLink href={href("privacy")}>privacy notice</TextLink>.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <RelatedPages
        title="Shorter than a paper"
        items={[
          {
            key: "compare",
            blurb:
              "Intelli Form set against Jotform, Formstack and Kissflow, including where they win.",
          },
          {
            key: "caseStudies",
            blurb: "What the work produced, named and dated.",
          },
          {
            key: "blog",
            blurb: "Shorter writing on governance, forms and decision structure.",
          },
        ]}
      />

      <ClosingCta
        title="Read one, then bring us the process it made you think about."
        lead="The papers are written to be argued with. If something in one of them does not match how your organisation actually works, that disagreement is the most useful thing you could arrive with."
        primary={{ label: "Bring us a process", key: "contact" }}
        secondary={{ label: "See the comparison", key: "compare" }}
      />
    </>
  );
}
