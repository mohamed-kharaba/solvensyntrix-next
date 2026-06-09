import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Inter, Geist_Mono, Tajawal } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { CookieBanner } from "@/components/cookie-banner";
import { LoadingOverlay } from "@/components/loading-overlay";
import { FloatingSidebar } from "@/components/floating-sidebar";
import "@/app/globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon-dark.svg", media: "(prefers-color-scheme: light)", type: "image/svg+xml" },
        { url: "/favicon-light.svg", media: "(prefers-color-scheme: dark)", type: "image/svg+xml" },
      ],
      apple: "/icon-dark.svg",
      other: [
        { rel: "icon", url: "/icon-dark.svg", sizes: "100x100", type: "image/svg+xml" },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${dmSans.variable} ${inter.variable} ${geistMono.variable} ${tajawal.variable}`}
    >
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          scriptProps={{ suppressHydrationWarning: true }}
        >
          <NextIntlClientProvider messages={messages}>
            <ReactQueryProvider>
              <LoadingOverlay />
              {children}
              <FloatingSidebar />
              <CookieBanner />
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
