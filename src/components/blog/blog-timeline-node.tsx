"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Post } from "@/lib/blog-storage";
import { GlassCard } from "@/components/ui/glass-card";
import { springGentle } from "@/components/ui/motion";

interface BlogTimelineNodeProps {
  post: Post;
  index: number;
}

export function BlogTimelineNode({ post, index }: BlogTimelineNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion();

  const isLeft = index % 2 === 0;

  const variants = {
    hidden: {
      opacity: 0,
      x: prefersReduced ? 0 : isLeft ? -40 : 40,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`timeline-node ${isLeft ? "timeline-node-left" : "timeline-node-right"}`}
      initial={prefersReduced ? false : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ ...springGentle, delay: 0.05 * (index % 6) }}
    >
      {/* Dot on spine */}
      <div className="timeline-node-dot" aria-hidden="true" />

      {/* Horizontal connector */}
      <div className="timeline-connector" aria-hidden="true" />

      {/* Card */}
      <GlassCard as="article" className="timeline-card">
        <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
          <time dateTime={post.date} className="font-[family-name:var(--font-mono)]">
            {post.date}
          </time>
          <span>&middot;</span>
          <span>{post.author}</span>
        </div>

        <h3 className="mt-2 font-[family-name:var(--font-heading)] text-base font-bold leading-snug text-[var(--text-primary)]">
          {post.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm text-[var(--text-secondary)]">
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[var(--glass-bg-elevated)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <a
          href={`/blog/${post.date}/${post.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[#00b8e0]"
        >
          Read <span aria-hidden="true">&rarr;</span>
        </a>
      </GlassCard>
    </motion.div>
  );
}
