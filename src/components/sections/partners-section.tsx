"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/animated-section";

const PARTNERS = [
  {
    name: "BenaTechs",
    logo: "/partners/benatechs.png",
    href: "https://benatechs.com/",
    spotlightColor: "rgba(26, 74, 74, 0.45)",   // dark teal from logo
  },
  {
    name: "Ehmena",
    logo: "/partners/ehmena.png",
    href: "https://ehmena.com/",
    spotlightColor: "rgba(184, 150, 46, 0.45)",  // gold from logo
  },
  {
    name: "Aqualine",
    logo: "/partners/aqualine.webp",
    href: "https://aqualine.sa/",
    spotlightColor: "rgba(120, 120, 120, 0.35)", // neutral — logo is black wordmark
  },
  {
    name: "Bena",
    logo: "/partners/bena.png",
    href: "https://bena.sa.com/",
    spotlightColor: "rgba(31, 95, 173, 0.45)",   // blue from logo
  },
];

const TECH_PARTNERS: {
  name: string;
  href: string;
  spotlightColor: string;
  wordmark: React.ReactNode;
}[] = [
  {
    name: "Amazon",
    href: "https://amazon.com/",
    spotlightColor: "rgba(255, 153, 0, 0.35)",
    wordmark: (
      <span className="flex items-center gap-2.5 h-9">
        {/* Amazon icon: smile arrow */}
        <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 fill-current transition-colors duration-300 group-hover:fill-[#FF9900]" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.439-2.186 1.439-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.684zm3.186 7.705a.661.661 0 01-.77.075c-1.078-.895-1.268-1.311-1.862-2.164-1.783 1.815-3.045 2.36-5.355 2.36-2.736 0-4.866-1.688-4.866-5.066 0-2.639 1.429-4.437 3.469-5.315 1.766-.779 4.231-.918 6.113-1.133v-.421c0-.779.06-1.701-.398-2.375C13.087 3.299 12.2 3 11.428 3c-1.508 0-2.857.796-3.185 2.43-.068.355-.328.706-.682.722l-3.13-.335c-.266-.06-.561-.271-.484-.677C4.62 1.798 7.867 0 11.51 0c1.855 0 4.277.494 5.738 1.899C19.15 3.55 18.96 5.75 18.96 8.15v5.967c0 1.797.745 2.588 1.446 3.561.247.355.302.779-.016 1.046l-3.246 2.797v-.001zM22.515 19.716c-3.505 2.652-8.588 4.062-12.963 4.062-6.131 0-11.644-2.266-15.82-6.039-.328-.296-.036-.701.359-.471 4.508 2.625 10.077 4.205 15.836 4.205 3.882 0 8.151-.806 12.081-2.472.591-.253 1.089.387.507.715z"/>
        </svg>
        <span className="font-bold text-2xl tracking-tight transition-colors duration-300 group-hover:text-[#FF9900]" style={{ fontFamily: "Arial, sans-serif" }}>
          amazon
        </span>
      </span>
    ),
  },
  {
    name: "Google",
    href: "https://google.com/",
    spotlightColor: "rgba(66, 133, 244, 0.35)",
    wordmark: (
      <span className="flex items-center gap-2.5 h-9">
        {/* Google G icon */}
        <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path className="transition-colors duration-300 group-hover:fill-[#4285F4] fill-current" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path className="transition-colors duration-300 group-hover:fill-[#34A853] fill-current" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path className="transition-colors duration-300 group-hover:fill-[#FBBC05] fill-current" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path className="transition-colors duration-300 group-hover:fill-[#EA4335] fill-current" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="font-bold text-2xl tracking-tight" style={{ fontFamily: "Arial, sans-serif" }}>
          <span className="transition-colors duration-300 group-hover:text-[#4285F4]">G</span>
          <span className="transition-colors duration-300 group-hover:text-[#EA4335]">o</span>
          <span className="transition-colors duration-300 group-hover:text-[#FBBC05]">o</span>
          <span className="transition-colors duration-300 group-hover:text-[#4285F4]">g</span>
          <span className="transition-colors duration-300 group-hover:text-[#34A853]">l</span>
          <span className="transition-colors duration-300 group-hover:text-[#EA4335]">e</span>
        </span>
      </span>
    ),
  },
  {
    name: "Microsoft",
    href: "https://microsoft.com/",
    spotlightColor: "rgba(0, 114, 198, 0.35)",
    wordmark: (
      <span className="flex items-center gap-2.5 h-9">
        {/* Microsoft 4-square icon */}
        <span className="grid grid-cols-2 gap-0.75 w-8 h-8 shrink-0">
          <span className="bg-current group-hover:bg-[#F25022] transition-colors duration-300" />
          <span className="bg-current group-hover:bg-[#7FBA00] transition-colors duration-300" />
          <span className="bg-current group-hover:bg-[#00A4EF] transition-colors duration-300" />
          <span className="bg-current group-hover:bg-[#FFB900] transition-colors duration-300" />
        </span>
        <span className="font-semibold text-2xl tracking-tight group-hover:text-[#0078D4] transition-colors duration-300" style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}>
          Microsoft
        </span>
      </span>
    ),
  },
  {
    name: "Apple",
    href: "https://apple.com/",
    spotlightColor: "rgba(150, 150, 150, 0.35)",
    wordmark: (
      <span className="flex items-center gap-2.5 h-9">
        <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 fill-current transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </svg>
        <span className="font-semibold text-2xl tracking-tight transition-colors duration-300" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
          Apple
        </span>
      </span>
    ),
  },
];

