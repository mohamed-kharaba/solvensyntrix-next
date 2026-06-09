"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export function LanguageSwitcher({
  className,
  showLabel = true,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const setLangSwitching = useUIStore((s) => s.setLangSwitching);
  const t = useTranslations("nav");

  function handleSwitch() {
    const nextLocale = locale === "ar" ? "en" : "ar";
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const nextPath = segments.join("/") || `/${nextLocale}`;
    setLangSwitching(true);
    router.push(nextPath);
  }

  return (
    <button
      onClick={handleSwitch}
      aria-label="Switch language"
      className={cn(
        "inline-flex items-center gap-1.5 h-9 px-3 rounded-ds-md border border-hairline-strong bg-surface-elevated text-charcoal font-sans text-sm font-medium transition-colors hover:text-ink hover:bg-surface-card",
        className
      )}
    >
      <Languages size={15} />
      {showLabel && (
        <span className="hidden sm:inline">{t("switchLanguage")}</span>
      )}
    </button>
  );
}
