import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const cards = [
  {
    title: "Bot Profiles",
    description:
      "Configure LLM provider, model, system prompt, and temperature per bot. Test conversations in real-time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 20c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Source Management",
    description:
      "Upload text, URLs, PDFs, DOCX. Monitor ingestion status, chunk counts, and embedding progress.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M6 4h10l6 6v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 4v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 16h10M9 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Chat History",
    description:
      "Browse all conversations. View source citations, token usage, and user feedback per message.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H8l-4 4V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 10h10M9 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Webhook Configuration",
    description:
      "Set delivery URLs, select events, view delivery logs. HMAC-SHA256 signature verification built in.",
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
    title: "Usage Analytics",
    description:
      "Track costs per model, token consumption over time, and export detailed reports as CSV.",
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
  {
    title: "User & Role Management",
    description:
      "Invite users, assign roles (admin/member), manage API tokens per tenant.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 16c2.761 1.333 4 3.667 4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function DashboardShowcase() {
  return (
    <section id="dashboard" className="relative z-2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Everything you need in one dashboard
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
              Manage your entire RAG platform from a single interface. No CLI required.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <GlassCard className="h-full">
                <div className="mb-4 inline-flex rounded-xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                  {card.icon}
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {card.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
