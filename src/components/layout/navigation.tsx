"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Quickstart", href: "/#quickstart" },
  { label: "Blog", href: "/blog" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass !rounded-none border-x-0 border-t-0"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Background image — full width via CSS bg, 100% opacity */}
      <div
        className="absolute inset-0 bg-[url('/header-minirag.png')] bg-cover bg-center"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[56px] max-w-6xl items-end justify-between px-4 pb-3 pt-3 sm:px-6 md:min-h-[200px] md:pb-4">
        {/* Logo — links home, no text (image is the branding) */}
        <a href="/" aria-label="MiniRAG Home" className="mb-1 h-6 w-6 md:mb-0" />

        {/* Desktop links — glass pills, bottom-aligned */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl bg-[rgba(5,5,16,0.5)] px-4 py-2 text-[15px] font-medium text-[var(--text-primary)] backdrop-blur-sm transition-colors hover:bg-[rgba(5,5,16,0.7)] hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/mrwind-up-bird/mini-chat-rag"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="rounded-xl bg-[rgba(5,5,16,0.5)] p-2.5 text-[var(--text-primary)] backdrop-blur-sm transition-colors hover:bg-[rgba(5,5,16,0.7)] hover:text-[var(--accent)]"
          >
            <GitHubIcon />
          </a>
          <a
            href="/#quickstart"
            className="inline-flex items-center rounded-xl bg-[var(--accent)] px-6 py-2.5 text-[15px] font-semibold text-[var(--bg)] transition-colors hover:bg-[#00b8e0]"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-primary)] transition-colors hover:bg-[var(--glass-bg-hover)] md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass mx-4 mb-4 flex flex-col gap-1 p-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-bg-hover)] hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
          <hr className="my-2 border-[var(--glass-border)]" />
          <a
            href="https://github.com/mrwind-up-bird/mini-chat-rag"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-bg-hover)] hover:text-[var(--text-primary)]"
          >
            <GitHubIcon /> GitHub
          </a>
          <a
            href="/#quickstart"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition-colors hover:bg-[#00b8e0]"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
