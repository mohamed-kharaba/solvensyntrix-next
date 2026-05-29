import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { WhyNowSection } from "@/components/sections/why-now-section";
import { WhatWeBuildSection } from "@/components/sections/what-we-build-section";
import { BusinessModelSection } from "@/components/sections/business-model-section";
import { ValuePropositionSection } from "@/components/sections/value-proposition-section";
import { VisionSection } from "@/components/sections/vision-section";
import { GovernanceSection } from "@/components/sections/governance-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ContactSection } from "@/components/sections/contact-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: PageProps) {
  const { locale } = await params;

  const [
    tHero,
    tPartners,
    tWhyNow,
    tWhatWeBuild,
    tBusinessModel,
    tValueProp,
    tVision,
    tCta,
    tFooter,
  ] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "partners" }),
    getTranslations({ locale, namespace: "whyNow" }),
    getTranslations({ locale, namespace: "whatWeBuild" }),
    getTranslations({ locale, namespace: "businessModel" }),
    getTranslations({ locale, namespace: "valueProposition" }),
    getTranslations({ locale, namespace: "vision" }),
    getTranslations({ locale, namespace: "cta" }),
    getTranslations({ locale, namespace: "footer" }),
  ]);

  return (
    <>
      <Navbar locale={locale} />
      <main className="overflow-hidden">
        <HeroSection t={tHero} locale={locale} />
        <PartnersSection label={tPartners("label")} />
        <AboutSection />
        <WhyNowSection t={tWhyNow} />
        <WhatWeBuildSection t={tWhatWeBuild} />
        <BusinessModelSection t={tBusinessModel} />
        <ValuePropositionSection t={tValueProp} />
        <VisionSection t={tVision} />
        <GovernanceSection />
        <CtaSection t={tCta} locale={locale} />
        <ContactSection />
        <Footer t={tFooter} locale={locale} />
      </main>
    </>
  );
}
