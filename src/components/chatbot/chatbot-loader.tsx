"use client";

import { useEffect } from "react";

export function ChatbotLoader() {
  useEffect(() => {
    const botId = process.env.NEXT_PUBLIC_MINIRAG_BOT_ID;
    const apiUrl = process.env.NEXT_PUBLIC_MINIRAG_API_URL;
    const apiToken = process.env.NEXT_PUBLIC_MINIRAG_API_TOKEN;

    if (!botId || !apiUrl || !apiToken) return;
    if (document.querySelector("script[data-minirag-widget]")) return;

    const script = document.createElement("script");
    script.src = `${apiUrl}/dashboard/widget/minirag-widget.js`;
    script.setAttribute("data-bot-id", botId);
    script.setAttribute("data-api-url", apiUrl);
    script.setAttribute("data-api-token", apiToken);
    script.setAttribute("data-title", "MiniRAG Assistant");
    script.setAttribute("data-minirag-widget", "true");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.querySelector("minirag-widget")?.remove();
    };
  }, []);

  return null;
}
