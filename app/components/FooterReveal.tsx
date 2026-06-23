"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrambleText } from "../lib/scramble";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer reveal — the oversized wordmark sits BEHIND the footer detail panel
 * and is uncovered as you scroll. The stage is pinned (GSAP) while the opaque
 * detail panel slides up off it. The whole stage lives in a z-layer ABOVE the
 * navbar (see page.tsx), so once you reach the footer the navbar stays behind
 * it ("swallowed").
 */
const FooterReveal = () => {
  const stageRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=110%",
          scrub: 1,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      // opaque detail slides up and uncovers the giant resting behind it
      tl.to(detailRef.current, { yPercent: -100, ease: "none" }, 0).fromTo(
        ".fr-giant",
        { yPercent: 14 },
        { yPercent: 0, ease: "none" },
        0
      );
    }, stageRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={stageRef}
      id="footer-reveal"
      className="relative h-screen overflow-hidden bg-[#070708]"
    >
      {/* GIANT — rests at the back; uncovered as the detail slides up */}
      <div className="absolute inset-0 z-0 flex flex-col justify-end px-6 pb-6 md:px-12">
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />

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

        <div className="fr-legal mt-[8vh] flex flex-col gap-3 border-t border-line pt-5 font-hud text-[10px] text-muted md:flex-row md:items-center md:justify-between">
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

      {/* DETAIL — opaque cover in front; slides up to uncover the giant */}
      <div ref={detailRef} className="absolute inset-0 z-10 bg-[#070708]">
        <Footer />
      </div>
    </section>
  );
};

export default FooterReveal;
