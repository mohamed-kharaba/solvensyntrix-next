"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/animated-section";

const PARTNERS = [
  {
    name: "BenaTechs",
    logo: "/partners/benatechs.svg",
    href: "https://benatechs.com/",
    hoverFilter: "brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%) hue-rotate(200deg) brightness(119%) contrast(97%)",
  },
  {
    name: "Ehmena",
    logo: "/partners/ehmena.svg",
    href: "https://ehmena.com/",
    hoverFilter: "brightness(0) saturate(100%) invert(65%) sepia(60%) saturate(500%) hue-rotate(95deg) brightness(105%) contrast(95%)",
  },
  {
    name: "Aqualine",
    logo: "/partners/aqualine.svg",
    href: "https://aqualine.sa/",
    hoverFilter: "brightness(0) saturate(100%) invert(55%) sepia(80%) saturate(400%) hue-rotate(175deg) brightness(110%) contrast(90%)",
  },
  {
    name: "Bena",
    logo: "/partners/bena.svg",
    href: "https://bena.sa.com/",
    hoverFilter: "brightness(0) saturate(100%) invert(60%) sepia(70%) saturate(600%) hue-rotate(340deg) brightness(105%) contrast(95%)",
  },
];

export function PartnersSection({ label }: { label?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // dark → white logos, light → black logos
  const baseFilter = mounted && resolvedTheme === "light"
    ? "brightness(0)"
    : "brightness(0) invert(1)";

  return (
    <section className="relative bg-canvas border-t border-hairline px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-300">

        <AnimatedSection variant="fade-up">
          <p className="text-center font-sans text-xs text-stone uppercase tracking-widest mb-12">
            {label ?? "Trusted by our partners"}
          </p>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-hairline border border-hairline rounded-ds-lg overflow-hidden">
            {PARTNERS.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center bg-canvas px-8 py-10 transition-colors duration-300 hover:bg-surface-card"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={40}
                  className="h-9 w-auto object-contain opacity-40 transition-all duration-300 group-hover:opacity-100"
                  style={{ filter: baseFilter }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = partner.hoverFilter;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = baseFilter;
                  }}
                />
              </a>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
