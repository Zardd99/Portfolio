"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrambleText } from "../lib/scramble";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky-reveal footer. The giant name lives in a `fixed` layer pinned to the
 * bottom of the viewport, sitting BEHIND the opaque <main> (which carries a
 * solid bg + higher z-index). As the page scrolls to its end, <main> lifts away
 * and uncovers the name — the spacer <section> below reserves the scroll
 * distance for that reveal. A scrubbed tween makes the name actively rise.
 */
const FooterReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fr-giant",
        { yPercent: 16, autoAlpha: 0.55 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
      gsap.from(".fr-legal > *", {
        autoAlpha: 0,
        y: 18,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 55%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen">
      <div className="fixed inset-x-0 bottom-0 z-0 flex h-screen flex-col justify-end overflow-hidden bg-[#070708] px-6 pb-6 md:px-12">
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />

        {/* giant wordmark */}
        <div className="fr-giant relative flex flex-col leading-[0.76]">
          <span
            className="font-display text-[26vw] text-ink md:text-[21vw]"
            onMouseEnter={(e) => scrambleText(e.currentTarget, "SAKDA")}
          >
            SAKDA
          </span>
          <span className="font-display text-[26vw] text-ink md:text-[21vw]">
            CHIN<span className="text-accent">.</span>
          </span>
        </div>

        {/* legal / meta row */}
        <div className="fr-legal mt-8 flex flex-col gap-3 border-t border-line pt-5 font-hud text-[10px] text-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} SAKDA CHIN — ALL RIGHTS RESERVED</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            AVAILABLE FOR WORK
          </span>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
          >
            BACK TO TOP
            <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterReveal;
