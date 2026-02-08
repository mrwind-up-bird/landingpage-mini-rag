import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const features = [
  {
    title: "Multi-Tenant Isolation",
    description:
      "Complete data separation per tenant. API tokens, RBAC, encrypted credentials.",
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
      "Ingest text, URLs, PDFs, DOCX. Auto-chunk, embed, vector-store in Qdrant.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 7h20M4 14h20M4 21h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="21" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 19v4M20 21h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Provider-Agnostic LLM",
    description:
      "OpenAI, Anthropic, Ollama, any LiteLLM provider. Switch per bot profile.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 4v20M4 14h20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.5 7.5Q14 12 21.5 7.5M6.5 20.5Q14 16 21.5 20.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Embeddable Widget",
    description:
      'One <script> tag. Shadow DOM. Custom CSS props. Any website, 30 seconds.',
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
      "Glassmorphism UI. Bots, sources, users, tokens, analytics. Built-in chat testing.",
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
    title: "Battle-Tested",
    description:
      "77 pytest + 93 Newman assertions. Async FastAPI. PostgreSQL + Qdrant + Redis.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
