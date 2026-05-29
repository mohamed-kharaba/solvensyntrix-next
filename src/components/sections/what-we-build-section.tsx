import { Cloud, Radio, TrendingUp, CheckCircle } from "lucide-react";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface Card {
  number: string;
  title: string;
  points: string[];
  closing: string;
}

interface WhatWeBuildSectionProps {
  t: TFn & { raw: (key: string) => unknown };
}

const CARD_ICONS = [Cloud, Radio, TrendingUp];

export function WhatWeBuildSection({ t }: WhatWeBuildSectionProps) {
  const cards = t.raw("cards") as Card[];

  return (
    <section id="what-we-build" className="bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <AnimatedSection variant="fade-up">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text mb-6 shadow-[0_0_10px_rgba(59,158,255,0.18)]">
            {t("badge")}
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none tracking-tight text-ink max-w-2xl">
            {t("headline")}
          </h2>
        </AnimatedSection>
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-hairline rounded-ds-lg overflow-hidden border border-hairline-strong">
          {cards.map((card, i) => {
            const Icon = CARD_ICONS[i] ?? Cloud;
            return (
              <AnimatedSection key={card.number} variant="fade-up" delay={i * 0.1}>
                <div className="flex flex-col bg-surface-card p-8 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-xs text-charcoal">{card.number}</span>
                    <Icon size={18} className="text-charcoal" />
                  </div>
                  <h3 className="font-sans text-base font-medium text-ink mb-5 leading-snug">
                    {card.title}
                  </h3>
                  <ul className="space-y-2.5 flex-1">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckCircle size={13} className="mt-0.5 shrink-0 text-accent-green" />
                        <span className="font-body text-sm text-body-text">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-body text-sm text-charcoal border-t border-hairline pt-5">
                    {card.closing}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
