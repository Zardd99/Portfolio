"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { NAV_ITEMS } from "../constants/navbar";
import { scrambleText } from "../lib/scramble";

const SOCIALS = [
  { label: "GITHUB", href: "https://github.com/Zardd99" },
  { label: "EMAIL", href: "mailto:c.sakda.chin@gmail.com" },
  { label: "RESUME", href: "/Resume.pdf" },
];

const MISS_JOKES = [
  { text: "BRUH…", emoji: "💀" },
  { text: "MISSED ME!", emoji: "🏃" },
  { text: "TOO SLOW", emoji: "😎" },
  { text: "NICE TRY", emoji: "😂" },
  { text: "SKILL ISSUE", emoji: "🤡" },
  { text: "CATCH ME!", emoji: "👻" },
  { text: "ALMOST!", emoji: "😭" },
  { text: "NOPE", emoji: "✋" },
];

type Joke = { id: number; x: number; y: number; text: string; emoji: string };

/**
 * Footer detail panel — the OPAQUE block that rides on top of the
 * <FooterReveal> giant name. Its solid background is what keeps the reveal
 * hidden until the page scrolls past this panel.
 */
const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const arcadeRef = useRef<HTMLAnchorElement>(null);
  const obstaclesRef = useRef<HTMLElement[]>([]);

  // cache the other footer links once — the ARCADE button steers around these
  useEffect(() => {
    if (!footerRef.current) return;
    obstaclesRef.current = Array.from(
      footerRef.current.querySelectorAll<HTMLElement>("a")
    ).filter((a) => a !== arcadeRef.current);
  }, []);

  // The ARCADE button chases the cursor across the whole footer (same magnetic
  // feel as the Download CV button) but shoves its target out of every other
  // link's personal space, so it dodges the menu items instead of covering them.
  const followArcade = (e: MouseEvent<HTMLDivElement>) => {
    const el = arcadeRef.current;
    if (!el) return;

    const curX = Number(gsap.getProperty(el, "x")) || 0;
    const curY = Number(gsap.getProperty(el, "y")) || 0;
    const r = el.getBoundingClientRect();
    const homeX = r.left + r.width / 2 - curX;
    const homeY = r.top + r.height / 2 - curY;
    const bw = r.width / 2;
    const bh = r.height / 2;

    let tcx = homeX + (e.clientX - homeX) * 0.85;
    let tcy = homeY + (e.clientY - homeY) * 0.85;

    const pad = 8;
    for (let pass = 0; pass < 2; pass++) {
      for (const a of obstaclesRef.current) {
        const o = a.getBoundingClientRect();
        const left = o.left - bw - pad;
        const right = o.right + bw + pad;
        const top = o.top - bh - pad;
        const bottom = o.bottom + bh + pad;
        if (tcx > left && tcx < right && tcy > top && tcy < bottom) {
          const dl = tcx - left;
          const dr = right - tcx;
          const dt = tcy - top;
          const db = bottom - tcy;
          const m = Math.min(dl, dr, dt, db);
          if (m === dl) tcx = left;
          else if (m === dr) tcx = right;
          else if (m === dt) tcy = top;
          else tcy = bottom;
        }
      }
    }

    gsap.to(el, {
      x: tcx - homeX,
      y: tcy - homeY,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  };
  const resetArcade = () =>
    gsap.to(arcadeRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
      overwrite: true,
    });

  // When someone swipes at the (now far-away) button and whiffs, pop a taunt.
  const [joke, setJoke] = useState<Joke | null>(null);
  const jokeTimer = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(jokeTimer.current), []);

  const onFooterClick = (e: MouseEvent<HTMLDivElement>) => {
    const el = arcadeRef.current;
    const root = footerRef.current;
    if (!el || !root) return;
    if ((e.target as HTMLElement).closest("a, button")) return; // a real hit
    const r = el.getBoundingClientRect();
    const dist = Math.hypot(
      e.clientX - (r.left + r.width / 2),
      e.clientY - (r.top + r.height / 2)
    );
    if (dist > 240) return; // only count near-misses of the arcade button
    const fr = root.getBoundingClientRect();
    const pick = MISS_JOKES[Math.floor(Math.random() * MISS_JOKES.length)];
    setJoke({ id: Date.now(), x: e.clientX - fr.left, y: e.clientY - fr.top, ...pick });
    window.clearTimeout(jokeTimer.current);
    jokeTimer.current = window.setTimeout(() => setJoke(null), 1350);
  };

  return (
    <div
      ref={footerRef}
      onMouseMove={followArcade}
      onMouseLeave={resetArcade}
      onClick={onFooterClick}
      className="relative z-10 h-full border-t border-line bg-[#070708] px-6 pb-14 pt-16 md:px-12"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      {joke && (
        <div
          key={joke.id}
          style={{ left: joke.x, top: joke.y }}
          className="animate-pop-joke pointer-events-none absolute z-50 flex items-center gap-2 whitespace-nowrap rounded-2xl border-2 border-[#0a0a0b] bg-[#f5f5f3] px-4 py-2 font-display text-2xl leading-none text-[#0a0a0b] shadow-[3px_3px_0_0_#cbff47]"
        >
          <span className="animate-emoji-bounce text-2xl">{joke.emoji}</span>
          <span>{joke.text}</span>
          <span className="absolute -bottom-1.5 left-7 h-3.5 w-3.5 rotate-45 border-b-2 border-r-2 border-[#0a0a0b] bg-[#f5f5f3]" />
        </div>
      )}
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
            <Link
              ref={arcadeRef}
              href="/play"
              className="group relative mt-1 inline-flex w-fit items-center gap-2.5 self-start"
              onMouseEnter={(e) =>
                scrambleText(e.currentTarget.querySelector(".arcade-label")!, "▶ ARCADE")
              }
            >
              <span className="arcade-label inline-flex items-center border border-accent bg-accent/10 px-3 py-1.5 font-hud text-[11px] text-accent shadow-[0_0_18px_-5px_rgba(203,255,71,0.8)] animate-nudge group-hover:animate-none">
                ▶ ARCADE
              </span>
              <span className="flex items-center gap-1 font-hud text-[10px] text-accent animate-bob-x group-hover:animate-none">
                <span className="text-sm">←</span> PLAY ME
              </span>
            </Link>
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
