import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-stage hover:bg-brand-strong focus-visible:outline-brand",
  secondary:
    "border border-line text-body hover:border-brand/60 hover:text-brand",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center px-5 py-3 text-sm font-medium transition-colors ${variants[variant]}`}
    >
      {children}
    </a>
  );
}
