import React, { useEffect, useRef } from "react";
import { HERO_CONTENT, HeroContents } from "../constants/hero";
import CVDownload from "./CVDownload";
import { gsap } from "gsap";

const Hero = () => {
  const heroData: HeroContents = HERO_CONTENT[0];
  const containerRef = useRef(null);
  const containerClass = "mt-5 text-center";
  const [currentTitle, setCurrentTitle] = React.useState(heroData.title);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) =>
        prev === heroData.title ? heroData.title2 : heroData.title
      );
    }, 2100);

    return () => clearInterval(interval);
  }, [heroData.title, heroData.title2]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.killTweensOf(".animated_word");

      gsap.fromTo(
        ".animated_word",
        {
          opacity: 0,
          y: 50,
          transform: "translate3d(0,20px,0) rotateX(0deg) rotateY(0deg)",
        },
        {
          opacity: 1,
          y: 0,
          transform: "translate3d(0,0px,0) rotateX(0deg) rotateY(0deg)",
          ease: "power2.inOut",
          stagger: 0.05,
          repeat: -1,
          yoyo: true,
          repeatDelay: 1,
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const words = document.querySelectorAll(".animated_word");
    if (words.length > 0) {
      gsap.killTweensOf(words);
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.inOut",
          stagger: 0.05,
          repeat: -1,
          yoyo: true,
          repeatDelay: 1,
        }
      );
    }
  }, [currentTitle]);

  return (
    <>
      {/* Introduction */}
      <div className="max-w-4xl space-y-6 md:space-y-8">
        <div className="inline-block relative group">
          <div className="hero__subtitle text-lg md:text-xl lg:text-2xl font-medium bg-gradient-to-r     from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {heroData.subtitle}
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500 group-hover:w-full" />
        </div>

        {/* Title */}
        <div
          className={`hero__title animated_title ${containerClass} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter`}
          ref={containerRef}
        >
          {currentTitle.split("<br />").map((line, index) => (
            <div
              key={`${currentTitle}-${index}`}
              className="flex items-center justify-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
            >
              {line.split(" ").map((word, i) => (
                <span
                  key={`${currentTitle}-${index}-${i}`}
                  className="animated_word"
                  dangerouslySetInnerHTML={{ __html: word }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {heroData.description}
          </p>

          {/* Skills Section */}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-gray-400 text-sm font-medium">
              {heroData.highlight}
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              {heroData.skills.split(" · ").map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs sm:text-sm bg-gray-800 rounded-full text-cyan-300 border border-gray-700 hover:border-cyan-400 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <p className="text-gray-400 text-xs sm:text-sm mt-4">
            {heroData.description2}
          </p>
        </div>

        {/* CV Download Button */}
        <div className="pt-6 animate-fade-in-up">
          <CVDownload className="inline-block px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/20" />
        </div>
      </div>
    </>
  );
};

export default Hero;
