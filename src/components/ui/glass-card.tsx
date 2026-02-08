import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  as?: "div" | "article" | "section";
}

export function GlassCard({
  children,
  className = "",
  elevated = false,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={`glass ${elevated ? "!bg-[var(--glass-bg-elevated)]" : ""} p-6 sm:p-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
