"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";
import { Aurora } from "@/components/effects/Aurora";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// three.js is ~150 kB, so it never blocks first paint and never ships to the server
const ParticleField = dynamic(() => import("@/components/effects/ParticleField").then((m) => m.ParticleField), {
  ssr: false,
});

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | undefined;

    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
    ctx = gsap.context(() => {
      // one orchestrated entrance, then the page is still
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-hero-image]", { scale: 1.06, opacity: 0.25 }, { scale: 1, opacity: 1, duration: 1.5 })
        .to('[data-anim="line"]', { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.09 }, "-=1.05")
        .to('[data-anim="fade"][data-hero-sub]', { y: 0, opacity: 1, duration: 0.7 }, "-=0.6")
        .to('[data-anim="fade"][data-hero-cta]', { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, "-=0.45");

      // slow parallax on the photograph as it leaves
      gsap.to("[data-hero-image]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
      }),
    );

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section ref={root} id="home" data-hero className="relative pt-[82px]">
      <Aurora />
      <figure className="relative m-0 w-full overflow-hidden">
        <div data-hero-image className="will-change-transform">
          <Image
            src="/assets/summit.jpg"
            alt="A snow-capped mountain peak at last light, cloud caught around the summit and gold on the upper ridge."
            width={2400}
            height={1269}
            priority
            sizes="100vw"
            className="h-[clamp(300px,54vh,600px)] w-full object-cover object-[50%_52%]"
          />
        </div>
        <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0" />
        <ParticleField className="opacity-70" />
      </figure>

      <div className="shell">
        <div className="mt-[clamp(26px,4vw,46px)] border-t border-line pt-[clamp(26px,3.4vw,40px)]">
          <div className="grid items-start gap-[clamp(28px,5vw,80px)] lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)]">
            <div>
              <h1 className="display text-[clamp(2.1rem,4.55vw,3.5rem)]">
                <span className="block overflow-hidden">
                  <span data-hero-line data-anim="line" className="block">Reach the heights of your business</span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-line data-anim="line" className="block">with our <em className="italic">expertise</em>.</span>
                </span>
              </h1>
              <p data-hero-sub data-anim="fade" className="mt-6 text-[clamp(1.02rem,1.25vw,1.18rem)] text-body">
                A fixed price in two days. Work you can see in five.
              </p>
            </div>
            <div>
              <p data-hero-sub data-anim="fade" className="max-w-[44ch] text-[clamp(1rem,1.1vw,1.08rem)] text-muted">
                Mayn Technologies is a design and marketing studio. We draw the logo, build the site, and run the
                search and social work that keeps people arriving long after launch.
              </p>
              <div className="mt-7 flex flex-wrap gap-3.5">
                <span data-hero-cta data-anim="fade"><Button href="/contact">Start a project</Button></span>
                <span data-hero-cta data-anim="fade"><Button href="/work" variant="ghost">See the work</Button></span>
              </div>
              <p data-hero-sub data-anim="fade" className="mt-5 text-[0.88rem] text-muted">
                Projects from $500 to $5,000 &middot;{" "}
                <a href="/services#pricing" className="text-body underline-offset-4 hover:text-accent">every price published</a>, fixed before you commit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
