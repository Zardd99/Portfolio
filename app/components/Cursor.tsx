"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };

    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      setRingX(pos.x);
      setRingY(pos.y);
    };

    const enter = () => gsap.to(ring, { scale: 2.2, duration: 0.3, borderColor: "var(--accent)" });
    const leave = () => gsap.to(ring, { scale: 1, duration: 0.3, borderColor: "rgba(245,245,243,0.4)" });

    window.addEventListener("mousemove", move);
    gsap.ticker.add(tick);

    const hoverables = () =>
      document.querySelectorAll("a, button, [data-cursor]");
    hoverables().forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    const reobserve = setInterval(() => {
      hoverables().forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", move);
      gsap.ticker.remove(tick);
      clearInterval(reobserve);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[300] hidden lg:block">
      <div
        ref={ringRef}
        className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-[rgba(245,245,243,0.4)] mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
    </div>
  );
};

export default Cursor;
