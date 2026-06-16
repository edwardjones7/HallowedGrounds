"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max gap-0"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap font-display text-2xl text-parchment/70 md:text-3xl"
          >
            {item}
            <span className="mx-7 text-brass" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
