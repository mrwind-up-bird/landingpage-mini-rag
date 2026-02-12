import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { runSeoAudit, type AuditCheck } from "@/lib/seo-audit";

export const metadata: Metadata = {
  title: "Traffic & SEO — MiniRAG",
  robots: { index: false, follow: false },
};

const statusColor: Record<AuditCheck["status"], string> = {
  pass: "var(--success)",
  warn: "var(--warning, #fbbf24)",
  fail: "var(--error)",
};

const statusIcon: Record<AuditCheck["status"], string> = {
  pass: "\u2713",
  warn: "\u25CB",
  fail: "\u2717",
};

export default function TrafficPage() {
  const audits = runSeoAudit();
  const totalChecks = audits.reduce((sum, a) => sum + a.checks.length, 0);
  const passing = audits.reduce(
    (sum, a) => sum + a.checks.filter((c) => c.status === "pass").length,
    0,
  );
  const warnings = audits.reduce(
    (sum, a) => sum + a.checks.filter((c) => c.status === "warn").length,
    0,
  );
  const failing = audits.reduce(
    (sum, a) => sum + a.checks.filter((c) => c.status === "fail").length,
    0,
  );

  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2 mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 md:pt-60">
        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            Traffic & SEO Dashboard
          </h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            Live traffic data is available in the{" "}
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline underline-offset-2 hover:text-[#00b8e0]"
            >
              Vercel Dashboard
            </a>
            . This page shows an automated SEO health audit.
          </p>
        </div>

        {/* Overview stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <GlassCard className="text-center">
            <p className="text-sm text-[var(--text-tertiary)]">Pages Audited</p>
            <p className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold">
              {audits.length}
            </p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-sm text-[var(--text-tertiary)]">Passing</p>
            <p className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold" style={{ color: "var(--success)" }}>
              {passing}
            </p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-sm text-[var(--text-tertiary)]">Warnings</p>
            <p className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold" style={{ color: "var(--warning, #fbbf24)" }}>
              {warnings}
            </p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-sm text-[var(--text-tertiary)]">Failing</p>
            <p className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold" style={{ color: "var(--error)" }}>
              {failing}
            </p>
          </GlassCard>
        </div>

        {/* Score bar */}
        <GlassCard className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
              Overall SEO Score
            </h2>
            <span className="font-[family-name:var(--font-heading)] text-xl font-bold" style={{ color: "var(--success)" }}>
              {totalChecks > 0 ? Math.round((passing / totalChecks) * 100) : 0}%
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--glass-bg)]">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${totalChecks > 0 ? (passing / totalChecks) * 100 : 0}%`,
                background: "var(--success)",
              }}
            />
          </div>
        </GlassCard>

        {/* Per-page audits */}
        <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold">
          Page-by-Page Audit
        </h2>
        <div className="flex flex-col gap-6">
          {audits.map((audit) => (
            <GlassCard key={audit.path}>
              <h3 className="mb-4 font-[family-name:var(--font-heading)] font-semibold text-lg">
                <code className="rounded bg-[var(--glass-bg)] px-2 py-1 text-sm font-[family-name:var(--font-fira-code)]">
                  {audit.path}
                </code>
              </h3>
              <div className="flex flex-col gap-2">
                {audit.checks.map((check) => (
                  <div
                    key={check.label}
                    className="flex items-center justify-between rounded-lg bg-[var(--glass-bg)] px-4 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          color: statusColor[check.status],
                          background: `color-mix(in srgb, ${statusColor[check.status]} 15%, transparent)`,
                        }}
                      >
                        {statusIcon[check.status]}
                      </span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {check.label}
                      </span>
                    </div>
                    <span className="text-sm text-[var(--text-tertiary)]">
                      {check.detail}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
