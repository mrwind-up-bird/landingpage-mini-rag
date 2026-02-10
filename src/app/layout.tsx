import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "MiniRAG — Open-Source RAG Chatbot Platform",
  description:
    "Self-hosted, multi-tenant RAG chatbot platform. Ingest documents, embed a widget, chat with your data. Open source under MIT.",
  openGraph: {
    title: "MiniRAG — Open-Source RAG Chatbot Platform",
    description:
      "Self-hosted, multi-tenant RAG chatbot platform. Deploy in minutes.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniRAG — Open-Source RAG Chatbot Platform",
    description:
      "Self-hosted, multi-tenant RAG chatbot platform. Deploy in minutes.",
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
