"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 129, suffix: "", label: "Tests" },
  { value: 0, suffix: "", label: "Multi-Tenant" },
  { value: 5, suffix: "-Minute", label: "Setup" },
  { value: 0, suffix: "", label: "MIT Licensed" },
];

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView || value === 0 || prefersReduced) {
      if (inView) setDisplay(value);
      return;
    }

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value, prefersReduced]);

  return <>{display}</>;
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="relative z-2 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div
            ref={ref}
            className="glass flex flex-wrap items-center justify-center gap-6 rounded-2xl px-6 py-5 sm:gap-10 sm:px-10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-2 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              >
                {stat.value > 0 ? (
                  <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--accent)]">
                    <AnimatedNumber value={stat.value} inView={isInView} />
                    {stat.suffix}
                  </span>
                ) : null}
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  {stat.value > 0 ? stat.label : `${stat.label}`}
                </span>
                {stat.value === 0 && (
                  <span className="inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                )}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
