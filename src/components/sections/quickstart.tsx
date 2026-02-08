"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const tabs = [
  {
    label: "Docker",
    code: `git clone https://github.com/mrwind-up-bird/mini-chat-rag.git
cd mini-chat-rag
cp .env.example .env
docker compose up -d`,
  },
  {
    label: "Manual",
    code: `python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
docker compose up -d postgres qdrant redis
uvicorn app.main:app --reload`,
  },
  {
    label: "Widget",
    code: `<script
  src="https://your-host/dashboard/widget/minirag-widget.js"
  data-bot-id="YOUR_BOT_ID"
  data-api-url="https://your-host"
  data-api-token="YOUR_TOKEN">
</script>`,
  },
];

export function Quickstart() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tabs[active].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quickstart" className="relative z-2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Quickstart
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
              Get up and running in your preferred way.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <GlassCard className="!p-0 overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-[var(--glass-border)]">
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActive(i)}
                  className={`flex-1 px-4 py-3.5 text-sm font-medium transition-colors ${
                    active === i
                      ? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code block */}
            <div className="relative">
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 rounded-lg px-3 py-1 text-xs text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <pre className="overflow-x-auto p-6 font-[family-name:var(--font-mono)] text-[13px] leading-7 text-[var(--text-secondary)]">
                <code>{tabs[active].code}</code>
              </pre>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
