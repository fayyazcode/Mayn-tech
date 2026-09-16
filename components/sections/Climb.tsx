"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { climbStages } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const RIDGE = "M60 430 L240 360 L360 390 L520 286 L640 312 L800 208 L920 236 L1080 96 L1140 150";
const STOPS = [
  { at: 0.18, x: 240, y: 360 },
  { at: 0.44, x: 520, y: 286 },
  { at: 0.7, x: 800, y: 208 },
  { at: 0.97, x: 1080, y: 96 },
];

/** The service ladder drawn as an ascent. Scroll-linked, not time-based. */
export function Climb() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current) return;
    const line = root.current.querySelector<SVGPathElement>("[data-ridge]");
    const climber = root.current.querySelector<SVGGElement>("[data-climber]");
    if (!line || !climber) return;

    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;

    const paint = (p: number) => {
      line.style.strokeDashoffset = `${length * (1 - p)}`;
      const point = line.getPointAtLength(length * p);
      climber.setAttribute("transform", `translate(${point.x},${point.y})`);
      climber.style.opacity = p > 0.02 ? "1" : "0";
      STOPS.forEach((stop, i) => {
        root.current?.querySelectorAll(`[data-stop="${i}"]`).forEach((el) => {
          el.classList.toggle("lit", p >= stop.at);
        });
      });
    };

    if (reduced) {
      paint(1);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: root.current,
      start: "top 78%",
      end: "bottom 60%",
      scrub: 0.6,
      onUpdate: (self) => paint(self.progress),
    });
    paint(0);

    return () => trigger.kill();
  }, [reduced]);

  return (
    <div ref={root} className="mt-[clamp(36px,4.6vw,64px)]">
      <svg viewBox="0 0 1200 470" className="block h-auto w-full overflow-visible" role="img"
           aria-label="Four stages of work, drawn as a climb from identity to measurable growth.">
        <g aria-hidden className="fill-silver opacity-40">
          {[[140, 70, 1.6], [330, 40, 1.2], [470, 112, 1.7], [690, 58, 1.3], [880, 120, 1.5], [1010, 42, 1.2], [1150, 86, 1.6]].map(
            ([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />,
          )}
        </g>
        <path d={`${RIDGE} L1140 440 L60 440 Z`} fill="rgb(201 205 207 / 0.05)" />
        <path d={RIDGE} fill="none" stroke="rgb(201 205 207 / 0.18)" strokeWidth={2} />
        <path data-ridge d={RIDGE} fill="none" stroke="var(--color-silver)" strokeWidth={3}
              strokeLinejoin="round" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgb(201 205 207 / 0.35))" }} />
        {STOPS.map((stop, i) => (
          <g key={i} data-stop={i} className="mayn-stop">
            <circle cx={stop.x} cy={stop.y} r={15} className="ring" fill="none" stroke="var(--color-champagne)" strokeWidth={1.5} />
            <circle cx={stop.x} cy={stop.y} r={7} className="dot" fill="#000" stroke="rgb(201 205 207 / 0.18)" strokeWidth={2} />
          </g>
        ))}
        <g data-climber style={{ opacity: 0 }}>
          <circle r={17} fill="var(--color-champagne)" opacity={0.22} />
          <circle r={6.5} fill="var(--color-bright)" />
        </g>
      </svg>

      <ol className="mt-6 grid border-t border-hair sm:grid-cols-2 lg:grid-cols-4">
        {climbStages.map((stage, i) => (
          <li key={stage.n} data-stop={i}
              className="mayn-stage border-b border-hairsoft py-5 pr-6 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:not(:first-child)]:pl-6">
            <span className="n block font-[family-name:var(--font-bodoni)] text-[1.05rem] text-steel transition-colors duration-500">
              {stage.n}
            </span>
            <span className="t mt-1.5 block text-[0.94rem] text-steel transition-colors duration-500">{stage.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
