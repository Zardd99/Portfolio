"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_CONTENTS } from "../constants/about";
import { scrambleText } from "../lib/scramble";

gsap.registerPlugin(ScrollTrigger);

const WAVE_BARS = 34;

const About = () => {
  const data = ABOUT_CONTENTS[0];
  const rootRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // ── Sound-wave skill bars: the accent ("played") bars ripple like an
      //    equalizer; the wave starts the moment each row scrolls into view.
      gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row) => {
        const bars = row.querySelectorAll<HTMLElement>(".wave-bar.is-active");
        ScrollTrigger.create({
          trigger: row,
          start: "top 90%",
          once: true,
          onEnter: () => {
            bars.forEach((bar, i) => {
              const envelope = 0.4 + 0.55 * Math.abs(Math.sin(i * 0.55));
              gsap.fromTo(
                bar,
                { scaleY: 0.12 },
                {
                  scaleY: envelope,
                  duration: 0.55,
                  ease: "sine.inOut",
                  repeat: -1,
                  yoyo: true,
                  delay: i * 0.045,
                }
              );
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = `${Math.floor(obj.v)}${suffix}`;
          },
        });
      });

      // ── Profile card: cinematic scroll-in, in-frame parallax, scan sweep.
      gsap.set(".profile-img", { scale: 1.14 });
      gsap.from(".profile-card", {
        autoAlpha: 0,
        y: 70,
        rotateX: -22,
        transformOrigin: "50% 100%",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: portraitRef.current, start: "top 85%" },
      });
      gsap.fromTo(
        ".profile-img",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        ".profile-scan",
        { top: "-5%" },
        { top: "105%", duration: 2.8, ease: "none", repeat: -1 }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * 12,
      rotateX: -py * 12,
      transformPerspective: 700,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const untilt = (e: React.MouseEvent<HTMLDivElement>) =>
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1,0.4)",
    });

  const tiltPortrait = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = portraitRef.current?.querySelector(".profile-card");
    if (!card) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateY: px * 18,
      rotateX: -py * 18,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  const resetPortrait = () => {
    const card = portraitRef.current?.querySelector(".profile-card");
    if (card) gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1,0.4)" });
  };

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative w-full border-t border-line px-6 py-28 md:px-12"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* header */}
        <div className="reveal mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-hud text-[11px] text-accent">■ 01 / WHO I AM</span>
            <h2
              className="font-display mt-3 text-[16vw] leading-[0.85] md:text-[9vw]"
              onMouseEnter={(e) => scrambleText(e.currentTarget, "ABOUT")}
            >
              ABOUT
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{data.subtitle}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* left: portrait + story */}
          <div className="space-y-10">
            {/* 3D profile card */}
            <div
              ref={portraitRef}
              onMouseMove={tiltPortrait}
              onMouseLeave={resetPortrait}
              className="relative [perspective:1000px]"
            >
              <div className="profile-card group relative aspect-[4/5] w-full [transform-style:preserve-3d]">
                {/* depth frames behind */}
                <div
                  className="pointer-events-none absolute -inset-3 border border-accent/25"
                  style={{ transform: "translateZ(-60px)" }}
                />
                <div
                  className="pointer-events-none absolute -inset-7 border border-white/5"
                  style={{ transform: "translateZ(-110px)" }}
                />

                {/* image frame */}
                <div
                  className="relative h-full w-full overflow-hidden border border-line"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <Image
                    src="/Self.png"
                    alt="Sakda Chin"
                    fill
                    className="profile-img object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="scanlines absolute inset-0" />
                  <div className="profile-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/70 shadow-[0_0_12px_2px_rgba(203,255,71,0.5)]" />
                  <div className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/[0.06]" />
                </div>

                {/* corner brackets */}
                {[
                  "left-1.5 top-1.5 border-l border-t",
                  "right-1.5 top-1.5 border-r border-t",
                  "left-1.5 bottom-1.5 border-l border-b",
                  "right-1.5 bottom-1.5 border-r border-b",
                ].map((c) => (
                  <span
                    key={c}
                    className={`pointer-events-none absolute h-5 w-5 border-accent ${c}`}
                    style={{ transform: "translateZ(55px)" }}
                  />
                ))}

                {/* HUD overlays */}
                <div
                  className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 font-hud text-[9px] text-accent"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> REC
                </div>
                <span
                  className="pointer-events-none absolute bottom-3 left-3 font-hud text-[9px] text-accent"
                  style={{ transform: "translateZ(60px)" }}
                >
                  ● SAKDA_CHIN.JPG
                </span>
                <span
                  className="pointer-events-none absolute bottom-3 right-3 font-hud text-[9px] text-muted"
                  style={{ transform: "translateZ(60px)" }}
                >
                  4:5
                </span>

                {/* spinning dashed badge */}
                <div
                  className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 animate-spin-slow rounded-full border border-dashed border-accent/40"
                  style={{ transform: "translateZ(75px)" }}
                />
              </div>
            </div>

            <div className="reveal space-y-5">
              {data.story.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted">
                  <span className="mr-2 font-hud text-[10px] text-accent">0{i + 1}</span>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* right: skills + stats */}
          <div className="space-y-12">
            <div className="reveal">
              <h3 className="mb-6 font-hud text-[11px] text-muted">{"// TECHNICAL STACK"}</h3>
              <div className="space-y-6">
                {data.skills.map((skill) => {
                  const active = Math.round((skill.level / 100) * WAVE_BARS);
                  return (
                    <div key={skill.name} className="skill-row">
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-sm text-ink">{skill.name}</span>
                        <span className="font-hud text-[10px] text-accent">{skill.level}%</span>
                      </div>
                      <div className="flex h-11 items-center gap-[2px]">
                        {Array.from({ length: WAVE_BARS }).map((_, i) => (
                          <span
                            key={i}
                            className={`wave-bar h-full min-w-0 flex-1 rounded-full ${
                              i < active ? "is-active bg-accent" : "bg-white/10"
                            }`}
                            style={{ transform: "scaleY(0.12)" }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="reveal grid grid-cols-3 gap-px border border-line bg-line">
              {data.stats.map((stat) => (
                <div key={stat.label} className="bg-[#0a0a0b] p-6">
                  <div
                    className="stat-num font-display text-5xl text-accent md:text-6xl"
                    data-value={parseInt(stat.number)}
                    data-suffix={stat.number.replace(/[0-9]/g, "")}
                  >
                    0
                  </div>
                  <div className="mt-2 text-xs leading-tight text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* values */}
            <div className="reveal grid grid-cols-2 gap-4">
              {data.values.map((v) => (
                <div
                  key={v.title}
                  onMouseMove={tilt}
                  onMouseLeave={untilt}
                  className="group border border-line bg-[#101013] p-6 transition-colors hover:border-accent/50"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-2xl">{v.icon}</div>
                  <h4 className="mt-3 font-display text-2xl text-ink">{v.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* tools marquee */}
        <div className="reveal mt-16">
          <h3 className="mb-6 font-hud text-[11px] text-muted">{"// DAILY TOOLKIT"}</h3>
          <div className="flex flex-wrap gap-3">
            {data.tools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center gap-2.5 border border-line bg-[#101013] px-4 py-2.5 transition-colors hover:border-accent/50"
              >
                <Image src={tool.imgSrc} alt={tool.imgAlt} width={18} height={18} className="object-contain" />
                <span className="font-hud text-[10px] text-muted">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
