export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-brass/60" aria-hidden />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
