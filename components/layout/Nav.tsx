"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/content/nav";
import { Wordmark } from "@/components/ui/Wordmark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const mid = Math.ceil(navLinks.length / 2);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "border-b border-brass/15 bg-ink/85 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Left links (desktop) */}
          <nav className="hidden flex-1 items-center gap-7 lg:flex">
            {navLinks.slice(0, mid).map((l) => (
              <NavItem key={l.href} {...l} active={pathname === l.href} />
            ))}
          </nav>

          <div className="flex-1 lg:flex lg:justify-center">
            <Wordmark />
          </div>

          {/* Right links (desktop) */}
          <nav className="hidden flex-1 items-center justify-end gap-7 lg:flex">
            {navLinks.slice(mid).map((l) => (
              <NavItem key={l.href} {...l} active={pathname === l.href} />
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="ml-auto flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`h-px w-6 bg-parchment transition-all duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-parchment transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-parchment transition-all duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-ink/97 backdrop-blur-lg lg:hidden"
          >
            {navLinks.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
              >
                <Link
                  href={l.href}
                  className="font-display text-4xl text-parchment transition-colors hover:text-brass"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
        active ? "text-brass" : "text-parchment/75 hover:text-parchment"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-1.5 left-0 h-px bg-brass transition-all duration-500 ${
          active ? "w-full" : "w-0"
        }`}
      />
    </Link>
  );
}
