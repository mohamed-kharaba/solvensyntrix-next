import { Star } from "lucide-react";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface VisionSectionProps {
  t: TFn & { raw: (key: string) => unknown };
}

export function VisionSection({ t }: VisionSectionProps) {
  const points = t.raw("points") as string[];

  return (
    <section id="vision" className="relative overflow-hidden bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-150 glow-blue" />
      <div className="relative mx-auto max-w-300">
        <AnimatedSection variant="fade-up">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text mb-6 shadow-[0_0_10px_rgba(59,158,255,0.18)]">
            {t("badge")}
          </span>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection variant="fade-right">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight text-ink">
              {t("headline")}
            </h2>
            <p className="mt-6 font-body text-base text-charcoal leading-relaxed">
              {t("body")}
            </p>
          </AnimatedSection>

          <AnimatedSection variant="fade-left" delay={0.15}>
            <ul className="space-y-0">
              {points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 py-4 border-b border-hairline last:border-0"
                >
                  <Star size={14} className="shrink-0 text-accent-blue" />
                  <span className="font-body text-base text-body-text">{point}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
