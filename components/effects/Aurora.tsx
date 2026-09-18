"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Two slow gradient blooms that drift behind content. CSS only, costs nothing,
 * and carries the page when the WebGL field is skipped.
 */
export function Aurora() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const el = root.current;
    let frame = 0;
    let t = 0;

    const tick = () => {
      t += 0.0024;
      el.style.setProperty("--ax", `${Math.sin(t) * 16}%`);
      el.style.setProperty("--ay", `${Math.cos(t * 0.8) * 12}%`);
      el.style.setProperty("--bx", `${Math.cos(t * 0.65) * 18}%`);
      el.style.setProperty("--by", `${Math.sin(t * 0.5) * 14}%`);
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return <div ref={root} aria-hidden className="aurora pointer-events-none absolute inset-0 -z-10" />;
}
