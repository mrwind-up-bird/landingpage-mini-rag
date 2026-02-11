"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    question: "What makes MiniRAG different from hosted RAG solutions?",
    answer:
      "You own everything. MiniRAG runs on your infrastructure \u2014 your data never leaves your servers. No vendor lock-in, no per-query pricing, no usage limits. Full source code under MIT.",
  },
  {
    question: "Can I use MiniRAG in production?",
    answer:
      "Yes. MiniRAG is battle-tested with 129 automated tests (pytest + Newman), async FastAPI for high concurrency, connection pooling, and proper error handling. It runs PostgreSQL, Qdrant, and Redis \u2014 all production-grade infrastructure.",
  },
  {
    question: "Which LLM providers does MiniRAG support?",
    answer:
      "Any provider compatible with the OpenAI API format via LiteLLM: OpenAI, Anthropic, Google Gemini, Ollama (local models), Azure OpenAI, and more. Switch providers per bot profile without code changes.",
  },
  {
    question: "How does the embeddable widget work?",
    answer:
      "Add one <script> tag to any website. The widget loads in a Shadow DOM for complete style isolation \u2014 no CSS conflicts. Customize colors, position, and behavior with CSS custom properties and data attributes.",
  },
  {
    question: "What does the admin dashboard include?",
    answer:
      "Bot profile management, document source ingestion, chat history with feedback tracking, webhook configuration, usage analytics with cost breakdowns, and user role management. All behind a glassmorphism UI with built-in chat testing.",
  },
  {
    question: "How secure is MiniRAG?",
    answer:
      "Four layers: Argon2id for password hashing, Fernet (AES-128-CBC) for encrypting LLM API keys at rest, HMAC-SHA256 for signed webhook deliveries, and JWT (HS256) for stateless session tokens. Multi-tenant isolation ensures complete data separation.",
  },
  {
    question: "What infrastructure does MiniRAG require?",
    answer:
      "Docker and Docker Compose. The stack includes PostgreSQL (structured data), Qdrant (vector storage), Redis (caching and task queues), and the FastAPI application. Minimum 2GB RAM recommended. All services are containerized.",
  },
  {
    question: "Can I run MiniRAG locally for development?",
    answer:
      "Yes. Use the manual setup: create a Python virtualenv, install dependencies, run the supporting services with Docker Compose, and start the FastAPI server with hot-reload. Full development docs in the README.",
  },
];

// JSON-LD structured data for Google rich results
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FAQ() {
  return (
    <section id="faq" className="relative z-2 px-4 py-20 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
              Everything you need to know about MiniRAG.
            </p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={60 + i * 40}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass !rounded-2xl">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-[family-name:var(--font-heading)] text-[15px] font-semibold text-[var(--text-primary)] sm:text-base">
          {question}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`shrink-0 text-[var(--accent)] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <path
            d="M10 4v12M4 10h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
