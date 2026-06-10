"use client";

import { ShieldCheck, Lock, FileText, Settings, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";
import { Section } from "@/components/section";

const ICONS = [ShieldCheck, Lock, FileText, Settings, AlertTriangle];
const COLORS = ["text-accent-yellow", "text-accent-yellow", "text-accent-yellow", "text-accent-yellow", "text-accent-yellow"];

export function GovernanceSection() {
  const t = useTranslations("governance");
  const points = t.raw("points") as string[];

  return (
    <Section
      className="overflow-hidden"
      decoration={
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-150 glow-yellow" />
      }
    >
        <AnimatedSection variant="fade-up">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text mb-6 shadow-[0_0_10px_rgba(255,197,61,0.15)]">
            {t("badge")}
          </span>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection variant="fade-right">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight text-ink">
              {t("headline")}
            </h2>
          </AnimatedSection>

          <AnimatedSection variant="fade-left" delay={0.15}>
            <ul className="space-y-0">
              {points.map((point, i) => {
                const Icon = ICONS[i] ?? ShieldCheck;
                const color = COLORS[i] ?? COLORS[0];
                return (
                  <li
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-hairline last:border-0"
                  >
                    <Icon size={14} className={`shrink-0 ${color}`} />
                    <span className="font-body text-base text-body-text">{point}</span>
                  </li>
                );
              })}
            </ul>
          </AnimatedSection>
        </div>
    </Section>
  );
}
