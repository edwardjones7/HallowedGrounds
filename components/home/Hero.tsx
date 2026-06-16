"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

const line1 = "Every cup,";
const line2 = "a small act";
const line3 = "of reverence.";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.62, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background image + parallax */}
      <motion.div
        style={reduce ? undefined : { y: imgY }}
        className="absolute inset-0 -z-10 scale-110"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
      </motion.div>

      {/* Vignette / darkening */}
      <motion.div
        style={reduce ? undefined : { opacity: overlay }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/60 to-ink"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,11,12,0.65)_100%)]" />

      <motion.div
        style={reduce ? undefined : { y: contentY }}
        className="mx-auto w-full max-w-7xl px-5 pt-24 md:px-8"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-7"
        >
          Roaster · Cafe · Mobile Coffee Catering — South Jersey
        </motion.p>

        <h1 className="font-display text-[3.4rem] font-light leading-[0.98] tracking-[-0.01em] text-parchment sm:text-7xl md:text-[6.5rem] lg:text-[7.5rem]">
          {[line1, line2, line3].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1,
                  delay: 0.15 + li * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {li === 2 ? (
                  <span className="italic text-brass">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-parchment/70 md:text-lg"
        >
          Farm-to-table coffee, roasted in-house and made by hand. Seed-oil free,
          locally sourced, and worth the drive.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="/menu" variant="solid">
            Order Ahead
          </Button>
          <Button href="/catering" variant="outline">
            Book Catering
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.62rem] uppercase tracking-[0.3em] text-parchment/50">
            Scroll
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-brass to-transparent" />
        </div>
      </motion.div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
