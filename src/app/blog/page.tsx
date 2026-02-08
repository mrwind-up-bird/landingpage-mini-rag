import type { Metadata } from "next";
import { getGroupedByDate, getAllPosts, getAllTags } from "@/lib/blog-storage";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Developer Blog — MiniRAG",
  description:
    "Session notes, architecture decisions, and technical deep-dives from building MiniRAG.",
};

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function collectTags(posts: { tags: string[] }[]): string[] {
  const set = new Set<string>();
  for (const p of posts) for (const t of p.tags) set.add(t);
  return Array.from(set).sort();
}

export default function BlogIndex() {
  const groups = getGroupedByDate();
  const totalPosts = getAllPosts().length;
  const totalTags = getAllTags().length;

  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2 px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-4xl">
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

          {groups.length === 0 ? (
            <Reveal delay={100}>
              <p className="mt-12 text-center text-[var(--text-tertiary)]">
                No posts yet. Check back soon.
              </p>
            </Reveal>
          ) : (
            /* Timeline */
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute top-2 bottom-2 left-[11px] hidden w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--glass-border)] to-transparent sm:block"
                aria-hidden="true"
              />

              <div className="space-y-8">
                {groups.map((group, i) => {
                  const tags = collectTags(group.posts);
                  const shown = group.posts.slice(0, 4);
                  const remaining = group.posts.length - shown.length;

                  return (
                    <Reveal key={group.date} delay={80 + i * 80}>
                      <a
                        href={`/blog/${group.date}`}
                        className="group block sm:pl-10"
                      >
                        {/* Timeline dot */}
                        <div
                          className="absolute left-[7px] hidden h-[9px] w-[9px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_8px_var(--accent-glow)] sm:block"
                          style={{ marginTop: "7px" }}
                          aria-hidden="true"
                        />

                        <GlassCard className="overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
                          {/* Top accent stripe */}
                          <div
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent"
                            aria-hidden="true"
                          />

                          {/* Date row */}
                          <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <div className="flex items-baseline gap-3">
                              <time
                                dateTime={group.date}
                                className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--text-primary)] sm:text-xl"
                              >
                                {formatDate(group.date)}
                              </time>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                                {group.posts.length}{" "}
                                {group.posts.length === 1
                                  ? "entry"
                                  : "entries"}
                              </span>
                              <span className="text-[var(--accent)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
                                &rarr;
                              </span>
                            </div>
                          </div>

                          {/* Tags */}
                          {tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md bg-[var(--glass-bg-elevated)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Post list */}
                          <ul className="mt-5 space-y-3">
                            {shown.map((post, j) => (
                              <li key={post.slug} className="flex gap-3">
                                <span className="mt-0.5 shrink-0 font-[family-name:var(--font-mono)] text-xs text-[var(--text-tertiary)]">
                                  {String(j + 1).padStart(2, "0")}
                                </span>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                                    {post.title}
                                  </p>
                                  <p className="mt-0.5 line-clamp-1 text-xs text-[var(--text-tertiary)]">
                                    {post.excerpt}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>

                          {remaining > 0 && (
                            <p className="mt-3 text-xs font-medium text-[var(--accent)]/60">
                              +{remaining} more{" "}
                              {remaining === 1 ? "entry" : "entries"}
                            </p>
                          )}
                        </GlassCard>
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
