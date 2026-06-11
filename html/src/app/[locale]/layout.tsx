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
import { SmoothScroll } from "@/components/smooth-scroll";
// import { FloatingSidebar } from "@/components/floating-sidebar";
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

// Not used above the fold — skip preload so it doesn't compete with the
// display/body fonts for the LCP text.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

// Arabic-only; never needed on the English LCP path.
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
  preload: false,
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
      <head>
        {/* Marks JS active before paint. Entrance animations only hide their
            content under html.js, so if JS is slow/absent content stays
            visible and paints immediately — keeps LCP fast on mobile. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js')",
          }}
        />
      </head>
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
              <SmoothScroll />
              {children}
              {/* <FloatingSidebar /> */}
              <CookieBanner />
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        {/* Reveal above-the-fold entrance elements as soon as the HTML is
            parsed — before React hydration — so LCP text isn't held at
            opacity:0 on slow devices. Off-screen ones stay hidden for the
            IntersectionObserver to animate in on scroll. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var els=document.querySelectorAll('[class*=anim-]');for(var i=0;i<els.length;i++){var r=els[i].getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)els[i].classList.add('in-view')}})()`,
          }}
        />
      </body>
    </html>
  );
}
