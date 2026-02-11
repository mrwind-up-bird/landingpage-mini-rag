"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

// ── Spring configs ──

export const springDefault = { type: "spring", stiffness: 260, damping: 20 } as const;
export const springGentle = { type: "spring", stiffness: 120, damping: 14 } as const;

// ── Shared variants ──

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
  transition: springDefault,
};

// ── MotionReveal ──

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MotionReveal({
  children,
  delay = 0,
  className = "",
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReduced ? false : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{
        ...springGentle,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
