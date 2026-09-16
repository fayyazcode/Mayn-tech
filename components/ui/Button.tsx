import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-full border text-[0.95rem] font-medium px-7 py-3.5 transition-[transform,background-color,color,border-color] duration-250 hover:-translate-y-0.5";

const variants = {
  solid: "bg-bright text-void border-transparent hover:bg-silver",
  ghost: "border-hair text-silver hover:border-silver hover:text-bright",
} as const;

type Variant = keyof typeof variants;

export function Button({
  href,
  variant = "solid",
  children,
  external,
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "children">) {
  const className = `${base} ${variants[variant]}`;
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function SubmitButton({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${base} ${variants.solid} disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
