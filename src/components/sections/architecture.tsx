"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const nodes = [
  {
    label: "User",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 25c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "FastAPI",
    sublabel: "API Gateway",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Embed",
    sublabel: "LLM Provider",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M14 3v3M14 22v3M3 14h3M22 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Qdrant",
    sublabel: "Vector Store",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3l10 6v10l-10 6L4 19V9l10-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 3v10l10 6M14 13L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "LLM",
    sublabel: "Completion",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12h10M9 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="21" cy="8" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "SSE",
    sublabel: "Response",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 10c4-4 8 4 12 0s8-4 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 18c4-4 8 4 12 0s8-4 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

const supporting = [
  {
    label: "PostgreSQL",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <ellipse cx="10" cy="5" rx="7" ry="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 5v10c0 1.657 3.134 3 7 3s7-1.343 7-3V5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 10c0 1.657 3.134 3 7 3s7-1.343 7-3" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: "Redis",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M2 10l8 5 8-5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M2 7l8 5 8-5-8-5-8 5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M2 13l8 5 8-5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ArrowSvg() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = useReducedMotion();

  return (
    <svg
      ref={ref}
      width="32"
      height="12"
      viewBox="0 0 32 12"
      fill="none"
      className="shrink-0 text-[var(--accent)] max-lg:hidden"
      aria-hidden="true"
    >
      <motion.path
        d="M0 6h28M24 2l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReduced ? {} : { pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

function ArrowSvgVertical() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = useReducedMotion();

  return (
    <svg
      ref={ref}
      width="12"
      height="32"
      viewBox="0 0 12 32"
      fill="none"
      className="shrink-0 text-[var(--accent)] lg:hidden"
      aria-hidden="true"
    >
      <motion.path
        d="M6 0v28M2 24l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReduced ? {} : { pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

export function Architecture() {
  return (
    <section id="architecture" className="relative z-2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              How the pipeline works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
              Every query flows through a battle-tested retrieval-augmented generation pipeline.
              Embeddings, vector search, and LLM completion in one seamless request.
            </p>
          </div>
        </Reveal>

        {/* Pipeline flow */}
        <Reveal delay={100}>
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-2">
            {nodes.map((node, i) => (
              <div key={node.label} className="flex flex-col items-center gap-3 lg:flex-row lg:gap-2">
                <GlassCard className="flex w-36 flex-col items-center gap-2 !p-4 text-center">
                  <div className="text-[var(--accent)]">{node.icon}</div>
                  <span className="font-[family-name:var(--font-heading)] text-sm font-semibold">
                    {node.label}
                  </span>
                  {node.sublabel && (
                    <span className="text-xs text-[var(--text-tertiary)]">{node.sublabel}</span>
                  )}
                </GlassCard>
                {i < nodes.length - 1 && (
                  <>
                    <ArrowSvg />
                    <ArrowSvgVertical />
                  </>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Supporting services */}
        <Reveal delay={250}>
          <div className="mt-10 flex items-center justify-center gap-6">
            <span className="text-xs font-medium text-[var(--text-tertiary)]">
              Backed by
            </span>
            {supporting.map((svc) => (
              <div
                key={svc.label}
                className="flex items-center gap-2 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-2"
              >
                <span className="text-[var(--accent)]">{svc.icon}</span>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)]">
                  {svc.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Explanation */}
        <Reveal delay={350}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-[var(--text-tertiary)]">
            User queries hit the FastAPI gateway, which embeds the question, performs a similarity
            search against Qdrant, retrieves the top-k chunks, and streams an LLM completion back
            via Server-Sent Events. PostgreSQL stores metadata, Redis handles rate limiting and
            caching.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
