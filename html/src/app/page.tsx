import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

// The "/" route is normally handled by the next-intl middleware (proxy.ts),
// which detects the visitor's Accept-Language and redirects to /ar or /en.
// This page is only a fallback if the middleware is bypassed — send it to the
// default locale rather than a hardcoded one.
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
