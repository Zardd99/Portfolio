"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "../constants/navbar";
import { scrambleText } from "../lib/scramble";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[200] transition-colors duration-500 ${
        scrolled
          ? "border-b border-line bg-[#0a0a0b]/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-12">
        <Link
          href="/#home"
          className="group flex items-center gap-2"
          onMouseEnter={(e) =>
            scrambleText(e.currentTarget.querySelector("span")!, "SAKDA.DEV")
          }
        >
          <span className="font-display text-2xl tracking-wide text-ink md:text-3xl">
            SAKDA.DEV
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-accent animate-pulse-dot" />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-hud text-[11px] text-muted transition-colors hover:text-ink"
              onMouseEnter={(e) =>
                scrambleText(e.currentTarget.querySelector("span")!, item.label)
              }
            >
              <span className="mr-1.5 text-accent/70">0{i + 1}</span>
              <span>{item.label}</span>
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/#contact"
            className="group relative overflow-hidden border border-accent px-5 py-2 font-hud text-[11px] text-accent transition-colors hover:text-[#0a0a0b]"
          >
            <span className="relative z-10">LET&apos;S TALK</span>
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-6 bg-ink transition-all ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span className={`h-px w-6 bg-ink transition-all ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-ink transition-all ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* scroll progress */}
      <div
        ref={progressRef}
        className="h-px w-full origin-left scale-x-0 bg-accent"
      />

      {/* mobile sheet */}
      <div
        className={`overflow-hidden border-t border-line bg-[#0a0a0b]/95 backdrop-blur-md transition-[max-height] duration-500 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line py-4 font-hud text-sm text-muted"
            >
              <span>
                <span className="mr-3 text-accent/70">0{i + 1}</span>
                {item.label}
              </span>
              <span className="text-accent">→</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
