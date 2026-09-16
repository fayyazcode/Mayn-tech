"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [strike, setStrike] = useState(false);
  const last = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 12);
      if (reduced) return;
      const now = Date.now();
      if (now - last.current < 2200) return;
      last.current = now;
      setStrike(true);
      window.setTimeout(() => setStrike(false), 760);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-60 border-b transition-[background-color,border-color,backdrop-filter] duration-400 ${
        stuck ? "border-hair bg-black/75 backdrop-blur-lg" : "border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-[82px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3.5" aria-label="Mayn Technologies, home">
          <span className={`relative block w-[30px] leading-[0] ${strike ? "mayn-strike" : ""}`}>
            <Image src="/assets/mark.png" alt="" width={438} height={320} priority className="w-[30px] opacity-95" />
            <span className="mayn-bolt" aria-hidden />
          </span>
          <Image src="/assets/wordmark.png" alt={site.name} width={760} height={46} priority className="w-[132px] opacity-90" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hair sm:hidden"
        >
          <span className="relative block h-px w-4 bg-silver before:absolute before:-top-[5px] before:left-0 before:h-px before:w-4 before:bg-silver before:content-[''] after:absolute after:top-[5px] after:left-0 after:h-px after:w-4 after:bg-silver after:content-['']" />
        </button>

        <nav id="main-nav" aria-label="Main" className="hidden items-center gap-[clamp(18px,2.1vw,30px)] sm:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`group relative py-1.5 text-[0.9rem] transition-colors ${
                pathname === item.href ? "text-bright" : "text-steel hover:text-bright"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-px bg-champagne transition-all duration-300 ${
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-hair px-5 py-2.5 text-[0.9rem] text-silver transition-colors hover:border-bright hover:bg-bright hover:text-void"
          >
            Start a project
          </Link>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Main"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
            className="border-b border-hair bg-black/95 px-[clamp(20px,5vw,64px)] pb-6 backdrop-blur-lg sm:hidden"
          >
            {[...site.nav, { href: "/contact", label: "Start a project" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-hairsoft py-4 text-[1.05rem] text-silver"
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
