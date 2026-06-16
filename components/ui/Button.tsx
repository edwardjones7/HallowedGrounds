import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

const variants: Record<Variant, string> = {
  solid:
    "bg-brass text-ink hover:bg-brass-bright",
  outline:
    "border border-brass/50 text-parchment hover:border-brass hover:bg-brass/10",
  ghost: "text-parchment/80 hover:text-brass",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  href,
  variant = "solid",
  className = "",
  external,
  type = "button",
  disabled,
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
