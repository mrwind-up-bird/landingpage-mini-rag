import { GlassButton } from "@/components/ui/glass-button";
import { Reveal } from "@/components/ui/reveal";

export function CTA() {
  return (
    <section className="relative z-2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="glass p-10 text-center sm:p-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Deploy your RAG chatbot today
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[var(--text-secondary)]">
              Open-source. MIT licensed. Production-ready. Join developers
              building intelligent chatbots with MiniRAG.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <GlassButton
                href="https://github.com/mrwind-up-bird/mini-chat-rag"
                external
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Star on GitHub
              </GlassButton>
              <GlassButton
                href="https://github.com/mrwind-up-bird/mini-chat-rag#readme"
                variant="ghost"
                external
              >
                Read the Docs
              </GlassButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
