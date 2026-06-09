export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas overflow-hidden">

      {/* Atmospheric glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-150 h-150 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(0,117,255,0.5) 0%, transparent 65%)", filter: "blur(60px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-125 h-125 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(255,89,0,0.5) 0%, transparent 65%)", filter: "blur(60px)" }}
      />

      <div className="relative flex flex-col items-center gap-10">

        {/* Logo */}
        <div className="relative">
          <img
            src="/logo-light.svg"
            alt="Solven Syntrix"
            className="h-12 w-auto"
            style={{ filter: "drop-shadow(0 0 24px rgba(59,158,255,0.3))" }}
          />
        </div>

        {/* Animated progress bar */}
        <div className="relative w-40 h-px bg-hairline overflow-hidden rounded-full">
          <div className="absolute inset-y-0 left-0 w-24 rounded-full bg-gradient-to-r from-transparent via-ink to-transparent loading-bar" />
        </div>

        {/* Tagline */}
        <p className="font-sans text-xs text-stone uppercase tracking-[0.25em] loading-fade">
          Loading…
        </p>
      </div>

      <style>{`
        .loading-bar {
          animation: loadingBar 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes loadingBar {
          0%   { transform: translateX(-6rem); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(10rem); opacity: 0; }
        }

        .loading-fade {
          animation: loadingFade 2s ease-in-out infinite;
        }
        @keyframes loadingFade {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
