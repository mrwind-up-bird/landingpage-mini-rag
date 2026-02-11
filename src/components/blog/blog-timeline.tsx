"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Post } from "@/lib/blog-storage";
import { BlogTimelineNode } from "./blog-timeline-node";

interface BlogTimelineProps {
  posts: Post[];
}

export function BlogTimeline({ posts }: BlogTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Detect date boundaries for dividers
  let lastDate = "";

  return (
    <div ref={containerRef} className="timeline-container">
      {/* SVG spine */}
      <svg
        className="timeline-spine"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="spine-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="var(--glass-border)"
          strokeWidth="1"
        />
        {/* Animated progress line */}
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#spine-gradient)"
          strokeWidth="2"
          style={{ pathLength }}
        />
      </svg>

      {/* Timeline nodes */}
      {posts.map((post, i) => {
        const showDateDivider = post.date !== lastDate;
        lastDate = post.date;

        return (
          <div key={`${post.date}-${post.slug}`}>
            {showDateDivider && (
              <div className="timeline-date-divider">
                <span className="font-[family-name:var(--font-heading)] text-xs font-bold tracking-wide uppercase text-[var(--accent)]">
                  {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
            <BlogTimelineNode post={post} index={i} />
          </div>
        );
      })}
    </div>
  );
}
