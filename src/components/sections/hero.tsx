"use client";

import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const badges = [
  "129 Tests Passing",
  "Multi-Tenant",
  "Provider-Agnostic",
  "Real-Time Streaming",
];

const textStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
} as const;

const textChild = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

const terminalSpring = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 18, delay: 0.3 },
  },
} as const;

export function Hero() {
  return (
    <section className="relative z-2 px-4 pt-24 pb-20 sm:px-6 sm:pt-28 md:pt-56 lg:pt-64">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Copy */}
          <motion.div
            className="text-center lg:text-left"
            variants={textStagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={textChild}>
              <h1 className="font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                Your AI.
                <br />
                Your Data.
                <br />
                Your Infrastructure.
              </h1>
            </motion.div>
            <motion.div variants={textChild}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text-secondary)] mx-auto lg:mx-0">
                The open-source RAG platform that puts you in control.
                Multi-tenant architecture. Provider-agnostic LLMs. Real-time
                streaming. Deploy in 5 minutes.
              </p>
            </motion.div>
            <motion.div variants={textChild}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <GlassButton href="#quickstart">Get Started</GlassButton>
                <GlassButton
                  href="https://github.com/mrwind-up-bird/mini-chat-rag"
                  variant="ghost"
                  external
                >
                  <GitHubSmall />
                  View on GitHub
                </GlassButton>
              </div>
            </motion.div>
            <motion.div variants={textChild}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1 text-xs text-[var(--text-tertiary)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Terminal mockup */}
          <motion.div
            variants={terminalSpring}
            initial="hidden"
            animate="show"
          >
            <GlassCard className="font-[family-name:var(--font-mono)] text-sm !p-0 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[var(--glass-border)] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-[var(--text-tertiary)]">terminal</span>
              </div>
              <pre className="overflow-x-auto p-5 text-[13px] leading-6">
                <code>
                  <Line prompt>docker compose up -d</Line>
                  <Line className="text-[var(--success)]">✓ postgres ready</Line>
                  <Line className="text-[var(--success)]">✓ qdrant ready</Line>
                  <Line className="text-[var(--success)]">✓ redis ready</Line>
                  <Line className="text-[var(--success)]">✓ minirag-api ready on :8000</Line>
                  <Line />
                  <Line prompt className="text-[var(--accent)]">curl -X POST localhost:8000/v1/tenants \</Line>
                  <Line className="text-[var(--accent)]">{"  "}-H &quot;Authorization: Bearer $ADMIN_TOKEN&quot; \</Line>
                  <Line className="text-[var(--accent)]">{"  "}-d &apos;{`{"name":"my-org"}`}&apos;</Line>
                  <Line className="text-[var(--warm)]">{`{"id":"t_9k3...","name":"my-org","status":"active"}`}</Line>
                  <Line />
                  <Line prompt className="text-[var(--accent)]">curl localhost:8000/v1/chat \</Line>
                  <Line className="text-[var(--accent)]">{"  "}-H &quot;Authorization: Bearer $BOT_TOKEN&quot; \</Line>
                  <Line className="text-[var(--accent)]">{"  "}-d &apos;{`{"message":"How does ingestion work?"}`}&apos;</Line>
                  <Line className="text-[var(--warm)]">{`{"answer":"Documents are chunked, embedded, and...","sources":[...]}`}</Line>
                </code>
              </pre>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Line({
  children,
  prompt,
  className = "",
}: {
  children?: React.ReactNode;
  prompt?: boolean;
  className?: string;
}) {
  return (
    <span className={`block ${className}`}>
      {prompt && <span className="text-[var(--text-tertiary)]">$ </span>}
      {children}
      {"\n"}
    </span>
  );
}

function GitHubSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
