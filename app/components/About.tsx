"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_CONTENTS } from "../constants/about";
import { scrambleText } from "../lib/scramble";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const data = ABOUT_CONTENTS[0];
  const rootRef = useRef<HTMLDivElement>(null);

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

      gsap.utils.toArray<HTMLElement>(".skill-bar").forEach((bar) => {
        gsap.to(bar, {
          scaleX: Number(bar.dataset.level) / 100,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 90%" },
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
          <div className="reveal space-y-8">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line">
              <Image
                src="/Self.png"
                alt="Sakda Chin"
                fill
                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="scanlines absolute inset-0" />
              <span className="absolute bottom-3 left-3 font-hud text-[9px] text-accent">
                ● SAKDA_CHIN.JPG
              </span>
            </div>
            <div className="space-y-5">
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
              <div className="space-y-5">
                {data.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-baseline justify-between">
                      <span className="text-sm text-ink">{skill.name}</span>
                      <span className="font-hud text-[10px] text-accent">{skill.level}%</span>
                    </div>
                    <div className="h-px w-full bg-white/10">
                      <div
                        className="skill-bar h-full w-full origin-left scale-x-0 bg-accent"
                        data-level={skill.level}
                      />
                    </div>
                  </div>
                ))}
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
