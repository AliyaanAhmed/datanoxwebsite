import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * The content system.
 *
 * Posts are plain markdown files with frontmatter under content/posts. They
 * are read and rendered at build time, so a post ships as static HTML with no
 * runtime cost and no CMS to keep alive.
 *
 * The h1 is rendered by the template from frontmatter rather than written into
 * the markdown, which is the mechanism that makes it impossible to publish a
 * post without one. Eleven of the twelve posts on the live WordPress site have
 * no h1 at all.
 */

const DIR = path.join(process.cwd(), "content", "posts");

export type PostCategory = "Blog" | "News" | "Case Study";

export type Post = {
  slug: string;
  title: string;
  /**
   * An optional shorter title for the browser tab and the search result.
   * The site name is appended to it, and a few post titles push the pair
   * past the width a search engine will show. The h1 on the page still uses
   * the full title, because there the width is not the constraint.
   */
  seoTitle?: string;
  description: string;
  date: string;
  updated: string;
  category: PostCategory;
  /**
   * The closing call to action, written per post.
   *
   * Every article used to end with the same two sentences, which is what a
   * template produces and what a reader who has read two of them notices
   * immediately. A post that has just spent nine hundred words on one subject
   * should close on that subject.
   */
  ctaTitle?: string;
  ctaLead?: string;
  /** Rendered body, excluding the h1. */
  html: string;
  readingMinutes: number;
  wordCount: number;
  /** Every h2 in the body, for the on page contents. */
  headings: { id: string; text: string }[];
};

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;

  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md"))
    : [];

  const posts = files.map((file): Post => {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data, content } = matter(raw);

    const headings: { id: string; text: string }[] = [];
    const renderer = new marked.Renderer();
    // Post bodies start at level two. The h1 is rendered by the template
    // from frontmatter, so a heading level here maps straight through and
    // the document outline stays h1, h2, h3 with nothing skipped.
    renderer.heading = ({ text, depth }) => {
      const level = Math.min(Math.max(depth, 2), 6);
      const id = slugifyHeading(text);
      if (level === 2) headings.push({ id, text });
      return `<h${level} id="${id}">${text}</h${level}>\n`;
    };

    const html = marked.parse(content, {
      renderer,
      async: false,
      gfm: true,
    }) as string;

    const words = content.split(/\s+/).filter(Boolean).length;

    return {
      slug: file.replace(/\.md$/, ""),
      title: String(data.title ?? ""),
      seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      updated: String(data.updated ?? data.date ?? ""),
      category: (data.category ?? "Blog") as PostCategory,
      ctaTitle: data.ctaTitle ? String(data.ctaTitle) : undefined,
      ctaLead: data.ctaLead ? String(data.ctaLead) : undefined,
      html,
      wordCount: words,
      readingMinutes: Math.max(1, Math.round(words / 220)),
      headings,
    };
  });

  cache = posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/**
 * Related posts, by category first and recency second.
 *
 * The live site has almost no post to post linking at all, which leaves every
 * post a dead end and wastes the internal link equity the blog generates.
 */
/**
 * Read next, distributed rather than concentrated.
 *
 * The previous version took the first three posts in the same category, which
 * are always the three newest ones. Every post therefore pointed at the same
 * three, and the older half of the archive was reachable only from the index.
 * A crawler reads that as an archive with three important posts and nine
 * unimportant ones, which is not what it is.
 *
 * Walking forward from each post and wrapping around gives every post the
 * same number of inbound links, and it means reading through the archive by
 * following the links actually works instead of looping.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const all = getAllPosts();
  const current = all.find((post) => post.slug === slug);
  if (!current) return all.slice(0, limit);

  const pickFrom = (pool: Post[]) => {
    const index = pool.findIndex((post) => post.slug === slug);
    if (index === -1) return [];
    return Array.from({ length: pool.length - 1 }, (_, step) => {
      return pool[(index + step + 1) % pool.length];
    });
  };

  const sameCategory = pickFrom(
    all.filter((post) => post.category === current.category),
  );
  const others = all.filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );

  const seen = new Set<string>();
  return [...sameCategory, ...others]
    .filter((post) => {
      if (post.slug === slug || seen.has(post.slug)) return false;
      seen.add(post.slug);
      return true;
    })
    .slice(0, limit);
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
