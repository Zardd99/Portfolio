"use client";

import Link from "next/link";
import { NAV_ITEMS } from "../constants/navbar";
import { scrambleText } from "../lib/scramble";

const SOCIALS = [
  { label: "GITHUB", href: "https://github.com/Zardd99" },
  { label: "EMAIL", href: "mailto:lqykim275@gmail.com" },
  { label: "RESUME", href: "/Resume.pdf" },
];

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-line bg-[#070708] px-6 pb-10 pt-16 md:px-12">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-[14vw] leading-[0.8] text-ink md:text-[8vw]">
              SAKDA<span className="text-accent">.</span>
            </h2>
            <p className="mt-3 max-w-sm text-sm text-muted">
              Front-end engineer crafting responsive, motion-driven web experiences.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="font-hud text-[10px] text-muted">{"// MENU"}</span>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-hud text-[11px] text-ink/80 transition-colors hover:text-accent"
                  onMouseEnter={(e) => scrambleText(e.currentTarget, item.label.toUpperCase())}
                >
                  {item.label.toUpperCase()}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-hud text-[10px] text-muted">{"// ELSEWHERE"}</span>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-hud text-[11px] text-ink/80 transition-colors hover:text-accent"
                  onMouseEnter={(e) => scrambleText(e.currentTarget, s.label)}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-hud text-[10px] text-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} SAKDA CHIN — ALL RIGHTS RESERVED</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            AVAILABLE FOR WORK
          </span>
          <span>BUILT WITH NEXT · GSAP · THREE.JS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
