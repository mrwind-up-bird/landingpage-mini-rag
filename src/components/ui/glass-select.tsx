import { type SelectHTMLAttributes } from "react";

interface GlassSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
}

export function GlassSelect({
  label,
  options,
  placeholder,
  className = "",
  id,
  ...props
}: GlassSelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-[var(--text-secondary)]"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text-primary)] backdrop-blur-[var(--glass-blur)] transition-colors duration-200 focus:border-[var(--accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" className="bg-[var(--bg)] text-[var(--text-tertiary)]">
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[var(--bg)]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
