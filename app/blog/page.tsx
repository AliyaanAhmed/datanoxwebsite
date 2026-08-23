import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";

import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Band, Container } from "@/components/ui/primitives";
import { ClosingCta, PageHero, RelatedPages } from "@/components/page/blocks";
import { getAllPosts, formatDate, type Post } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/content/site";
import { breadcrumbs, graph, ORG_ID, SITE_ID } from "@/lib/schema";

const PATH = "/blog/";

export const metadata: Metadata = pageMetadata({
  title: "Writing on Governance, Forms and Decision Structure",
  description:
    "Long form writing on budgeting, no code forms, assessment and where AI actually fits inside a Microsoft Power Platform estate.",
  path: PATH,
});

/**
 * One hub, replacing four.
 *
 * The live site has /category/blog/ carrying 48 internal links but absent
 * from every sitemap, /highlights/ in the sitemap but linked from nowhere,
 * an Elementor template at /rs_elements/blogs-tab/ that /blog/ redirects
 * into, and a Highlights section on the homepage. All four resolve here.
 */

const categories = ["All", "Blog", "News"] as const;

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}/` as Route}
      className={`group flex h-full flex-col rounded-xl bg-surface shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-o-200 ${
        featured ? "p-8 lg:p-10" : "p-7 lg:p-8"
      }`}
    >
      <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center rounded-pill bg-o-50 px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-o-700 ring-1 ring-o-100">
          {post.category}
        </span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
          {post.readingMinutes} min read
        </span>
      </span>

      <h2
        className={`mt-5 ${featured ? "text-d2" : "text-d4"} transition-colors group-hover:text-o-800`}
      >
        {post.title}
      </h2>

      <p
        className={`mt-3 leading-relaxed ${
          featured ? "text-[1.0625rem] max-w-[54ch]" : "text-[0.9375rem]"
        }`}
      >
        {post.description}
      </p>

      <span className="mt-auto flex items-center justify-between gap-4 border-t border-rule pt-6 mt-7">
        <time
          dateTime={post.date}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted"
        >
          {formatDate(post.date)}
        </time>
        <span className="flex items-center gap-2 text-[0.875rem] font-medium text-o-700">
          Read
          <ArrowRight />
        </span>
      </span>
    </Link>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            {
              "@type": "Blog",
              "@id": `${SITE_URL}${PATH}#blog`,
              url: `${SITE_URL}${PATH}`,
              name: "Datanox writing",
              description:
                "Long form writing on budgeting, no code forms, assessment and where AI actually fits inside a Microsoft Power Platform estate.",
              publisher: { "@id": ORG_ID },
              isPartOf: { "@id": SITE_ID },
              blogPost: posts.map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                url: `${SITE_URL}/blog/${post.slug}/`,
                datePublished: post.date,
                dateModified: post.updated,
              })),
            },
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Blog", path: PATH },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Writing"
        trail={[
          { name: "Home", path: "/" },
          { name: "Blog", path: PATH },
        ]}
        title={
          <>
            <span>
              <span>Longer answers than</span>
            </span>
            <span>
              <span>a product page allows.</span>
            </span>
          </>
        }
        lead="Writing on budgeting, no code forms, assessment and where AI actually fits inside a Microsoft estate. Written by the people who build the products, and long enough to be useful rather than long enough to rank."
        secondaryCta={{ label: "Read the white papers", key: "resources" }}
        meta={{
          label: "Topics",
          items: ["Governance", "Forms", "Assessment", "Decision structure"],
        }}
      />

      <Band tone="warm">
        <Container wide>
          <div className="py-band">
            {/* Category filter, as links rather than script driven tabs, so it
                works without JavaScript and each view is crawlable. */}
            <Reveal className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className={`rounded-pill px-4 py-2 text-[0.875rem] font-medium ${
                    category === "All"
                      ? "bg-gradient-to-br from-o-500 to-o-600 text-white"
                      : "bg-surface text-ink-2 ring-1 ring-rule"
                  }`}
                >
                  {category}
                  <span className="ml-2 font-mono text-[0.6875rem] opacity-70">
                    {category === "All"
                      ? posts.length
                      : posts.filter((post) => post.category === category).length}
                  </span>
                </span>
              ))}
            </Reveal>

            {featured ? (
              <Reveal delay={80} className="mt-8">
                <PostCard post={featured} featured />
              </Reveal>
            ) : null}

            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <Reveal as="li" key={post.slug} delay={index * 60}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Band>

      <RelatedPages
        title="Beyond the writing"
        items={[
          {
            key: "resources",
            blurb: "Six white papers, longer and more technical than any post.",
          },
          {
            key: "caseStudies",
            blurb: "Named organisations and what the work produced.",
          },
          {
            key: "compare",
            blurb: "Power Pages against Jotform, Formstack and Kissflow.",
          },
        ]}
      />

      <ClosingCta
        title="Read something here that matched a problem you have?"
        lead="Reading is the cheap part. If one of these described something you recognise, the useful next step is walking through your version of it with somebody who has built the fix before."
      />
    </>
  );
}
