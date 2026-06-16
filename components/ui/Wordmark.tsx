import Link from "next/link";

export function Wordmark({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group flex flex-col items-center leading-none ${className}`}
      aria-label="Hallowed Grounds Coffee Co. — home"
    >
      <span className="font-display text-[0.62rem] uppercase tracking-[0.45em] text-brass">
        Est. South Jersey
      </span>
      <span className="font-display text-lg font-medium tracking-[0.06em] text-parchment transition-colors duration-500 group-hover:text-brass-bright md:text-xl">
        Hallowed Grounds
      </span>
      {!compact && (
        <span className="font-display text-[0.55rem] uppercase tracking-[0.5em] text-parchment/50">
          Coffee Co.
        </span>
      )}
    </Link>
  );
}
