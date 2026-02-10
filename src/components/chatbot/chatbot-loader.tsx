"use client";

import { useEffect } from "react";

const BOT_ID = "df5b5ca2-68c4-4ae9-a2ef-9eceedd72df8";
const API_URL = "https://mini-rag.de";
const API_TOKEN = "_ULOzwCXkh9pV_Qp_tPkZvbXrT_fQavPKeJOi_wu1kM";

export function ChatbotLoader() {
  useEffect(() => {
    if (document.querySelector("minirag-widget")) return;

    const script = document.createElement("script");
    script.src = `${API_URL}/dashboard/widget/minirag-widget.js`;
    script.async = true;

    script.onload = () => {
      const widget = document.createElement("minirag-widget");
      widget.setAttribute("bot-id", BOT_ID);
      widget.setAttribute("api-url", API_URL);
      widget.setAttribute("api-token", API_TOKEN);
      widget.setAttribute("title", "MiniRAG Assistant");

      // Set dark theme via inline style to override Shadow DOM :host defaults
      widget.style.cssText = [
        "--primary: #00d4ff",
        "--primary-hover: #00b8e0",
        "--bg: rgba(10, 10, 30, 0.95)",
        "--bg-secondary: rgba(255, 255, 255, 0.06)",
        "--text: #f0f0f5",
        "--text-secondary: rgba(240, 240, 245, 0.55)",
        "--border: rgba(255, 255, 255, 0.1)",
        "--radius: 16px",
        "--shadow: 0 20px 60px -12px rgba(0, 0, 0, 0.6)",
      ].join("; ");

      document.body.appendChild(widget);
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
      document.querySelector("minirag-widget")?.remove();
    };
  }, []);

  return null;
}
