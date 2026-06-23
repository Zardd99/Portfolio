"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "../constants/navbar";
import { scrambleText } from "../lib/scramble";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setScrolled(window.scrollY > 40);
      const max = h.scrollHeight - h.clientHeight || 1;
      const p = Math.min(Math.max(h.scrollTop / max, 0), 1);
      if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
      if (headRef.current) headRef.current.style.opacity = p > 0.004 ? "1" : "0";
      if (percentRef.current)
        percentRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[200] transition-colors duration-500 ${
        scrolled
          ? "border-b border-line bg-[#0a0a0b]/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between overflow-hidden px-6 md:h-20 md:px-12">
        {/* whole-page scroll progress — fills the row, kept faint so it never
            overpowers the nav; a glowing playhead marks the exact position */}
        <div
          ref={fillRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-accent/10"
        >
          <span
            ref={headRef}
            className="absolute inset-y-0 right-0 w-px bg-accent/70 opacity-0 shadow-[0_0_10px_1px_rgba(203,255,71,0.55)]"
          />
        </div>

        <Link
          href="/#home"
          className="group relative z-10 flex items-center gap-2.5"
          onMouseEnter={(e) =>
            scrambleText(e.currentTarget.querySelector("span")!, "SAKDA.DEV")
          }
        >
          <span className="font-display text-2xl tracking-wide text-ink md:text-3xl">
            SAKDA.DEV
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-accent animate-pulse-dot" />
          <span className="ml-1 hidden font-hud text-[10px] text-accent/70 sm:inline">
            <span ref={percentRef}>000</span>%
          </span>
        </Link>

        <div className="relative z-10 hidden items-center gap-9 md:flex">
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
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
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
