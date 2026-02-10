const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Quickstart", href: "/#quickstart" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com/mrwind-up-bird/mini-chat-rag", external: true },
      { label: "Documentation", href: "https://github.com/mrwind-up-bird/mini-chat-rag#readme", external: true },
      { label: "Widget Guide", href: "/#quickstart" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "MIT License", href: "https://github.com/mrwind-up-bird/mini-chat-rag/blob/main/LICENSE", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-2 border-t border-[var(--glass-border)] mt-32">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-[var(--glass-border)] pt-8 text-center text-sm text-[var(--text-tertiary)]">
          Built by Oli &middot; Open Source under MIT
        </div>
      </div>
    </footer>
  );
}
