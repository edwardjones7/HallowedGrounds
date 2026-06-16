export function StarRating({
  score = 5,
  className = "",
}: {
  score?: number;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-1 text-brass ${className}`}
      aria-label={`${score} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < Math.round(score)} />
      ))}
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z" />
    </svg>
  );
}
