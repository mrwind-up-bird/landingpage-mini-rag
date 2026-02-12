import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Message Sent — MiniRAG",
  robots: { index: false, follow: false },
};

const steps = [
  {
    number: "1",
    title: "We review your message",
    description: "Our team reads every inquiry and routes it to the right person.",
  },
  {
    number: "2",
    title: "Expect a reply within 24h",
    description: "We aim to respond within one business day with next steps.",
  },
  {
    number: "3",
    title: "We build a plan together",
    description: "Whether it's a demo, integration help, or partnership — let's figure it out.",
  },
];

export default function SuccessPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2 mx-auto max-w-4xl px-4 pb-20 pt-32 sm:px-6 md:pt-60">
        <Reveal>
          <div className="mb-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--success)] bg-[var(--success)]/10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Message Sent
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[var(--text-secondary)]">
              Thanks for reaching out! Here&apos;s what happens next.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <GlassCard key={step.number} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--accent)]">
                  {step.number}
                </div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 text-center">
            <GlassButton href="/">Back to Home</GlassButton>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
