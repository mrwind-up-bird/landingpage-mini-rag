"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    question: "What is MiniRAG?",
    answer:
      "MiniRAG is an open-source, self-hosted Retrieval-Augmented Generation (RAG) chatbot platform. It lets you ingest your own documents (PDFs, DOCX, URLs, text), store them as vector embeddings, and chat with your data using any LLM provider — all under your control.",
  },
  {
    question: "Is MiniRAG free to use?",
    answer:
      "Yes. MiniRAG is open-source under the MIT license. You can use it for personal and commercial projects at no cost. You only pay for your own infrastructure (hosting, LLM API keys).",
  },
  {
    question: "Which LLM providers does MiniRAG support?",
    answer:
      "MiniRAG is provider-agnostic via LiteLLM. It supports OpenAI, Anthropic, Ollama (local models), and any other provider compatible with the OpenAI API format. You can switch providers per bot profile without changing code.",
  },
  {
    question: "How do I deploy MiniRAG?",
    answer:
      "Clone the repository, copy the .env.example file, and run docker compose up -d. The entire stack — PostgreSQL, Qdrant vector database, Redis, and the FastAPI backend — starts in under 5 minutes. See the Quickstart section above for step-by-step instructions.",
  },
  {
    question: "What document formats can MiniRAG ingest?",
    answer:
      "MiniRAG supports plain text, URLs (web scraping), PDF files, and DOCX documents. Documents are automatically chunked, embedded, and stored in the Qdrant vector database for semantic retrieval.",
  },
  {
    question: "Can I embed MiniRAG on my website?",
    answer:
      "Yes. MiniRAG includes an embeddable chat widget. Add a single <script> tag to any website and the widget appears as a floating chat button. It uses Shadow DOM for style isolation, so it won't conflict with your existing CSS.",
  },
  {
    question: "Is MiniRAG multi-tenant?",
    answer:
      "Yes. MiniRAG provides complete multi-tenant isolation. Each tenant has separate data, API tokens, RBAC permissions, and encrypted credentials. This makes it suitable for SaaS platforms and organizations serving multiple clients.",
  },
  {
    question: "What tech stack does MiniRAG use?",
    answer:
      "MiniRAG is built with FastAPI (Python) for the backend, PostgreSQL for structured data, Qdrant for vector storage, Redis for caching and task queues, and Celery for background processing. The admin dashboard uses a modern glassmorphism UI.",
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
