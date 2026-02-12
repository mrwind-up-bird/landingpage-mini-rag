"use server";

import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { env } from "@/lib/env";

interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitContact(
  data: ContactFormData & { pageUrl?: string },
): Promise<SubmitResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${env.airtable.baseId()}/${encodeURIComponent(env.airtable.table())}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.airtable.apiKey()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: parsed.data.name,
            Email: parsed.data.email,
            ...(parsed.data.company ? { Company: parsed.data.company } : {}),
            "Inquiry Type": parsed.data.inquiryType,
            Message: parsed.data.message,
            ...(parsed.data.source ? { Source: parsed.data.source } : {}),
            "Page URL": data.pageUrl ?? "",
            "Submitted At": new Date().toISOString(),
            Status: "Todo",
          },
        }),
      },
    );

    if (!response.ok) {
      const body = await response.text();
      console.error("Airtable error:", response.status, body);
      return { success: false, error: "Failed to submit. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Submit contact error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
