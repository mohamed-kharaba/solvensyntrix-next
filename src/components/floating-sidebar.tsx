"use client";

import { useState } from "react";

function MailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function HeadphonesIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function CloseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const LINKS = [
  { icon: MailIcon,      href: process.env.NEXT_PUBLIC_SOCIAL_EMAIL     ?? "#", label: "Email"     },
  { icon: WhatsAppIcon,  href: process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP  ?? "#", label: "WhatsApp"  },
  { icon: LinkedInIcon,  href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN  ?? "#", label: "LinkedIn"  },
  { icon: InstagramIcon, href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "#", label: "Instagram" },
  { icon: FacebookIcon,  href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK  ?? "#", label: "Facebook"  },
];

const SUPPORT = {
  icon: HeadphonesIcon,
  href: process.env.NEXT_PUBLIC_SOCIAL_SUPPORT ?? "#",
  label: "Support",
};

export function FloatingSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop / tablet: vertical sidebar centered on edge ── */}
      <div
        className="hidden lg:flex fixed top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2"
        style={{ insetInlineEnd: "1rem" }}
      >
        {LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated border border-hairline-strong text-charcoal hover:text-ink hover:bg-surface-card transition-all duration-200 hover:scale-110"
          >
            <Icon size={16} />
          </a>
        ))}
        <div className="w-px h-4 bg-hairline-strong rounded-full" />
        <a
          href={SUPPORT.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={SUPPORT.label}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-green text-canvas hover:opacity-90 transition-all duration-200 hover:scale-110 shadow-[0_0_16px_rgba(17,255,153,0.4)]"
        >
          <SUPPORT.icon size={16} />
        </a>
      </div>

      {/* ── Mobile: FAB + slide-up tray ── */}
      <div
        className="lg:hidden fixed z-50 flex flex-col items-center gap-2"
        style={{ bottom: "1.25rem", insetInlineEnd: "1.25rem" }}
      >
        {/* Expanded tray */}
        <div
          className="flex flex-col items-center gap-2"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
            pointerEvents: mobileOpen ? "auto" : "none",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {LINKS.map(({ icon: Icon, href, label }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated border border-hairline-strong text-charcoal"
              style={{
                transition: `opacity 0.2s ease ${i * 40}ms, transform 0.2s ease ${i * 40}ms`,
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "scale(1)" : "scale(0.85)",
              }}
            >
              <Icon size={16} />
            </a>
          ))}
          <div className="w-px h-3 bg-hairline-strong rounded-full" />
        </div>

        {/* FAB trigger — same 40×40 size as social icons but green */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close social links" : "Open social links"}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-green text-canvas shadow-[0_0_20px_rgba(17,255,153,0.5)] transition-transform duration-200 active:scale-95"
        >
          <div style={{ transition: "transform 0.3s ease", transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
            {mobileOpen ? <CloseIcon size={18} /> : <HeadphonesIcon size={18} />}
          </div>
        </button>
      </div>
    </>
  );
}
