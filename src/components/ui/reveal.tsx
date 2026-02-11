"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { fadeInUp, springGentle } from "./motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
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
