import { SectionLabel } from "@/components/ui/SectionLabel";

export function PageHeader({
  eyebrow,
  title,
  accent,
  intro,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
}) {
  return (
    <header className="px-5 pb-12 pt-36 md:px-8 md:pb-16 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-light leading-[1.02] tracking-[-0.01em] text-parchment md:text-7xl">
          {title}
          {accent && <span className="italic text-brass"> {accent}</span>}
        </h1>
        {intro && (
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-parchment/65 md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
