import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("privacyTitle") };
}

interface Section {
  title: string;
  body: string;
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const sections = t.raw("sections") as Section[];
  const date = "2025-01-01";

  return (
    <main className="min-h-screen bg-canvas px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 font-body text-sm text-charcoal hover:text-ink transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          {locale === "ar" ? "العودة" : "Back"}
        </Link>

        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight text-ink">
          {t("title")}
        </h1>
        <p className="mt-4 font-body text-sm text-charcoal">
          {t("lastUpdated", { date })}
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <div
              key={i}
              className="rounded-ds-lg border border-hairline-strong bg-surface-card p-6"
            >
              <h2 className="font-sans text-base font-medium text-ink mb-3">
                {section.title}
              </h2>
              <p className="font-body text-sm text-body-text leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
