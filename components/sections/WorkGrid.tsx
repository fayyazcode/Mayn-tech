"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function WorkGrid({ limit }: { limit?: number }) {
  const sectors = useMemo(() => ["Everything", ...Array.from(new Set(projects.map((p) => p.sector)))], []);
  const [filter, setFilter] = useState("Everything");
  const reduced = useReducedMotion();

  const shown = useMemo(() => {
    const list = filter === "Everything" ? projects : projects.filter((p) => p.sector === filter);
    return limit ? list.slice(0, limit) : list;
  }, [filter, limit]);

  return (
    <div>
      {!limit && (
        <div role="group" aria-label="Filter work" className="mt-[clamp(30px,3.6vw,46px)] flex flex-wrap gap-2.5">
          {sectors.map((sector) => (
            <button
              key={sector}
              type="button"
              onClick={() => setFilter(sector)}
              aria-pressed={filter === sector}
              className={`rounded-full border px-5 py-2.5 text-[0.87rem] transition-colors ${
                filter === sector
                  ? "border-ink bg-ink text-surface"
                  : "border-line text-muted hover:border-body hover:text-ink"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="mt-[clamp(26px,3vw,40px)] grid gap-[clamp(22px,3vw,44px)] md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((project) => (
            <motion.article
              key={project.slug}
              layout
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group block !p-2"
              >
                <Image
                  src={project.image}
                  alt={`${project.name} website, designed and built by Mayn Technologies`}
                  width={1000}
                  height={800}
                  className="block w-full"
                />
              </a>
              <h3 className="mt-5 font-[family-name:var(--font-bodoni)] text-[1.32rem] text-ink">{project.name}</h3>
              <p className="mt-1.5 text-[0.84rem] text-accent">{project.kind}</p>
              <p className="mt-2.5 max-w-[44ch] text-[0.92rem] text-muted">{project.note}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-block border-b border-line pb-1 text-[0.86rem] text-body transition-colors hover:border-accent hover:text-accent"
              >
                Visit the live site
              </a>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
