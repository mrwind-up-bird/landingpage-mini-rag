type Status = "pass" | "warn" | "fail";

export interface AuditCheck {
  label: string;
  status: Status;
  detail: string;
}

export interface PageAudit {
  path: string;
  checks: AuditCheck[];
}

function checkLength(
  label: string,
  value: string | undefined,
  min: number,
  max: number,
): AuditCheck {
  if (!value) return { label, status: "fail", detail: "Missing" };
  const len = value.length;
  if (len < min) return { label, status: "warn", detail: `Too short (${len}/${min}-${max})` };
  if (len > max) return { label, status: "warn", detail: `Too long (${len}/${min}-${max})` };
  return { label, status: "pass", detail: `${len} chars` };
}

interface PageMeta {
  path: string;
  title?: string;
  description?: string;
  hasJsonLd?: boolean;
  hasCanonical?: boolean;
  hasOgTitle?: boolean;
  hasOgDescription?: boolean;
  hasOgImage?: boolean;
  robots?: string;
}

const knownPages: PageMeta[] = [
  {
    path: "/",
    title: "MiniRAG — Open-Source RAG Chatbot Platform",
    description:
      "Self-hosted, multi-tenant RAG chatbot platform. Ingest documents, embed a chat widget, and talk to your data with any LLM. Provider-agnostic, real-time streaming, 129 tests passing. Open source under MIT.",
    hasJsonLd: true,
    hasCanonical: true,
    hasOgTitle: true,
    hasOgDescription: true,
    robots: "index, follow",
  },
  {
    path: "/blog",
    title: "Blog — MiniRAG",
    description: "Technical blog covering RAG architecture, chatbot deployment, and MiniRAG updates.",
    hasCanonical: true,
    robots: "index, follow",
  },
  {
    path: "/contact",
    title: "Contact — MiniRAG | Request a Demo & Get in Touch",
    description:
      "Request a demo of MiniRAG, ask technical questions, or explore partnership opportunities. Self-hosted RAG chatbot platform for businesses.",
    robots: "index, follow",
  },
  {
    path: "/success",
    title: "Message Sent — MiniRAG",
    robots: "noindex, nofollow",
  },
];

export function runSeoAudit(): PageAudit[] {
  return knownPages.map((page) => {
    const checks: AuditCheck[] = [];

    checks.push(checkLength("Title", page.title, 30, 60));
    checks.push(checkLength("Meta Description", page.description, 120, 160));

    checks.push({
      label: "JSON-LD",
      status: page.hasJsonLd ? "pass" : "warn",
      detail: page.hasJsonLd ? "Present" : "Not configured",
    });

    checks.push({
      label: "Canonical",
      status: page.hasCanonical ? "pass" : "warn",
      detail: page.hasCanonical ? "Set" : "Not set",
    });

    checks.push({
      label: "OG Title",
      status: page.hasOgTitle ? "pass" : "warn",
      detail: page.hasOgTitle ? "Present" : "Inherits from metadata",
    });

    checks.push({
      label: "OG Description",
      status: page.hasOgDescription ? "pass" : "warn",
      detail: page.hasOgDescription ? "Present" : "Inherits from metadata",
    });

    checks.push({
      label: "Robots",
      status: page.robots ? "pass" : "warn",
      detail: page.robots ?? "Not explicitly set",
    });

    return { path: page.path, checks };
  });
}
