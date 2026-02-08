import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostByDateAndSlug } from "@/lib/blog-storage";
import { renderMarkdown } from "@/lib/markdown";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { BlogRenderer } from "@/components/blog/blog-renderer";
import { Reveal } from "@/components/ui/reveal";

interface Props {
  params: Promise<{ date: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    date: post.date,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date, slug } = await params;
  const post = getPostByDateAndSlug(date, slug);
  if (!post) return { title: "Post Not Found — MiniRAG" };

  return {
    title: `${post.title} — MiniRAG Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPost({ params }: Props) {
  const { date, slug } = await params;
  const post = getPostByDateAndSlug(date, slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2 px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
        <article className="mx-auto max-w-3xl">
          <Reveal>
            <a
              href={`/blog/${date}`}
              className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent)]"
            >
              &larr; Back to {date}
            </a>
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-3 text-sm text-[var(--text-tertiary)]">
                <span>{post.author}</span>
                <span>&middot;</span>
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </header>
          </Reveal>

          <Reveal delay={100}>
            <BlogRenderer html={html} />
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
