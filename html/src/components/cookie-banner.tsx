"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useConsentStore } from "@/store/consent-store";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const locale = useLocale();
  const { accepted, setConsent, hydrate } = useConsentStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    hydrate();
    setHydrated(true);
  }, [hydrate]);

  // Don't render until we've read localStorage, and hide if already decided
  if (!hydrated || accepted !== null) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-lg rounded-2xl border border-hairline-strong bg-canvas/70 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.4)] px-6 py-5">

        {/* Cookie icon + title */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl select-none">🍪</span>
          <p className="font-sans text-sm font-medium text-ink">
            {t("title")}
          </p>
        </div>

        {/* Message */}
        <p className="font-body text-sm text-body-text leading-relaxed mb-5">
          {t("message")}{" "}
          <Link
            href={`/${locale}/privacy-policy`}
            className="text-link underline underline-offset-2 hover:text-ink transition-colors"
          >
            {t("learnMore")}
          </Link>
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setConsent(true)}
            className="flex-1 inline-flex items-center justify-center h-9 px-4 rounded-ds-md bg-ink text-canvas font-sans text-sm font-medium transition-colors hover:bg-surface-light"
          >
            {t("accept")}
          </button>
          <button
            onClick={() => setConsent(false)}
            className="flex-1 inline-flex items-center justify-center h-9 px-4 rounded-ds-md border border-hairline-strong bg-transparent text-charcoal font-sans text-sm font-medium transition-colors hover:text-ink hover:bg-surface-elevated"
          >
            {t("decline")}
          </button>
        </div>

      </div>
    </div>
  );
}
