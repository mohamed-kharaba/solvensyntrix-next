import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface Step {
  number: string;
  title: string;
}

interface BusinessModelSectionProps {
  t: TFn & { raw: (key: string) => unknown };
}

export function BusinessModelSection({ t }: BusinessModelSectionProps) {
  const steps = t.raw("steps") as Step[];

  return (
    <section id="business-model" className="bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-300">
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
            <p className="mt-6 font-body text-base text-body-text leading-relaxed">
              {t("body")}
            </p>
          </AnimatedSection>
          <AnimatedSection variant="fade-left" delay={0.15}>
            <ol className="space-y-0">
              {steps.map((step) => (
                <li
                  key={step.number}
                  className="flex items-start gap-6 py-5 border-b border-hairline last:border-0"
                >
                  <span className="font-mono text-xs text-charcoal w-7 shrink-0 pt-0.5">
                    {step.number}
                  </span>
                  <span className="font-body text-base text-body-text">{step.title}</span>
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
