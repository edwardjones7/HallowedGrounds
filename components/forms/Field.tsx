import type { ReactNode } from "react";

const inputCls =
  "w-full border-b border-brass/30 bg-transparent px-1 py-3 text-parchment placeholder:text-parchment/30 transition-colors focus:border-brass focus:outline-none";

export function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.68rem] uppercase tracking-[0.2em] text-parchment/55">
        {label}
        {required && <span className="text-brass"> *</span>}
      </span>
      {children}
    </label>
  );
}

export { inputCls };
