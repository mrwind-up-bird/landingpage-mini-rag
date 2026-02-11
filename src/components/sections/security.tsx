import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const protocols = [
  {
    protocol: "Argon2id",
    title: "Password Hashing",
    description:
      "Memory-hard algorithm that resists GPU and ASIC attacks. Industry-recommended for credential storage.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="12" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12V9a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="19" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    protocol: "Fernet (AES-128-CBC)",
    title: "Encryption at Rest",
    description:
      "LLM API keys and sensitive credentials encrypted before database storage. Keys never stored in plaintext.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="10" cy="18" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 14l8-8M19 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    protocol: "HMAC-SHA256",
    title: "Webhook Signatures",
    description:
      "Every webhook delivery is signed. Verify payload integrity and authenticity before processing events.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M6 14l5 5L22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    protocol: "JWT (HS256)",
    title: "Session Tokens",
    description:
      "Stateless authentication with signed tokens. No server-side session storage required.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12h20" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="16" r="1.5" fill="currentColor" />
        <path d="M12 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Security() {
  return (
    <section className="relative z-2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Security at every layer
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
              MiniRAG doesn&apos;t compromise on security. Four layers of protection
              for your data and credentials.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {protocols.map((item, i) => (
            <Reveal key={item.protocol} delay={i * 100}>
              <GlassCard className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <div className="inline-flex rounded-xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                    {item.icon}
                  </div>
                  <span className="rounded-md bg-[var(--glass-bg-elevated)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--accent)]">
                    {item.protocol}
                  </span>
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
