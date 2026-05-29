"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/#about`, label: t("about") },
    { href: `/${locale}/#what-we-build`, label: t("whatWeBuild") },
    { href: `/${locale}/#business-model`, label: t("businessModel") },
    { href: `/${locale}/#vision`, label: t("vision") },
    { href: `/${locale}/#contact`, label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-canvas/70 backdrop-blur-md border-hairline-strong"
          : "bg-canvas border-hairline",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-300 items-center justify-between px-6 lg:px-8">
        <Link href={`/${locale}`} className="shrink-0">
          <Logo height={28} />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-sm text-charcoal hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/#contact`}
            className="inline-flex items-center justify-center h-8 px-4 rounded-ds-md bg-ink text-canvas font-sans text-sm font-medium transition-colors hover:bg-surface-light ms-1"
          >
            {t("getStarted")}
          </Link>
        </div>

        {/* Mobile right: language + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher showLabel={false} />
          <button
            className="text-charcoal hover:text-ink transition-colors p-1"
            onClick={() => setOpen(!open)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-surface-card/90 backdrop-blur-md border-t border-hairline px-6 py-5">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-base text-body-text hover:text-ink transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <Link
              href={`/${locale}/#contact`}
              className="inline-flex items-center justify-center h-9 px-4 rounded-ds-md bg-ink text-canvas font-sans text-sm font-medium w-full"
              onClick={() => setOpen(false)}
            >
              {t("getStarted")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
