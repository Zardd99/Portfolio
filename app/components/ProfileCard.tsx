"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// edit these freely — the back of the card reads from here
const FACTS: [string, string][] = [
  ["CLASS", "Front-End Engineer"],
  ["ORIGIN", "Phnom Penh, KH"],
  ["BORN", "—"],
  ["FOCUS", "React · Next · GSAP"],
];

const BRACKETS = [
  "left-1.5 top-1.5 border-l border-t",
  "right-1.5 top-1.5 border-r border-t",
  "left-1.5 bottom-1.5 border-l border-b",
  "right-1.5 bottom-1.5 border-r border-b",
];

/**
 * Interactive 3D "inventory inspect" card. Grab it and drag to rotate it in
 * space (flip past 90° to read the dossier on the back), let go for a little
 * inertia, and "PUT BACK" / double-click to snap it home. It idles with a gentle
 * float so it reads as a grabbable object.
 */
const ProfileCard = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<() => void>(() => {});
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const stage = stageRef.current!;
    const card = cardRef.current!;
    const rot = { x: 0, y: 0 };
    const last = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    let idle: gsap.core.Tween | null = null;
    let drag = false;
    let abort: AbortController | null = null;

    const render = () => {
      rot.x = gsap.utils.clamp(-80, 80, rot.x);
      gsap.set(card, { rotationY: rot.y, rotationX: rot.x });
    };
    const startIdle = () => {
      idle?.kill();
      idle = gsap.to(rot, {
        y: "+=12",
        x: "-=6",
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        onUpdate: render,
      });
    };

    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      last.x = e.clientX;
      last.y = e.clientY;
      vel.x = dx;
      vel.y = dy;
      rot.y += dx * 0.5;
      rot.x -= dy * 0.5;
      render();
    };
    const onUp = () => {
      if (!drag) return;
      drag = false;
      setDragging(false);
      abort?.abort();
      abort = null;
      gsap.to(rot, {
        x: gsap.utils.clamp(-80, 80, rot.x - vel.y * 4),
        y: rot.y + vel.x * 4,
        duration: 1,
        ease: "power3.out",
        onUpdate: render,
        onComplete: startIdle,
      });
    };
    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      drag = true;
      setDragging(true);
      idle?.kill();
      gsap.killTweensOf(rot);
      last.x = e.clientX;
      last.y = e.clientY;
      vel.x = 0;
      vel.y = 0;
      abort = new AbortController();
      window.addEventListener("pointermove", onMove, { signal: abort.signal });
      window.addEventListener("pointerup", onUp, { signal: abort.signal });
    };
    const reset = () => {
      drag = false;
      setDragging(false);
      abort?.abort();
      abort = null;
      idle?.kill();
      gsap.killTweensOf(rot);
      gsap.to(rot, {
        x: 0,
        y: Math.round(rot.y / 360) * 360,
        duration: 0.9,
        ease: "power3.inOut",
        onUpdate: render,
        onComplete: () => {
          rot.y = 0;
          startIdle();
        },
      });
    };
    resetRef.current = reset;

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("dblclick", reset);

    const ctx = gsap.context(() => {
      gsap.from(stage, {
        autoAlpha: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: stage, start: "top 85%" },
      });
      gsap.fromTo(
        ".profile-scan",
        { top: "-6%" },
        { top: "106%", duration: 2.8, ease: "none", repeat: -1 }
      );
    }, stage);

    startIdle();

    return () => {
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("dblclick", reset);
      abort?.abort();
      idle?.kill();
      gsap.killTweensOf(rot);
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={stageRef}
        className={`group relative aspect-[4/5] w-full touch-none select-none [perspective:1200px] ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div ref={cardRef} className="relative h-full w-full [transform-style:preserve-3d]">
          {/* FRONT — the photo */}
          <div className="absolute inset-0 overflow-hidden border border-line [backface-visibility:hidden]">
            <Image
              src="/Self.png"
              alt="Sakda Chin"
              fill
              draggable={false}
              className={`object-cover transition-[filter] duration-700 ${
                dragging ? "grayscale-0" : "grayscale group-hover:grayscale-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="scanlines absolute inset-0" />
            <div className="profile-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/70 shadow-[0_0_12px_2px_rgba(203,255,71,0.5)]" />
            {BRACKETS.map((c) => (
              <span key={c} className={`pointer-events-none absolute h-5 w-5 border-accent ${c}`} />
            ))}
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 font-hud text-[9px] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> REC
            </div>
            <span className="pointer-events-none absolute bottom-3 left-3 font-hud text-[9px] text-accent">
              ● SAKDA_CHIN.JPG
            </span>
            <span className="pointer-events-none absolute bottom-3 right-3 font-hud text-[9px] text-muted">
              4:5
            </span>
          </div>

          {/* BACK — the dossier */}
          <div className="absolute inset-0 flex flex-col overflow-hidden border border-accent/30 bg-[#0c0c0e] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative flex items-center justify-between font-hud text-[9px] text-accent">
              <span>■ DOSSIER</span>
              <span>★★★★☆</span>
            </div>
            <h3 className="font-display relative mt-5 text-4xl leading-none text-ink">SAKDA CHIN</h3>
            <div className="relative mt-1 font-hud text-[10px] text-accent">FRONT-END ENGINEER</div>
            <p className="relative mt-4 text-xs leading-relaxed text-muted">
              Front-end developer from Phnom Penh who loves turning ideas into responsive,
              motion-driven interfaces — built with React, Next.js and a lot of GSAP.
            </p>
            <div className="relative mt-auto space-y-1.5 border-t border-line pt-4">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex justify-between font-hud text-[9px]">
                  <span className="text-muted">{k}</span>
                  <span className="text-ink">{v}</span>
                </div>
              ))}
              <div className="flex justify-between font-hud text-[9px]">
                <span className="text-muted">STATUS</span>
                <span className="flex items-center gap-1.5 text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> AVAILABLE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 font-hud text-[9px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="text-accent">⟲</span> DRAG TO INSPECT · FLIP FOR INTEL
        </span>
        <button
          onClick={() => resetRef.current()}
          className="border border-line px-3 py-1.5 text-ink transition-colors hover:border-accent hover:text-accent"
        >
          ↺ PUT BACK
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
