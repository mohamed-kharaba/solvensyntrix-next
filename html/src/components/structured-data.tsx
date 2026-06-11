import { siteConfig, absoluteUrl } from "@/lib/site";

interface StructuredDataProps {
  locale: string;
  description: string;
}

/**
 * JSON-LD structured data (Organization + WebSite). Helps search engines build
 * a rich knowledge panel and sitelinks search box, and reinforces the brand
 * entity. Rendered server-side as a <script type="application/ld+json">.
 */
export function StructuredData({ locale, description }: StructuredDataProps) {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/icon-dark.svg"),
      image: absoluteUrl(siteConfig.ogImage),
      description,
      email: "info@solvensyntrix.com",
      sameAs: [
        process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
        process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
        process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      ].filter((u): u is string => Boolean(u) && u !== "#"),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: absoluteUrl(`/${locale}`),
      name: siteConfig.name,
      description,
      inLanguage: locale,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ];

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
