"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-[clamp(34px,4.4vw,58px)] border-t border-line">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-linesoft">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(1rem,1.35vw,1.12rem)] text-ink transition-colors hover:text-accent"
            >
              {item.q}
              <motion.span
                animate={{ rotate: isOpen ? 225 : 45 }}
                transition={{ duration: 0.3 }}
                className="mt-[-6px] block h-2.5 w-2.5 shrink-0 border-b border-r border-muted"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[74ch] pb-6 pr-10 text-[0.96rem] text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
