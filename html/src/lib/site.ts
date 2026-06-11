import { routing } from "@/i18n/routing";

/** Production origin, no trailing slash. Falls back for local/dev builds. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://solvensyntrix.com"
).replace(/\/$/, "");

export const siteConfig = {
  url: SITE_URL,
  name: "Solven Syntrix",
  /** Default OG image, served from /public. */
  ogImage: "/og.png",
  twitter: "@solvensyntrix",
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
} as const;

/** Absolute URL for a path (e.g. "/en" -> "https://…/en"). */
export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * hreflang alternates for a localized path. Given a per-locale path builder,
 * returns { languages: { ar, en }, x-default } for <link rel="alternate">.
 */
export function languageAlternates(
  pathForLocale: (locale: string) => string,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(pathForLocale(locale));
  }
  // x-default points at the default locale's URL.
  languages["x-default"] = absoluteUrl(pathForLocale(routing.defaultLocale));
  return languages;
}
