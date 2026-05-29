"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/animated-section";
import { NetworkGlobe } from "@/components/network-globe";

interface ContactFormData {
  name: string;
  email: string;
  type: string;
  message: string;
}

async function submitContact(data: ContactFormData): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send");
}

export function ContactSection() {
  const t = useTranslations("contact");
  const types = t.raw("types") as string[];

  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  const mutation = useMutation({ mutationFn: submitContact });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(form);
  }

  const inputCls =
    "w-full h-10 rounded-ds-md border border-hairline-strong bg-surface-card px-3.5 font-sans text-sm text-ink placeholder:text-stone outline-none focus:border-ink transition-colors";

  return (
    <section id="contact" className="relative bg-canvas px-6 py-24 lg:px-8 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-300">
        <AnimatedSection variant="fade-up">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text mb-6 shadow-[0_0_10px_rgba(59,158,255,0.18)]">
            {t("badge")}
          </span>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* Left — title + body + form */}
          <AnimatedSection variant="fade-right" className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight text-ink">
                {t("headline")}
              </h2>
              <p className="mt-5 font-body text-base text-body-text leading-relaxed">
                {t("body")}
              </p>
            </div>

            {/* Form — no card wrapper, just the fields */}
            {mutation.isSuccess ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle size={32} className="text-accent-green" />
                <p className="font-body text-base text-body-text">{t("success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("namePlaceholder")}
                  className={inputCls}
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("emailPlaceholder")}
                  className={inputCls}
                />
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={cn(inputCls, "appearance-none")}
                >
                  <option value="" disabled>
                    {t("typePlaceholder")}
                  </option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("messagePlaceholder")}
                  rows={5}
                  className={cn(inputCls, "h-auto resize-none py-2.5")}
                />

                {mutation.isError && (
                  <p className="flex items-center gap-2 font-sans text-sm text-accent-red">
                    <AlertCircle size={14} />
                    {t("error")}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full inline-flex items-center justify-center gap-2 h-9 px-4 rounded-ds-md bg-ink text-canvas font-sans text-sm font-medium transition-colors hover:bg-surface-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? (
                    <>
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-canvas/30 border-t-canvas animate-spin" />
                      {t("submitting")}
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      {t("submit")}
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatedSection>

          {/* Right — globe, transparent, no card */}
          <AnimatedSection variant="fade-left" delay={0.15} className="min-h-96 lg:min-h-0">
            <div className="w-full h-full min-h-96">
              <NetworkGlobe />
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
