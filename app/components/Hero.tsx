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
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".hero-line", {
        yPercent: 120,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
      })
        .from(
          ".hero-fade",
          { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.5"
        )
        .from(".hero-chip", { autoAlpha: 0, y: 12, stagger: 0.05, duration: 0.4 }, "-=0.4");

      // mouse parallax on the name block
      const onMove = (e: MouseEvent) => {
        const dx = (e.clientX / window.innerWidth - 0.5) * 2;
        const dy = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(nameRef.current, {
          rotateY: dx * 6,
          rotateX: -dy * 6,
          x: dx * 14,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 900,
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, rootRef);

    return () => ctx.revert();
  }, []);

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
          <div className="overflow-hidden">
            <div className="hero-line text-[19vw] md:text-[16vw] lg:text-[14vw]">
              SAKDA
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line text-[19vw] md:text-[16vw] lg:text-[14vw]">
              <span className="text-stroke-accent">CHIN</span>
              <span className="text-accent">.</span>
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
