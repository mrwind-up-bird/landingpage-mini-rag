import type { Metadata } from "next";
import { getGroupedByDate, getAllPosts, getAllTags } from "@/lib/blog-storage";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { BlogTimeline } from "@/components/blog/blog-timeline";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Developer Blog — MiniRAG",
  description:
    "Session notes, architecture decisions, and technical deep-dives from building MiniRAG.",
};

export const dynamic = "force-dynamic";

export default function BlogIndex() {
  const groups = getGroupedByDate();
  const posts = getAllPosts();
  const totalPosts = posts.length;
  const totalTags = getAllTags().length;

  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2 px-4 pt-24 pb-20 sm:px-6 sm:pt-28 md:pt-56">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <Reveal>
            <div className="mb-6">
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                Developer Blog
              </h1>
              <p className="mt-4 max-w-lg text-[var(--text-secondary)]">
                Session notes, architecture decisions, and technical
                deep-dives from building MiniRAG.
              </p>
            </div>
          </Reveal>

          {/* Stats bar */}
          <Reveal delay={60}>
            <div className="mb-12 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--accent)]">
                  {totalPosts}
                </span>
                <span className="text-[var(--text-tertiary)]">
                  {totalPosts === 1 ? "post" : "posts"}
                </span>
              </div>
              <span className="h-4 w-px bg-[var(--glass-border)]" />
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                  {groups.length}
                </span>
                <span className="text-[var(--text-tertiary)]">
                  {groups.length === 1 ? "session" : "sessions"}
                </span>
              </div>
              <span className="h-4 w-px bg-[var(--glass-border)]" />
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                  {totalTags}
                </span>
                <span className="text-[var(--text-tertiary)]">topics</span>
              </div>
            </div>
          </Reveal>

          {totalPosts === 0 ? (
            <Reveal delay={100}>
              <p className="mt-12 text-center text-[var(--text-tertiary)]">
                No posts yet. Check back soon.
              </p>
            </Reveal>
          ) : (
            <BlogTimeline posts={posts} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
