"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Lenis + ScrollTrigger, wired so the two share one RAF loop.
 * Disabled entirely when the visitor asks for reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.4,
      // native scrolling on touch keeps mobile responsive and cheap
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);

  /**
   * Headings reveal with IntersectionObserver and a CSS class rather than GSAP
   * writing inline styles across the whole document. A global sweep can touch
   * nodes React has not hydrated yet, which is exactly how hydration mismatches
   * happen in the App Router.
   */
  useEffect(() => {
    if (reduced) return;
    const headings = Array.from(document.querySelectorAll<HTMLElement>(".display")).filter(
      (el) => !el.closest("[data-hero]") && !el.closest(".page-hero"),
    );
    headings.forEach((el) => el.classList.add("will-reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    headings.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced, pathname]);

  // new route, new layout: measurements must be recalculated
  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname, reduced]);

  return <>{children}</>;
}
