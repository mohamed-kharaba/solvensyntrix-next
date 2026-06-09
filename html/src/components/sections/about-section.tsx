"use client";

import { useState } from "react";
import { Cpu, BarChart2, Settings, Handshake } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

interface AboutSectionProps {
  locale?: string;
}

const CARD_META = [
  {
    Icon: Cpu,
    accent: "#3b9eff",
    accentGlow: "rgba(59,158,255,0.25)",
    accentBg: "rgba(59,158,255,0.08)",
    num: "01",
  },
  {
    Icon: BarChart2,
    accent: "#11ff99",
    accentGlow: "rgba(17,255,153,0.25)",
    accentBg: "rgba(17,255,153,0.08)",
    num: "02",
  },
  {
    Icon: Settings,
    accent: "#ff801f",
    accentGlow: "rgba(255,128,31,0.25)",
    accentBg: "rgba(255,128,31,0.08)",
    num: "03",
  },
  {
    Icon: Handshake,
    accent: "#a855f7",
    accentGlow: "rgba(168,85,247,0.25)",
    accentBg: "rgba(168,85,247,0.08)",
    num: "04",
  },
];

function FlipCard({
  title,
  description,
  meta,
  delay,
}: {
  title: string;
  description: string;
  meta: (typeof CARD_META)[number];
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const { Icon, accent, accentGlow, accentBg, num } = meta;

  return (
    <AnimatedSection variant="fade-up" delay={delay}>
      <div
        className="relative h-64 cursor-pointer"
        style={{ perspective: "1000px" }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ── Front ── */}
          <div
            className="absolute inset-0 rounded-ds-lg border flex flex-col justify-between p-6 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderColor: "var(--ds-hairline-strong)",
              background: "var(--ds-surface-card)",
            }}
          >
            {/* top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] rounded-t-ds-lg"
              style={{ background: accent }}
            />
            <div className="flex items-start justify-between">
              <span
                className="font-mono text-xs"
                style={{ color: "var(--ds-stone)" }}
              >
                {num}
              </span>
              <div
                className="p-2 rounded-ds-md border"
                style={{
                  color: accent,
                  background: accentBg,
                  borderColor: accent + "44",
                  boxShadow: `0 0 12px ${accentGlow}`,
                }}
              >
                <Icon size={18} />
              </div>
            </div>
            <div>
              <h3
                className="font-display text-xl leading-tight tracking-tight"
                style={{ color: "var(--ds-ink)" }}
              >
                {title}
              </h3>
              <p
                className="mt-2 font-sans text-xs uppercase tracking-widest"
                style={{ color: accent }}
              >
                Read more →
              </p>
            </div>
          </div>

          {/* ── Back ── */}
          <div
            className="absolute inset-0 rounded-ds-lg border flex flex-col justify-between p-6 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderColor: accent + "66",
              background: accentBg,
              boxShadow: `0 0 32px ${accentGlow}, inset 0 0 40px ${accentGlow}`,
            }}
          >
            {/* top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] rounded-t-ds-lg"
              style={{ background: accent }}
            />
            {/* corner glow */}
            <div
              className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`,
                filter: "blur(12px)",
              }}
            />
            <div
              className="p-2 rounded-ds-md border self-start"
              style={{
                color: accent,
                background: "var(--ds-surface-card)",
                borderColor: accent + "44",
                boxShadow: `0 0 12px ${accentGlow}`,
              }}
            >
              <Icon size={18} />
            </div>
            <div>
              <h3
                className="font-display text-lg leading-tight tracking-tight mb-3"
                style={{ color: accent }}
              >
                {title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "var(--ds-body-text)" }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function AboutSection({}: AboutSectionProps) {
  const t = useTranslations("about");
  const cards = t.raw("cards") as { title: string; description: string }[];

  return (
    <section id="about" className="relative bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-300">

        {/* Badge + headline + body */}
        <AnimatedSection variant="fade-up">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text uppercase tracking-widest mb-8 shadow-[0_0_8px_rgba(59,158,255,0.2)]">
            {t("badge")}
          </span>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight text-ink max-w-2xl">
            {t("headline")}
          </h2>
          <p className="mt-4 font-body text-base text-body-text leading-relaxed max-w-xl">
            {t("body")}
          </p>
        </AnimatedSection>

        {/* Flip cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <FlipCard
              key={i}
              title={card.title}
              description={card.description}
              meta={CARD_META[i]}
              delay={0.1 + i * 0.08}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
