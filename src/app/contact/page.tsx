import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact — MiniRAG | Request a Demo & Get in Touch",
  description:
    "Request a demo of MiniRAG, ask technical questions, or explore partnership opportunities. Self-hosted RAG chatbot platform for businesses.",
  keywords: [
    "MiniRAG demo",
    "RAG chatbot demo",
    "contact MiniRAG",
    "self-hosted AI chatbot",
    "AI chatbot for business",
  ],
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2 mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 md:pt-60">
        <Reveal>
          <div className="mb-10 text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
              Interested in deploying MiniRAG for your team? Have a technical question?
              We&apos;d love to hear from you.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
