import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Route } from "next";

import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Action,
  Band,
  Container,
  Eyebrow,
} from "@/components/ui/primitives";
import { Breadcrumbs, ClosingCta } from "@/components/page/blocks";
import {
  getAllPosts,
  getPost,
  getRelatedPosts,
  formatDate,
} from "@/lib/posts";
import { href } from "@/lib/routes";
import { pageMetadata, ogImageFor } from "@/lib/seo";
import { blogPosting, breadcrumbs, graph } from "@/lib/schema";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const path = `/blog/${post.slug}/`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            blogPosting({
              headline: post.title,
              description: post.description,
              path,
              datePublished: post.date,
              dateModified: post.updated,
              image: ogImageFor(path),
            }),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Blog", path: href("blog") },
              { name: post.title, path },
            ]),
          ),
        }}
      />

      {/* Reading progress. Purely a scroll timeline, so no script runs. */}
      <div data-progress="" aria-hidden="true">
        <span />
      </div>

      <Band tone="canvas" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-18%] top-[-30%] hidden h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,var(--color-o-100)_0%,var(--color-o-50)_46%,transparent_68%)] opacity-70 lg:block"
        />
        <Container className="relative">
          <div className="pt-8 lg:pt-10">
            <Breadcrumbs
              trail={[
                { name: "Home", path: "/" },
                { name: "Blog", path: href("blog") },
                { name: post.title, path },
              ]}
            />
          </div>

          <div className="pb-12 lg:pb-16">
            <Reveal className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Eyebrow>{post.category}</Eyebrow>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                {post.readingMinutes} min read
              </span>
            </Reveal>

            {/* The one h1, rendered by the template from frontmatter. A post
                cannot ship without one, which is the defect on eleven of the
                twelve posts on the live site. */}
            <Reveal as="h1" mask delay={90} className="mt-6 max-w-[20ch] text-d1">
              <span>
                <span>{post.title}</span>
              </span>
            </Reveal>

            <Reveal delay={300} className="mt-6">
              <p className="measure text-lead">{post.description}</p>
            </Reveal>

            <Reveal
              delay={400}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-7"
            >
              <time
                dateTime={post.date}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted"
              >
                Published {formatDate(post.date)}
              </time>
              {post.updated !== post.date ? (
                <time
                  dateTime={post.updated}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted"
                >
                  Updated {formatDate(post.updated)}
                </time>
              ) : null}
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                {post.wordCount.toLocaleString("en-GB")} words
              </span>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* Body, with contents alongside on wide screens */}
      <Band tone="canvas">
        <Container>
          <div className="grid gap-12 pb-band lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
            <article className="article max-w-[68ch]">
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>

            {post.headings.length > 2 ? (
              <aside className="order-first lg:order-last">
                <div className="lg:sticky lg:top-28">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-o-700">
                    On this page
                  </p>
                  <nav aria-label="On this page" className="mt-4">
                    <ol className="flex flex-col gap-2.5 border-l border-rule pl-4">
                      {post.headings.map((heading) => (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            className="text-[0.875rem] leading-snug text-muted transition-colors hover:text-o-700"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </aside>
            ) : null}
          </div>
        </Container>
      </Band>

      {/* Related. The live site has almost no post to post linking, which
          leaves every post a dead end. */}
      {related.length ? (
        <Band tone="warm">
          <Container wide>
            <div className="py-band">
              <Reveal>
                <h2 className="text-d3">Read next</h2>
              </Reveal>
              <ul className="mt-8 grid gap-5 sm:grid-cols-3">
                {related.map((item, index) => (
                  <Reveal as="li" key={item.slug} delay={index * 70}>
                    <Link
                      href={`/blog/${item.slug}/` as Route}
                      className="group flex h-full flex-col rounded-lg bg-surface p-6 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-o-200 lg:p-7"
                    >
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-o-700">
                        {item.category}
                      </span>
                      <span className="mt-3 font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                        {item.title}
                      </span>
                      <span className="mt-auto flex items-center gap-2 pt-6 text-[0.8125rem] font-medium text-o-700">
                        {item.readingMinutes} min read
                        <ArrowRight />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={220} className="mt-8">
                <Action href={href("blog")} variant="ghost">
                  All writing
                  <ArrowRight />
                </Action>
              </Reveal>
            </div>
          </Container>
        </Band>
      ) : null}

      <ClosingCta
        title={post.ctaTitle ?? "Does this describe a process you are living with?"}
        lead={
          post.ctaLead ??
          "Bring the workflow this article made you think about. What it costs you now, who touches it, and where it stalls. That is a conversation with something in it rather than a discovery call."
        }
      />
    </>
  );
}
