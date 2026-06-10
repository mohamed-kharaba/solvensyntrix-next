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

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" />
      <rect width="4" height="12" x="2" y="9" fill="none" />
      <circle cx="4" cy="4" r="2" fill="none" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: FacebookIcon, href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "#", label: "Facebook" },
  { icon: InstagramIcon, href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "#", label: "Instagram" },
  { icon: WhatsAppIcon, href: process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP ?? "#", label: "WhatsApp" },
  { icon: LinkedInIcon, href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "#", label: "LinkedIn" },
];

export function Footer({ t, locale }: FooterProps) {
  const year = 2026;

  const companyLinks = [
    { href: `/${locale}/#about`, label: t("links.about") },
    { href: `/${locale}/#vision`, label: t("links.vision") },
    { href: `/${locale}/#business-model`, label: t("links.model") },
    { href: `/${locale}/#contact`, label: t("links.getInTouch") },
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
            <Logo height={40} />
            <p className="mt-4 font-body text-sm text-body-text leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="font-sans text-xs font-medium text-ink opacity-50 uppercase tracking-widest mb-4">
              {t("links.company")}
            </p>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-body-text hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-sans text-xs font-medium text-ink opacity-50 uppercase tracking-widest mb-4">
              {t("links.legal")}
            </p>
            <ul className="space-y-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-body-text hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <p className="font-sans text-xs font-medium text-ink opacity-50 uppercase tracking-widest mb-4">
              {t("links.getInTouch")}
            </p>
            <a
              href={`mailto:${t("email")}`}
              className="inline-block font-body text-sm text-body-text hover:text-ink transition-colors"
            >
              {t("email")}
            </a>
            <div className="mt-4 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-elevated border border-hairline-strong text-charcoal hover:text-ink hover:bg-surface-card transition-all duration-200 hover:scale-110"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
        </AnimatedSection>

        <div className="pt-8 flex items-center justify-between">
          <p className="font-sans text-xs text-body-text opacity-60">
            {t("copyright", { year })}
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
