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
    script.setAttribute("data-bot-id", BOT_ID);
    script.setAttribute("data-api-url", API_URL);
    script.setAttribute("data-api-token", API_TOKEN);
    script.setAttribute("data-title", "MiniRAG Assistant");
    script.async = true;

    script.onload = () => {
      // If auto-insert didn't fire, create the widget manually
      let widget = document.querySelector("minirag-widget");
      if (!widget) {
        widget = document.createElement("minirag-widget");
        widget.setAttribute("bot-id", BOT_ID);
        widget.setAttribute("api-url", API_URL);
        widget.setAttribute("api-token", API_TOKEN);
        widget.setAttribute("title", "MiniRAG Assistant");
        document.body.appendChild(widget);
      }
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
      document.querySelector("minirag-widget")?.remove();
    };
  }, []);

  return null;
}
