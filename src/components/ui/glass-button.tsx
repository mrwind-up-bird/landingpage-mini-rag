import { type ReactNode, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--bg)] hover:bg-[#00b8e0] shadow-[0_0_20px_var(--accent-glow)]",
  ghost:
    "glass !bg-transparent hover:!bg-[var(--glass-bg-hover)] text-[var(--text-primary)]",
  danger:
    "bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/20 hover:bg-[var(--error)]/20",
};

export function GlassButton({
  children,
  variant = "primary",
  href,
  external,
  className = "",
  ...props
}: GlassButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-[family-name:var(--font-heading)] font-semibold text-sm transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:ring-offset-2 focus:ring-offset-[var(--bg)] ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={base}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
