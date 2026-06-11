"use client";

import { useEffect } from "react";
import type LenisType from "lenis";

const NAV_OFFSET = 72; // sticky navbar (h-14 = 56px) + breathing room

/**
 * Page-wide smooth scrolling. Lenis intercepts wheel/trackpad/touch input and
 * animates it with an easing curve so motion eases in slow, accelerates, then
 * settles. It's loaded lazily, after the page is idle, so its ~16KB stays out
 * of the initial bundle and off the critical render path (keeps LCP/TBT low).
 * Also upgrades same-page anchor links (e.g. "#about") to an eased scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Respect users who ask for reduced motion — skip the smoothing entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: LenisType | null = null;
    let frame = 0;
    let cancelled = false;

    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href*="#"]',
      );
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      // Only handle in-page links (same path, has a hash).
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      lenis?.scrollTo(target as HTMLElement, { offset: -NAV_OFFSET });
    }

    // Defer the Lenis import + RAF loop until the browser is idle, so it never
    // competes with first paint / hydration.
    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 200);

    idle(async () => {
      if (cancelled) return;
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        // lerp follows the real scroll position each frame instead of a
        // fixed-duration tween — more responsive, less laggy on weak devices.
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      }
      frame = requestAnimationFrame(raf);
      document.addEventListener("click", onClick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
