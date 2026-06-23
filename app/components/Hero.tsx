"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { HERO_CONTENT } from "../constants/hero";
import CVDownload from "./CVDownload";
import { scrambleText } from "../lib/scramble";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const Hero = () => {
  const data = HERO_CONTENT[0];
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const skills = data.skills.split(" · ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      let ready = false;

      const tl = gsap.timeline({
        delay: 0.15,
        onComplete: () => {
          ready = true;
          // open the masks so parting letters aren't clipped
          gsap.set(".hero-mask", { overflow: "visible" });
        },
      });
      tl.from(".hero-line", { yPercent: 120, duration: 1, ease: "power4.out", stagger: 0.12 })
        .from(
          ".hero-fade",
          { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.5"
        )
        .from(".hero-chip", { autoAlpha: 0, y: 12, stagger: 0.05, duration: 0.4 }, "-=0.4");

      // smoothed per-letter setters for the repel
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter", nameRef.current);
      const setX = letters.map((el) => gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" }));
      const setY = letters.map((el) => gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" }));
      const RADIUS = 165;
      const MAX = 85;

      const onMove = (e: MouseEvent) => {
        // keep the existing 3D tilt facing the cursor
        const ndx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ndy = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(nameRef.current, {
          rotateY: ndx * 6,
          rotateX: -ndy * 6,
          x: ndx * 14,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 900,
        });

        if (!ready) return;
        // each letter pushes away from the cursor to open a path through the name
        letters.forEach((el, i) => {
          const curX = Number(gsap.getProperty(el, "x")) || 0;
          const curY = Number(gsap.getProperty(el, "y")) || 0;
          const r = el.getBoundingClientRect();
          const hx = r.left + r.width / 2 - curX;
          const hy = r.top + r.height / 2 - curY;
          const dx = hx - e.clientX;
          const dy = hy - e.clientY;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < RADIUS) {
            const push = (1 - dist / RADIUS) * MAX;
            setX[i]((dx / dist) * push);
            setY[i]((dy / dist) * push);
          } else {
            setX[i](0);
            setY[i](0);
          }
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const renderLetters = (text: string, className = "") =>
    text.split("").map((ch, i) => (
      <span key={`${text}-${i}`} className={`hero-letter inline-block ${className}`}>
        {ch}
      </span>
    ));

  return (
    <section
      id="home"
      ref={rootRef}
      className="scanlines relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pt-28 md:px-12"
    >
      {/* 3D particle backdrop */}
      <ParticleField className="absolute inset-0 -z-10 opacity-80" />
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-40" />

      {/* corner HUD */}
      <div className="pointer-events-none absolute inset-x-6 top-24 flex justify-between font-hud text-[10px] text-muted md:inset-x-12">
        <span>■ {data.subtitle}</span>
        <span className="hidden md:block">PHNOM PENH · 11.55°N</span>
      </div>

      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-6 hero-fade flex items-center gap-3 font-hud text-[11px] text-accent">
          <span className="h-px w-10 bg-accent" />
          PORTFOLIO / 2025 — FRONT-END ENGINEER
        </div>

        <div
          ref={nameRef}
          className="font-display leading-[0.82] text-ink"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="hero-mask overflow-hidden">
            <div className="hero-line text-[19vw] md:text-[16vw] lg:text-[14vw]">
              {renderLetters("SAKDA")}
            </div>
          </div>
          <div className="hero-mask overflow-hidden">
            <div className="hero-line text-[19vw] md:text-[16vw] lg:text-[14vw]">
              {renderLetters("CHIN", "text-stroke-accent")}
              <span className="hero-letter inline-block text-accent">.</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
          <p className="hero-fade max-w-prose text-base leading-relaxed text-muted md:text-lg">
            {data.description}{" "}
            <span className="text-ink">{data.description2}</span>
          </p>

          <div className="hero-fade flex flex-col items-start gap-5 md:items-end">
            <div className="flex flex-wrap gap-2 md:justify-end">
              {skills.map((s) => (
                <span
                  key={s}
                  className="hero-chip border border-line px-3 py-1.5 font-hud text-[10px] text-muted transition-colors hover:border-accent hover:text-accent"
                  onMouseEnter={(e) => scrambleText(e.currentTarget, s)}
                >
                  {s}
                </span>
              ))}
            </div>
            <CVDownload />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-hud text-[9px] text-muted">
        <span>SCROLL</span>
        <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
