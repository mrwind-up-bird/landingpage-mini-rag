"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const scriptTag = `<script
  src="https://your-host/dashboard/widget/minirag-widget.js"
  data-bot-id="YOUR_BOT_ID"
  data-api-url="https://your-host"
  data-api-token="YOUR_TOKEN">
</script>`;

export function WidgetShowcase() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Embed anywhere in seconds
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
              Drop one script tag into any website. Shadow DOM keeps
              your styles clean.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Browser mockup */}
          <Reveal>
            <GlassCard className="!p-0 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-[var(--glass-border)] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <div className="ml-3 flex-1 rounded-md bg-[var(--glass-bg)] px-3 py-1 text-xs text-[var(--text-tertiary)]">
                  your-website.com
                </div>
              </div>

              {/* Page content area */}
              <div className="relative min-h-[280px] bg-[var(--glass-bg)] p-6">
                {/* Fake page lines */}
                <div className="space-y-3 opacity-20">
                  <div className="h-3 w-3/4 rounded bg-[var(--text-tertiary)]" />
                  <div className="h-3 w-1/2 rounded bg-[var(--text-tertiary)]" />
                  <div className="h-3 w-2/3 rounded bg-[var(--text-tertiary)]" />
                  <div className="mt-6 h-20 w-full rounded-lg bg-[var(--text-tertiary)]" />
                  <div className="h-3 w-5/6 rounded bg-[var(--text-tertiary)]" />
                  <div className="h-3 w-1/3 rounded bg-[var(--text-tertiary)]" />
                </div>

                {/* Widget mockup */}
                <div className="absolute right-4 bottom-4 w-72 rounded-2xl border border-[var(--glass-border)] bg-[rgba(10,10,30,0.95)] shadow-2xl">
                  <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-4 py-3">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      MiniRAG Assistant
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                  </div>
                  <div className="space-y-3 p-4">
                    {/* User message */}
                    <div className="ml-8 rounded-xl rounded-br-sm bg-[var(--accent)]/10 p-3 text-xs text-[var(--text-primary)]">
                      How do I reset my password?
                    </div>
                    {/* Bot message */}
                    <div className="mr-8 rounded-xl rounded-bl-sm bg-[var(--glass-bg-elevated)] p-3 text-xs text-[var(--text-secondary)]">
                      Navigate to Settings &rarr; Security &rarr; Reset
                      Password. You&apos;ll receive a confirmation email.
                      <div className="mt-2 text-[10px] text-[var(--accent)] opacity-60">
                        Source: help-center.md (0.92)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          {/* Script tag */}
          <Reveal delay={150}>
            <div className="flex flex-col gap-4">
              <GlassCard className="!p-0 overflow-hidden">
                <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-4 py-3">
                  <span className="text-xs text-[var(--text-tertiary)]">
                    HTML
                  </span>
                  <button
                    onClick={handleCopy}
                    className="rounded-lg px-3 py-1 text-xs text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="overflow-x-auto p-5 font-[family-name:var(--font-mono)] text-[13px] leading-6 text-[var(--text-secondary)]">
                  <code>{scriptTag}</code>
                </pre>
              </GlassCard>
              <p className="text-sm text-[var(--text-tertiary)]">
                Shadow DOM isolation means no CSS conflicts. Style it
                with CSS custom properties to match your brand.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
