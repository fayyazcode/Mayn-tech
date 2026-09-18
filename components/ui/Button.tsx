import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-full border text-[0.95rem] font-medium px-7 py-3.5 transition-[transform,background-color,color,border-color] duration-250 hover:-translate-y-0.5";

const variants = {
  solid: "bg-ink text-surface border-transparent hover:bg-body",
  ghost: "border-line text-body hover:border-body hover:text-ink",
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

export function SubmitButton({
  children,
  disabled,
  className = "",
}: {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${base} ${variants.solid} disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}
