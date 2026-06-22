"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const BOOT_LINES = [
  "> initializing runtime …",
  "> mounting react 19 · next 15",
  "> compiling shaders · gsap timeline",
  "> loading assets [████████████] ok",
  "> session ready",
];

const Preloader = () => {
  const [visible, setVisible] = useState<boolean | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("pf_loaded");
    if (seen) {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const count = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("pf_loaded", "1");
          gsap
            .timeline({
              onComplete: () => {
                document.body.style.overflow = "";
                setVisible(false);
              },
            })
            .to(".pl-top", { yPercent: -100, duration: 0.7, ease: "power3.inOut" })
            .to(".pl-bottom", { yPercent: 100, duration: 0.7, ease: "power3.inOut" }, "<")
            .to(rootRef.current, { autoAlpha: 0, duration: 0.2 }, "-=0.15");
        },
      });

      tl.to(count, {
        v: 100,
        duration: 2.1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.textContent = String(Math.floor(count.v)).padStart(3, "0");
          if (barRef.current) barRef.current.style.width = `${count.v}%`;
        },
      });

      gsap.fromTo(
        ".pl-log-line",
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, stagger: 0.32, duration: 0.3, ease: "power2.out" }
      );
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[400] flex flex-col"
    >
      {/* top panel */}
      <div className="pl-top relative flex flex-1 items-end justify-center overflow-hidden bg-[#070708] scanlines">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 animate-spin-slow" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 animate-spin-slow" />
        <h1 className="font-display relative mb-10 text-[18vw] leading-none text-ink md:text-[12vw]">
          SAK<span className="text-accent">DA</span>
        </h1>
      </div>

      {/* bottom panel */}
      <div className="pl-bottom relative flex flex-1 flex-col justify-start overflow-hidden bg-[#070708] px-6 pt-6 md:px-16">
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="flex items-center justify-between font-hud text-[10px] text-muted">
          <span>■ booting portfolio</span>
          <span>
            <span ref={counterRef}>000</span> / 100
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-white/10">
          <div ref={barRef} className="h-full w-0 bg-accent" />
        </div>
        <div ref={logRef} className="mt-5 space-y-1 font-hud text-[10px] tracking-[0.1em] text-muted">
          {BOOT_LINES.map((line) => (
            <div key={line} className="pl-log-line">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