function LogoCard({
  href,
  spotlightColor,
  children,
  colorContent,
}: {
  href: string;
  spotlightColor: string;
  children: React.ReactNode;
  colorContent: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  // softer alpha variants
  const glowSoft   = spotlightColor.replace(/[\d.]+\)$/, "0.18)");
  const glowFaint  = spotlightColor.replace(/[\d.]+\)$/, "0.08)");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center bg-canvas px-8 py-10 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* wide base bloom — very large, very soft */}
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse 160% 130% at 50% 110%, ${glowSoft}, transparent 70%)`,
        }}
      />
      {/* tighter center shimmer */}
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse 90% 70% at 50% 80%, ${glowFaint}, transparent 65%)`,
        }}
      />

      {/* stacked: greyscale fades out, color fades in — both always in flow so no layout shift */}
      <span className="relative z-10">
        <span
          className="transition-opacity duration-300"
          style={{ opacity: hovered ? 0 : 1 }}
          aria-hidden={hovered}
        >
          {children}
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-hidden={!hovered}
        >
          {colorContent}
        </span>
      </span>
    </a>
  );
}

export function PartnersSection({ badge, headline }: { badge?: string; headline?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const baseFilter =
    mounted && resolvedTheme === "light" ? "brightness(0)" : "brightness(0) invert(1)";

  return (
    <section className="relative bg-canvas border-t border-hairline px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <AnimatedSection variant="fade-up" className="flex flex-col items-center text-center mb-16">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text uppercase tracking-widest mb-8 shadow-[0_0_10px_rgba(59,158,255,0.18)]">
            {badge ?? "Our Partners"}
          </span>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-ink max-w-3xl">
            {headline ?? "Built on trust, powered by partnership."}
          </h2>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-hairline border border-hairline rounded-ds-lg overflow-hidden">

            {/* Row 1: partner logos (PNG/WebP) */}
            {PARTNERS.map((partner) => (
              <LogoCard
                key={partner.name}
                href={partner.href}
                spotlightColor={partner.spotlightColor}
                colorContent={
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={40}
                    className="h-9 w-auto object-contain"
                    style={{ filter: "none" }}
                  />
                }
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={40}
                  className="h-9 w-auto object-contain opacity-40"
                  style={{ filter: baseFilter }}
                />
              </LogoCard>
            ))}

            {/* Row 2: tech giant wordmarks */}
            {TECH_PARTNERS.map((partner) => (
              <LogoCard
                key={partner.name}
                href={partner.href}
                spotlightColor={partner.spotlightColor}
                colorContent={partner.wordmark}
              >
                <span className="opacity-40 text-current">{partner.wordmark}</span>
              </LogoCard>
            ))}

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
