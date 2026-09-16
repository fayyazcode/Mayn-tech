import type { ReactNode } from "react";

export function Section({
  id,
  children,
  rule = true,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  rule?: boolean;
  className?: string;
}) {
  return (
    <section id={id} className={`py-[clamp(68px,8.5vw,132px)] ${rule ? "border-t border-hair" : ""} ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <div className="grid items-start gap-[clamp(28px,5vw,84px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <h2 className="display text-[clamp(1.85rem,3.5vw,2.85rem)]">{title}</h2>
      {children ? <div>{children}</div> : null}
    </div>
  );
}
