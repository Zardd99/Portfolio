"use client";

import Link from "next/link";
import { NAV_ITEMS } from "../constants/navbar";
import { scrambleText } from "../lib/scramble";

const SOCIALS = [
  { label: "GITHUB", href: "https://github.com/Zardd99" },
  { label: "EMAIL", href: "mailto:c.sakda.chin@gmail.com" },
  { label: "RESUME", href: "/Resume.pdf" },
];

/**
 * Footer detail panel — the OPAQUE block that rides on top of the
 * <FooterReveal> giant name. Its solid background is what keeps the reveal
 * hidden until the page scrolls past this panel.
 */
const Footer = () => {
  return (
    <div className="relative z-10 border-t border-line bg-[#070708] px-6 pb-14 pt-16 md:px-12">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="relative mx-auto max-w-[1600px]">
        {/* CTA line */}
        <div className="flex flex-col gap-8 border-b border-line pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-hud text-[11px] text-accent">■ LET&apos;S CONNECT</span>
            <Link
              href="/#contact"
              className="group mt-4 flex items-center gap-3 font-display text-5xl leading-[0.9] text-ink md:text-7xl"
              onMouseEnter={(e) =>
                scrambleText(e.currentTarget.querySelector("span")!, "START A PROJECT")
              }
            >
              <span>START A PROJECT</span>
              <span className="text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
          <a
            href="mailto:c.sakda.chin@gmail.com"
            className="font-hud text-[11px] text-muted transition-colors hover:text-accent"
          >
            c.sakda.chin@gmail.com
          </a>
        </div>

        {/* columns */}
        <div className="mt-12 grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl text-ink">SAKDA.DEV</span>
              <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Front-end engineer crafting responsive, motion-driven web experiences from
              Phnom Penh, Cambodia.
            </p>
          </div>

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
    </div>
  );
};

export default Footer;
