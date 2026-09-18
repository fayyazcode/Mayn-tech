"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // one orchestrated entrance, then the page is still
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-image]", { scale: 1.06, opacity: 0.25, duration: 1.5 })
        .from("[data-hero-line]", { yPercent: 115, opacity: 0, duration: 0.95, stagger: 0.09 }, "-=1.05")
        .from("[data-hero-sub]", { y: 18, opacity: 0, duration: 0.7 }, "-=0.6")
        .from("[data-hero-cta]", { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.45");

      // slow parallax on the photograph as it leaves
      gsap.to("[data-hero-image]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="home" className="pt-[82px]">
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.62) 0, rgba(0,0,0,.12) 14%, transparent 26%, transparent 74%, rgba(0,0,0,.42) 92%, #000 100%), linear-gradient(to right, rgba(0,0,0,.5), transparent 22%, transparent 78%, rgba(0,0,0,.5))",
          }}
        />
      </figure>

      <div className="shell">
        <div className="mt-[clamp(26px,4vw,46px)] border-t border-hair pt-[clamp(26px,3.4vw,40px)]">
          <div className="grid items-start gap-[clamp(28px,5vw,80px)] lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)]">
            <div>
              <h1 className="display text-[clamp(2.1rem,4.55vw,3.5rem)]">
                <span className="block overflow-hidden">
                  <span data-hero-line className="block">Reach the heights of your business</span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block">with our <em className="italic">expertise</em>.</span>
                </span>
              </h1>
              <p data-hero-sub className="mt-6 text-[clamp(1.02rem,1.25vw,1.18rem)] text-silver">
                A fixed price in two days. Work you can see in five.
              </p>
            </div>
            <div>
              <p data-hero-sub className="max-w-[44ch] text-[clamp(1rem,1.1vw,1.08rem)] text-steel">
                Mayn Technologies is a design and marketing studio. We draw the logo, build the site, and run the
                search and social work that keeps people arriving long after launch.
              </p>
              <div className="mt-7 flex flex-wrap gap-3.5">
                <span data-hero-cta><Button href="/contact">Start a project</Button></span>
                <span data-hero-cta><Button href="/work" variant="ghost">See the work</Button></span>
              </div>
              <p data-hero-sub className="mt-5 text-[0.88rem] text-steel">
                Projects from $500 to $5,000 &middot;{" "}
                <a href="/services#pricing" className="text-silver underline-offset-4 hover:text-champagne">every price published</a>, fixed before you commit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
