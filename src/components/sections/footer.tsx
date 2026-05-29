import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface FooterProps {
  t: TFn;
  locale: string;
}

export function Footer({ t, locale }: FooterProps) {
  const year = new Date().getFullYear();

  const companyLinks = [
    { href: `/${locale}/#about`, label: t("links.about") },
    { href: `/${locale}/#vision`, label: t("links.vision") },
    { href: `/${locale}/#business-model`, label: t("links.model") },
  ];

  const legalLinks = [
    { href: `/${locale}/privacy-policy`, label: t("links.privacy") },
    { href: `/${locale}/terms`, label: t("links.terms") },
  ];

  return (
    <footer className="bg-canvas border-t border-hairline px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-300">
        <AnimatedSection variant="fade-up">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-divider-soft">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Logo height={28} />
            <p className="mt-4 font-body text-sm text-ash leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-ds-full bg-accent-green" />
              <span className="font-sans text-xs text-charcoal">
                {t("status")}
              </span>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="font-sans text-xs font-medium text-charcoal uppercase tracking-widest mb-4">
              {t("links.company")}
            </p>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-ash hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-sans text-xs font-medium text-charcoal uppercase tracking-widest mb-4">
              {t("links.legal")}
            </p>
            <ul className="space-y-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-ash hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-medium text-charcoal uppercase tracking-widest mb-4">
              {t("links.contact")}
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/#contact`}
                  className="font-body text-sm text-ash hover:text-ink transition-colors"
                >
                  {t("links.getInTouch")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        </AnimatedSection>

        <div className="pt-8 flex items-center justify-between">
          <p className="font-sans text-xs text-stone">
            {t("copyright", { year })}
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
