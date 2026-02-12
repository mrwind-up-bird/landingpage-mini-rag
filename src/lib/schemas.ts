import { z } from "zod";

export const inquiryTypes = [
  "Demo Request",
  "General Inquiry",
  "Partnership",
  "Technical Question",
] as const;

export const sourceOptions = [
  "Google Search",
  "GitHub",
  "Social Media",
  "Referral",
  "Blog Post",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  inquiryType: z.enum(inquiryTypes, {
    error: "Please select an inquiry type",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  source: z.enum(sourceOptions).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
