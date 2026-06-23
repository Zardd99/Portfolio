"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../constants/project";
import { scrambleText } from "../lib/scramble";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const N = projects.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];

      gsap.set(cards[0], { z: 0, autoAlpha: 1, filter: "blur(0px)" });
      gsap.set(cards.slice(1), { z: -2600, autoAlpha: 0, filter: "blur(36px)" });
      gsap.set(dots[0], { backgroundColor: "#cbff47", scale: 1.4 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: viewportRef.current,
          start: "top top",
          end: () => `+=${(N - 1) * window.innerHeight}`,
          scrub: 1.5,
          pin: viewportRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < N - 1; i++) {
        tl.to(cards[i], { z: 600, autoAlpha: 0, filter: "blur(28px)", duration: 1 }, i)
          .to(
            cards[i + 1],
            { z: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1 },
            i
          )
          .to(dots[i], { backgroundColor: "#3a3a40", scale: 1 }, i)
          .to(dots[i + 1], { backgroundColor: "#cbff47", scale: 1.4 }, i);
      }
    }, rootRef);

    return () => ctx.revert();
  }, [N]);

  // Magnetic follow — same physics as the Download CV button.
  const magnet = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.3,
      y: (e.clientY - (r.top + r.height / 2)) * 0.3,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const resetMagnet = (e: MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });

  return (
    <section id="projects" ref={rootRef} className="relative w-full border-t border-line">
      <div
        ref={viewportRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

        {/* floating section label + progress */}
        <div className="pointer-events-none absolute inset-x-6 top-24 z-[60] flex items-center justify-between font-hud text-[11px] text-muted md:inset-x-12">
          <span className="text-accent">■ 02 / SELECTED WORK</span>
          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <span
                key={p.id}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="h-1.5 w-1.5 rotate-45 bg-[#3a3a40]"
              />
            ))}
          </div>
        </div>

        {/* stacked cards */}
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
            style={{ transformStyle: "preserve-3d", zIndex: N - i }}
          >
            <div className="grid w-full max-w-[1500px] items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              {/* text */}
              <div className="order-2 lg:order-1">
                {project.featured && (
                  <div className="accent-glow mb-5 inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3 py-1.5 font-hud text-[9px] text-accent">
                    <span className="animate-pulse-dot">★</span> FLAGSHIP PROJECT
                  </div>
                )}
                <div className="flex items-center gap-4 font-hud text-[11px] text-muted">
                  <span className="font-display text-6xl text-accent md:text-7xl">
                    0{i + 1}
                  </span>
                  <span className="flex flex-col">
                    <span>{project.category.toUpperCase()}</span>
                    <span className="text-accent">{project.date}</span>
                  </span>
                </div>
                <h3
                  className="font-display mt-4 text-5xl leading-[0.9] text-ink md:text-7xl"
                  onMouseEnter={(e) => scrambleText(e.currentTarget, project.title)}
                >
                  {project.title}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
                  {!project.featured && project.description.length > 280
                    ? project.description.slice(0, 280).trimEnd() + "…"
                    : project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border border-line px-3 py-1.5 font-hud text-[9px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    onMouseMove={magnet}
                    onMouseLeave={resetMagnet}
                    className="group inline-flex items-center gap-2 bg-accent px-6 py-3 font-hud text-[10px] text-[#0a0a0b]"
                  >
                    LIVE DEMO
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-line px-6 py-3 font-hud text-[10px] text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    <Github size={14} />
                    SOURCE
                  </a>
                </div>
              </div>

              {/* media */}
              <div className="order-1 lg:order-2">
                <div
                  className={`group relative aspect-[16/10] w-full overflow-hidden border bg-[#101013] ${
                    project.featured
                      ? "border-accent/40 shadow-[0_0_70px_-18px_rgba(203,255,71,0.55)]"
                      : "border-line"
                  }`}
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <div className="scanlines absolute inset-0" />
                  <div className="absolute left-3 top-3 flex items-center gap-2 font-hud text-[9px] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                    LIVE_PREVIEW
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 font-hud text-[9px] text-muted opacity-0 transition-opacity group-hover:opacity-100">
                    OPEN <ExternalLink size={10} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* scroll hint */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-hud text-[9px] text-muted">
          KEEP SCROLLING TO EXPLORE
        </div>
      </div>
    </section>
  );
};

export default Projects;
