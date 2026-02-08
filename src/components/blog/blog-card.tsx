import { type PostMeta } from "@/lib/blog-storage";
import { GlassCard } from "@/components/ui/glass-card";

interface BlogCardProps {
  post: PostMeta;
  date: string;
}

export function BlogCard({ post, date }: BlogCardProps) {
  return (
    <a href={`/blog/${date}/${post.slug}`} className="group block">
      <GlassCard as="article" className="h-full transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-semibold leading-snug group-hover:text-[var(--accent)] transition-colors">
          {post.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
          <span>{post.date}</span>
          <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">
            Read &rarr;
          </span>
        </div>
      </GlassCard>
    </a>
  );
}
