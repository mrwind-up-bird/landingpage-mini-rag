import { type TextareaHTMLAttributes } from "react";

interface GlassTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function GlassTextarea({ label, className = "", id, ...props }: GlassTextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[var(--text-secondary)]"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] backdrop-blur-[var(--glass-blur)] transition-colors duration-200 focus:border-[var(--accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 resize-y min-h-[120px] ${className}`}
        {...props}
      />
    </div>
  );
}
