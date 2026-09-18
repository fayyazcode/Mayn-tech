"use client";

import { useRef, type ElementType, type ReactNode } from "react";

/**
 * Glass card that tracks the pointer. Position is written to CSS custom
 * properties rather than React state, so moving the mouse never triggers a
 * re-render; the browser handles it on the compositor.
 */
export function SpotlightCard({
  children,
  className = "",
  tilt = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  as?: "div" | "article" | "figure" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const Component = Tag as ElementType;

  function onMove(event: React.PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      const rx = ((y / rect.height) - 0.5) * -6;
      const ry = ((x / rect.width) - 0.5) * 6;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    }
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <Component
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`glass ${tilt ? "glass-tilt" : ""} ${className}`}
    >
      <span aria-hidden className="glass-sheen" />
      <span className="relative z-10 flex h-full flex-col gap-3">{children}</span>
    </Component>
  );
}
