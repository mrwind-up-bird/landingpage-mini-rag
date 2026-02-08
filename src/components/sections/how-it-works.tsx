import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    number: "01",
    title: "Deploy",
    description:
      "Clone the repo, run docker compose up -d, and bootstrap your first tenant. You're live in under 5 minutes.",
    code: "docker compose up -d",
  },
  {
    number: "02",
    title: "Ingest",
    description:
      "Upload sources — text, URLs, PDFs, DOCX files. MiniRAG auto-chunks, embeds, and upserts vectors into Qdrant.",
    code: "POST /v1/sources",
  },
  {
    number: "03",
    title: "Chat",
    description:
      "Users ask questions, RAG retrieves relevant context from your knowledge base, and the LLM generates grounded answers.",
    code: "POST /v1/chat",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Three steps to production
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
              From zero to a fully functional RAG chatbot in minutes,
              not weeks.
            </p>
          </div>
        </Reveal>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line (desktop) */}
          <div
            className="absolute top-16 left-[16.67%] right-[16.67%] hidden h-px border-t border-dashed border-[var(--glass-border)] md:block"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 120}>
              <div className="flex flex-col items-center text-center">
                <span className="mb-6 font-[family-name:var(--font-heading)] text-5xl font-extrabold text-[var(--accent)] opacity-30">
                  {step.number}
                </span>
                <GlassCard className="w-full">
                  <h3 className="mb-3 font-[family-name:var(--font-heading)] text-xl font-bold">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.description}
                  </p>
                  <code className="inline-block rounded-lg bg-[var(--accent-soft)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs text-[var(--accent)]">
                    {step.code}
                  </code>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
