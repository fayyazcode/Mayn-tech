"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Aurora } from "@/components/effects/Aurora";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Shared page opener. Lines are masked and swept up on load, the intro and meta
 * follow, and a soft highlight tracks the pointer across the block.
 *
 * Lines arrive as an array so each can sit in its own overflow-hidden mask —
 * the reveal only reads well when the clip edge matches the line box.
 */
export function PageHero({
  eyebrow,
  lines,
  intro,
  meta,
}: {
  eyebrow: string;
  lines: string[];
  intro: string;
  meta?: { label: string; value: string }[];
}) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const el = root.current;

    let ctx: gsap.Context | undefined;

    // two frames: React finishes hydrating this segment before GSAP touches the DOM
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to('[data-anim="fade"][data-ph-eyebrow]', { y: 0, opacity: 1, duration: 0.5 })
            .to('[data-anim="line"]', { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, "-=0.25")
            .to('[data-anim="fade"][data-ph-intro]', { y: 0, opacity: 1, duration: 0.6 }, "-=0.55")
            .to('[data-anim="fade"][data-ph-meta]', { y: 0, opacity: 1, duration: 0.5, stagger: 0.07 }, "-=0.4")
            .to('[data-anim="rule"]', { scaleX: 1, duration: 0.9 }, "-=0.6");
        }, el);
      }),
    );

    // highlight follows the pointer; written to CSS vars, so no re-render
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--px", `${event.clientX - rect.left}px`);
      el.style.setProperty("--py", `${event.clientY - rect.top}px`);
    };
    el.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
      el.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <section ref={root} className="page-hero relative overflow-hidden pt-[clamp(118px,15vh,180px)]">
      <Aurora />
      <span aria-hidden className="page-hero-glow" />

      <div className="shell relative">
        <p data-ph-eyebrow data-anim="fade" className="text-[0.8rem] uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>

        <h1 className="display mt-5 text-[clamp(2.1rem,5.2vw,3.9rem)]">
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span data-ph-line data-anim="line" className="block">{line}</span>
            </span>
          ))}
        </h1>

        <p data-ph-intro data-anim="fade" className="mt-7 max-w-[56ch] text-[clamp(1rem,1.15vw,1.12rem)] text-muted">
          {intro}
        </p>

        {meta && (
          <ul className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
            {meta.map((item) => (
              <li data-ph-meta data-anim="fade" key={item.label} className="min-w-0">
                <span className="block font-[family-name:var(--font-bodoni)] text-[1.35rem] text-ink">
                  {item.value}
                </span>
                <span className="mt-1 block text-[0.8rem] text-muted">{item.label}</span>
              </li>
            ))}
          </ul>
        )}

        <div data-ph-rule data-anim="rule" className="mt-[clamp(38px,5vw,64px)] h-px w-full bg-line" />
      </div>
    </section>
  );
}
