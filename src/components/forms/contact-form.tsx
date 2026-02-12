"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  contactSchema,
  inquiryTypes,
  sourceOptions,
  type ContactFormData,
} from "@/lib/schemas";
import { submitContact } from "@/actions/submit-contact";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassTextarea } from "@/components/ui/glass-textarea";
import { GlassSelect } from "@/components/ui/glass-select";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";

export function ContactForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(data: ContactFormData) {
    startTransition(async () => {
      const result = await submitContact({
        ...data,
        pageUrl: window.location.href,
      });
      if (result.success) {
        router.push("/success");
      } else {
        setError("root", { message: result.error ?? "Submission failed" });
      }
    });
  }

  return (
    <GlassCard className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <GlassInput
              label="Name"
              placeholder="Your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-[var(--error)]">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <GlassInput
              label="Email"
              type="email"
              placeholder="you@company.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-[var(--error)]">{errors.email.message}</p>
            )}
          </div>
        </div>

        <GlassInput
          label="Company (optional)"
          placeholder="Your company"
          {...register("company")}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <GlassSelect
              label="Inquiry Type"
              placeholder="Select type..."
              options={inquiryTypes.map((t) => ({ value: t, label: t }))}
              {...register("inquiryType")}
            />
            {errors.inquiryType && (
              <p className="text-xs text-[var(--error)]">
                {errors.inquiryType.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <GlassSelect
              label="How did you find us?"
              placeholder="Select source..."
              options={sourceOptions.map((s) => ({ value: s, label: s }))}
              {...register("source")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <GlassTextarea
            label="Message"
            placeholder="Tell us about your project or question..."
            rows={5}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs text-[var(--error)]">{errors.message.message}</p>
          )}
        </div>

        {errors.root && (
          <p className="text-sm text-[var(--error)] text-center">
            {errors.root.message}
          </p>
        )}

        <GlassButton type="submit" disabled={isPending} className="mt-2">
          {isPending ? "Sending..." : "Send Message"}
        </GlassButton>
      </form>
    </GlassCard>
  );
}
