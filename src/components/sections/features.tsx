import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const features = [
  {
    title: "Multi-Tenant Isolation",
    description:
      "Complete data separation. tenant_id on every query, dedicated API tokens, and role-based access control.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="12" width="10" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="12" width="10" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12V8a6 6 0 1112 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "RAG Pipeline",
    description:
      "Ingest text, URLs, PDFs, and DOCX files. Auto-chunk, embed with any model, and vector-store in Qdrant.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 7h20M4 14h20M4 21h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="21" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 19v4M20 21h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Provider-Agnostic LLMs",
    description:
      "OpenAI, Anthropic, Google, Ollama — switch providers per bot profile. Powered by LiteLLM.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 4v20M4 14h20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.5 7.5Q14 12 21.5 7.5M6.5 20.5Q14 16 21.5 20.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Real-Time Streaming",
    description:
      "Server-Sent Events with structured protocol: sources \u2192 content deltas \u2192 completion. Sub-second first token.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 10c4-4 8 4 12 0s8-4 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 18c4-4 8 4 12 0s8-4 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Embeddable Widget",
    description:
      "One script tag. Shadow DOM isolation. CSS custom properties for theming. Any website, 30 seconds.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 12l-3 3 3 3M18 12l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 11l-2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Admin Dashboard",
    description:
      "Manage bot profiles, sources, chat history, and analytics. Built-in chat testing with streaming preview.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Webhooks & Events",
    description:
      "Real-time notifications for source.ingested, source.failed, chat.message. HMAC-SHA256 signed payloads.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="8" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 18l6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 12v6a2 2 0 01-2 2h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 22l-2-2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Auto-Refresh",
    description:
      "Scheduled URL re-ingestion — hourly, daily, or weekly. Keep your knowledge base current automatically via ARQ cron.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 8v6l4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 6l-1 4-4-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Usage Analytics",
    description:
      "Cost tracking per model, token usage breakdown, user feedback analytics, and CSV export.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 24V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 24V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 24V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 24V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 12l6-4 6 6 6-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="relative z-2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Everything you need for RAG
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
              A complete platform for building, deploying, and managing
              retrieval-augmented generation chatbots.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 80}>
              <GlassCard className="h-full">
                <div className="mb-4 inline-flex rounded-xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
