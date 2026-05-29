import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";
import { HeroFlowVisual } from "@/components/hero-flow-visual";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface HeroSectionProps {
  t: TFn;
  locale: string;
}

export function HeroSection({ t, locale }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-canvas px-6 pb-28 pt-16 lg:px-8 lg:pb-36 lg:pt-20">

      {/* Blue glow — top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-40 w-175 h-175 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,117,255,0.18) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Orange glow — top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-40 w-150 h-150 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,89,0,0.14) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Green glow — bottom-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-75"
        style={{
          background:
            "radial-gradient(ellipse, rgba(34,255,153,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative mx-auto max-w-300 flex flex-col items-center text-center">
        {/* Badge */}
        <AnimatedSection variant="fade-down" delay={0}>
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-charcoal uppercase tracking-widest mb-7 shadow-[0_0_10px_rgba(59,158,255,0.18)]">
            Solven Syntrix
          </span>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection variant="fade-up" delay={0.1}>
          <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[1.02] tracking-tight text-ink max-w-4xl">
            {t("headline")}
          </h1>
        </AnimatedSection>

        {/* Body */}
        <AnimatedSection variant="fade-up" delay={0.2}>
          <p className="mt-6 font-body text-lg text-body-text max-w-xl leading-relaxed">
            {t("body")}
          </p>
        </AnimatedSection>

        {/* Tagline */}
        <AnimatedSection variant="fade-up" delay={0.28}>
          <p className="mt-4 font-body text-sm tracking-widest uppercase text-charcoal">
            {t("tagline")}
          </p>
        </AnimatedSection>

        {/* CTAs */}
        <AnimatedSection variant="fade-up" delay={0.36}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}/#contact`}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-ds-md bg-ink text-canvas font-sans text-sm font-medium transition-colors hover:bg-surface-light"
            >
              {t("ctaPrimary")}
              <ArrowRight size={14} />
            </Link>
            <Link
              href={`/${locale}/#what-we-build`}
              className="inline-flex items-center h-10 px-5 rounded-ds-md border border-hairline-strong bg-transparent text-ink font-sans text-sm font-medium transition-colors hover:bg-surface-elevated"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </AnimatedSection>

        {/* Flow visual */}
        <AnimatedSection variant="fade-up" delay={0.45} className="w-full mt-14">
          <HeroFlowVisual locale={locale} />
        </AnimatedSection>

        {/* Bottom fade line */}
        <div className="mt-8 w-px h-10 bg-linear-to-b from-hairline-strong to-transparent" />
      </div>
    </section>
  );
}
