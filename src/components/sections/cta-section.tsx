import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface CtaSectionProps {
  t: TFn;
  locale: string;
}

export function CtaSection({ t, locale }: CtaSectionProps) {
  return (
    <section className="bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-300">
        <AnimatedSection variant="scale-up">
          <div className="relative rounded-ds-lg border border-hairline-strong bg-surface-card p-10 lg:p-16 text-center overflow-hidden">
            {/* top-center blue glow */}
            <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-accent-blue opacity-10 blur-3xl" />
            {/* bottom-left orange glow */}
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent-orange opacity-[0.07] blur-3xl" />
            {/* bottom-right green glow */}
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-accent-green opacity-[0.06] blur-3xl" />
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none tracking-tight text-ink">
              {t("headline")}
            </h2>
            <p className="mt-6 font-body text-base text-body-text max-w-2xl mx-auto leading-relaxed">
              {t("body")}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/#contact`}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-ds-md bg-ink text-canvas font-sans text-sm font-medium transition-colors hover:bg-surface-light"
              >
                {t("ctaPrimary")}
                <ArrowRight size={15} />
              </Link>
              <Link
                href={`/${locale}/#what-we-build`}
                className="inline-flex items-center h-9 px-4 rounded-ds-md border border-hairline-strong bg-surface-elevated text-ink font-sans text-sm font-medium transition-colors hover:bg-surface-card"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
