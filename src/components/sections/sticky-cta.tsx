"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GlassButton } from "@/components/ui/glass-button";

const HIDDEN_PATHS = ["/contact", "/success"];

export function StickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("cta-dismissed")) {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    function onScroll() {
      const threshold = document.documentElement.scrollHeight * 0.5;
      setVisible(window.scrollY + window.innerHeight > threshold);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = dismissed || HIDDEN_PATHS.includes(pathname);

  function dismiss() {
    setDismissed(true);
    sessionStorage.setItem("cta-dismissed", "1");
  }

  return (
    <AnimatePresence>
      {visible && !hidden && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-sm text-[var(--text-secondary)] sm:text-base">
              Ready to deploy your RAG chatbot?
            </p>
            <div className="flex items-center gap-2">
              <GlassButton href="/contact" className="whitespace-nowrap text-xs sm:text-sm px-4 py-2">
                Get Started
              </GlassButton>
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="rounded-lg p-2 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
