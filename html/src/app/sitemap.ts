import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

// Public routes, relative to a locale root (""=home).
const ROUTES = ["", "/privacy-policy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    // Per-route hreflang map so every locale variant links to the others.
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = absoluteUrl(`/${locale}${route}`);
    }
    languages["x-default"] = absoluteUrl(
      `/${routing.defaultLocale}${route}`,
    );

    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(`/${locale}${route}`),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.5,
        alternates: { languages },
      });
    }
  }

  return entries;
}
