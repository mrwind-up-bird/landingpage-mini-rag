import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import { ChatbotLoader } from "@/components/chatbot/chatbot-loader";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://landingpage-mini-rag.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "MiniRAG — Open-Source RAG Chatbot Platform",
  description:
    "Self-hosted, multi-tenant RAG chatbot platform. Ingest documents, embed a chat widget, and talk to your data with any LLM. Provider-agnostic, real-time streaming, 129 tests passing. Open source under MIT.",
  keywords: [
    "RAG",
    "retrieval augmented generation",
    "chatbot",
    "open source",
    "self-hosted",
    "multi-tenant",
    "LLM",
    "vector search",
    "Qdrant",
    "FastAPI",
    "embeddable widget",
    "LiteLLM",
    "provider agnostic",
    "MiniRAG",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MiniRAG — Open-Source RAG Chatbot Platform",
    description:
      "The open-source RAG platform that puts you in control. Multi-tenant architecture, provider-agnostic LLMs, real-time streaming. Deploy in 5 minutes.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MiniRAG",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniRAG — Open-Source RAG Chatbot Platform",
    description:
      "The open-source RAG platform that puts you in control. Multi-tenant architecture, provider-agnostic LLMs, real-time streaming. Deploy in 5 minutes.",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "MiniRAG",
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      sameAs: ["https://github.com/mrwind-up-bird/mini-chat-rag"],
    },
    {
      "@type": "WebSite",
      name: "MiniRAG",
      url: SITE_URL,
      description:
        "Open-source, self-hosted RAG chatbot platform with multi-tenant isolation and provider-agnostic LLMs.",
    },
    {
      "@type": "SoftwareApplication",
      name: "MiniRAG",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS, Windows (Docker)",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      url: SITE_URL,
      downloadUrl: "https://github.com/mrwind-up-bird/mini-chat-rag",
      license: "https://opensource.org/licenses/MIT",
      description:
        "Self-hosted, multi-tenant RAG chatbot platform. Ingest documents, embed a chat widget, and talk to your data with any LLM.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${jakarta.variable} ${firaCode.variable} font-[family-name:var(--font-jakarta)] antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="page-background" aria-hidden="true" />
        <div className="orb orb-cyan" aria-hidden="true" />
        <div className="orb orb-amber" aria-hidden="true" />
        <div className="orb orb-violet" aria-hidden="true" />
        {children}
        <ChatbotLoader />
      </body>
    </html>
  );
}
