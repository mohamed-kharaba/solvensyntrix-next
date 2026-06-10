import { TrendingUp } from "lucide-react";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";
import { GrowthChart } from "@/components/growth-chart";
import { Section } from "@/components/section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface WhyNowSectionProps {
  t: TFn & { raw: (key: string) => unknown };
}

export function WhyNowSection({ t }: WhyNowSectionProps) {
  const points = t.raw("points") as string[];

  return (
    <Section
      className="overflow-hidden"
      decoration={
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-150 glow-orange" />
      }
    >
        <AnimatedSection variant="fade-up" className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text uppercase tracking-widest mb-8 shadow-[0_0_8px_rgba(255,128,31,0.2)]">
            {t("badge")}
          </span>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-ink max-w-3xl">
            {t("headline")}
          </h2>
          <p className="mt-6 font-body text-base text-body-text max-w-xl leading-relaxed">
            {t("body")}
          </p>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={0.15}>
          <ul className="mt-10 grid sm:grid-cols-2 gap-px bg-hairline rounded-ds-lg overflow-hidden border border-hairline-strong">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-4 bg-surface-card p-6 hover:bg-surface-elevated transition-colors duration-300">
                <TrendingUp size={16} className="mt-0.5 shrink-0 text-accent-orange" />
                <span className="font-body text-sm text-body-text">{point}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={0.2}>
          <GrowthChart />
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={0.3} className="text-center">
          <p className="mt-10 font-display text-[clamp(1.4rem,2.5vw,2rem)] text-ink leading-relaxed max-w-3xl mx-auto">
            "{t("closing")}"
          </p>
          <p className="mt-4 font-display text-lg text-accent-orange mx-auto">
            — {t("emphasis")}
          </p>
        </AnimatedSection>
    </Section>
  );
}
