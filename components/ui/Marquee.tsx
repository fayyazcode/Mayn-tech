"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Seamless looping row. The track is duplicated and shifted by exactly half its
 * width, so the wrap point is invisible. Pauses on hover; still on request.
 */
export function Marquee({
  items,
  speed = 38,
  reverse = false,
  className = "",
  separator = "·",
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  separator?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !track.current) return;
    const el = track.current;
    const distance = el.scrollWidth / 2;

    const tween = gsap.to(el, {
      x: reverse ? distance : -distance,
      duration: distance / speed,
      ease: "none",
      repeat: -1,
      modifiers: { x: (value) => `${parseFloat(value) % distance}px` },
    });
    if (reverse) gsap.set(el, { x: -distance });

    const slow = () => tween.timeScale(0.25);
    const normal = () => tween.timeScale(1);
    el.addEventListener("pointerenter", slow);
    el.addEventListener("pointerleave", normal);

    return () => {
      tween.kill();
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", normal);
    };
  }, [reduced, reverse, speed]);

  const row = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden={reduced ? undefined : true}>
      <div ref={track} className="flex w-max items-center gap-6 will-change-transform">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-6 text-muted">
            <span className="whitespace-nowrap">{item}</span>
            <span className="text-accent">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
