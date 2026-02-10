import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDates, getPostsByDate } from "@/lib/blog-storage";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/ui/reveal";

interface Props {
  params: Promise<{ date: string }>;
}

export async function generateStaticParams() {
  return getAllDates().map((date) => ({ date }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  return {
    title: `${date} — Developer Blog — MiniRAG`,
    description: `All blog entries from ${date}.`,
  };
}

export const dynamic = "force-dynamic";

export default async function BlogDatePage({ params }: Props) {
  const { date } = await params;
  const posts = getPostsByDate(date);
  if (posts.length === 0) notFound();

  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2 px-4 pt-24 pb-20 sm:px-6 sm:pt-28 md:pt-56">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <a
              href="/blog"
              className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent)]"
            >
              &larr; All dates
            </a>
            <div className="mb-12">
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                <time dateTime={date}>{date}</time>
              </h1>
              <p className="mt-3 text-[var(--text-secondary)]">
                {posts.length} {posts.length === 1 ? "entry" : "entries"}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={80 + i * 60}>
                <BlogCard post={post} date={date} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
