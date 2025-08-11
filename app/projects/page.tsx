"use client";
import React, { useState, useRef, useEffect } from "react";
import { Github, ExternalLink, Calendar } from "lucide-react";
import {
  projects,
  categories,
  ProjectsT,
  CategoriesT,
} from "../constants/project";
import Image from "next/image";
import Navbar from "../components/Navbar";
import AboutContact from "../components/about/AboutContact";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Stats, ABOUT_CONTENTS } from "../constants/about";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsData: ProjectsT[] = projects;
  const categoriesData: CategoriesT[] = categories;
  const [filter, setFilter] = useState("all");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const stickyTitleRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const stats: Stats[] = ABOUT_CONTENTS[0].stats;

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === filter);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document
      .querySelectorAll(".fade-in-element")
      .forEach((el) => observer.observe(el));

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [filteredProjects]);

  useEffect(() => {
    gsap.set(".project-card", {
      opacity: 1,
      y: 0,
      clearProps: "all",
    });
  }, [filter]);

  useEffect(() => {
    if (
      titleRef.current &&
      heroSectionRef.current &&
      projectsGridRef.current &&
      stickyTitleRef.current &&
      contactRef.current
    ) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top 60%",
          end: "bottom top",
          scrub: true,
          markers: false,
        },
      });

      mainTimeline
        .to(stickyTitleRef.current, {
          position: "sticky",
          top: "20%",
          left: "65%",
          x: "0%",
          scale: 1,
          opacity: 0.1,
          duration: 0.1,
        })
        .to(
          stickyTitleRef.current,
          {
            position: "sticky",
            left: "65%",
            top: "20%",
            x: "0%",
            scale: 1,
            opacity: 1,
            duration: 5,
          },
          "<0.3"
        );

      ScrollTrigger.create({
        trigger: projectsGridRef.current,
        start: "top top",
        endTrigger: contactRef.current,
        end: "top +=60%",
        pin: titleRef.current,
        pinSpacing: false,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;

          gsap.to(stickyTitleRef.current, {
            y: progress * 20,
            duration: 0.1,
            ease: "none",
          });
        },
        onLeave: () => {
          const rect = stickyTitleRef.current!.getBoundingClientRect();
          gsap.set(stickyTitleRef.current, {
            position: "sticky",
            top: rect.top,
            left: rect.left,
          });
        },
        onEnterBack: () => {
          gsap.set(stickyTitleRef.current, {
            position: "sticky",
            top: "20%",
            left: "65%",
            transform: "none",
            opacity: 1,
          });
        },
      });

      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          gsap.to(contactRef.current, {
            opacity: 1,
            duration: 0.5,
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [filteredProjects]);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen text-white w-screen container">
        {/* Hero Section */}
        <div
          ref={heroSectionRef}
          className="container mx-auto rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1
                ref={titleRef}
                className="font-bebas-neue text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-6"
              ></h1>
            </div>
          </div>
        </div>

        {/* Sticky Title */}
        <div
          ref={stickyTitleRef}
          className="sticky left-[60%] top-[0%] w-[22rem] opacity-0 z-40 hidden lg:block pb-6"
          style={{ pointerEvents: "none" }}
        >
          <h1 className="font-bebas-neue text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent text-right">
            My Projects
          </h1>
          <div className="h-1 bg-gradient-to-l from-purple-500 to-transparent mt-4 ml-auto w-3/4"></div>
          <div className="p-4"></div>
          <p className="font-ibm-plex-sans text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed text-right">
            A showcase of my latest work, featuring modern web applications,
            innovative solutions, and cutting-edge technologies.
          </p>
        </div>

        {/* Projects Container */}
        <div className="xl:max-w-xl lg:max-w-lg 2xl:max-w-3xl mx-auto lg:ml-30 xl:ml-50 px-4 sm:px-6 lg:px-8 pt-12 container">
          <div
            ref={projectsGridRef}
            className="transition-all duration-500 ml-0 w-full"
          >
            {/* Filter Section */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categoriesData.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setFilter(category.key)}
                  className={`px-6 py-3 rounded-full text-sm z-50 font-medium transition-all duration-300 cursor-pointer ${
                    filter === category.key
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={`${project.id}-${filter}`}
                  className="group fade-in-element bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative overflow-hidden h-60">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={500}
                      height={500}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar size={14} />
                        <span className="text-sm">{project.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Github size={16} />
                        Code
                      </a>
                      <a
                        href={project.live}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div
        className="mt-10 bg-gradient-to-r from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 container mx-auto"
        ref={contactRef}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="fade-in-element">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
        <AboutContact />
      </div>
    </>
  );
};

export default Projects;
