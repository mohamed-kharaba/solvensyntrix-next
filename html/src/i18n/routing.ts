import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  // Detect the visitor's preferred language from the Accept-Language header
  // (and a stored cookie) and redirect "/" to the matching locale.
  localeDetection: true,
});
