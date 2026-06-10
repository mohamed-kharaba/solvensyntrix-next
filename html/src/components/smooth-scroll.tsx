"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const NAV_OFFSET = 72; // sticky navbar (h-14 = 56px) + breathing room

/**
 * Page-wide smooth scrolling. Lenis intercepts wheel/trackpad/touch input and
 * animates it with an easing curve so motion eases in slow, accelerates, then
 * settles — instead of the browser's instant 1:1 scroll. Also upgrades
 * same-page anchor links (e.g. "#about") to an eased scroll with navbar offset.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Respect users who ask for reduced motion — skip the smoothing entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      // lerp follows the real scroll position each frame instead of animating
      // a fixed-duration tween per wheel tick — more responsive and far less
      // "laggy" on weaker devices, while still giving an eased glide.
      lerp: 0.1, // 0 = no smoothing, 1 = instant; lower = smoother/heavier
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: true,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Eased scroll for same-page hash links.
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
      lenis.scrollTo(target as HTMLElement, { offset: -NAV_OFFSET });
    }

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
