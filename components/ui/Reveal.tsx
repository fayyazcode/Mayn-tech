"use client";

import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * One quiet entrance, used sparingly.
 *
 * `as` matters: a <div> is not valid inside <ul> or <ol>, and the browser will
 * move it during parsing, which breaks hydration. Pass as="li" inside lists.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
}) {
  const reduced = useReducedMotion();
  const Tag = as as ElementType;
  const Motion = motion[as as "div"];

  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Motion>
  );
}
