import React, { useEffect } from "react";
import { ABOUT_CONTENTS, AboutContents } from "../constants/about";
import Image from "next/image";
import Link from "next/link";

const About: React.FC = () => {
  const aboutData: AboutContents = ABOUT_CONTENTS[0];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".fade-in-element");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-element">
          <h2 className="font-bebas-neue text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            {aboutData.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            {aboutData.subtitle}
          </p>
        </div>

        {/* my journey */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in-element">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
              <div className="pl-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
                  My Journey
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  {aboutData.story.map((paragraph, index) => (
                    <p key={index} className="text-base md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {aboutData.values.map((value, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div className="text-cyan-400 text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-heartbeat">
                    {value.icon}
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 fade-in-element">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1 group">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 absolute inset-0 pointer-events-none transition-all duration-300">
                      {Array.from("Chin Sakda").map((char, i, arr) => {
                        const startAngle = Math.PI;
                        const endAngle = 0;
                        const angle =
                          startAngle -
                          (i / (arr.length - 1)) * (startAngle - endAngle);
                        const radius = 103;
                        const center = 96;
                        const x = center + radius * Math.cos(angle);
                        const y = center + radius * Math.sin(angle);
                        return (
                          <span
                            key={i}
                            style={{
                              position: "absolute",
                              left: `${x}px`,
                              top: `${y}px`,
                              transform: `translate(-50%, -50%) rotate(${
                                (angle * 180) / Math.PI - 90
                              }deg)`,
                              fontSize: "1rem",
                              color: "#38bdf8",
                              fontWeight: "bold",
                              letterSpacing: "1px",
                              whiteSpace: "pre",
                            }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>{" "}
                    <Image
                      src="/self.png"
                      alt="Profile Picture"
                      className="w-full h-full rounded-full object-cover hover:scale-105 transition-all duration-300"
                      width={192}
                      height={192}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Technical Skills
              </h3>
              <div className="space-y-4">
                {aboutData.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-cyan-400 text-sm font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aboutData.stats.map((stat, index) => (
                <Link
                  href={stat.href || "#"}
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {aboutData.tools.map((tool) => (
                  <span
                    key={tool.id}
                    className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full text-sm text-gray-200 border border-gray-600 hover:border-cyan-400/50 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 cursor-default group"
                  >
                    {tool.name}
                    <div className="absolute opacity-0 top-10 right-10 xl:group-hover:opacity-100">
                      <Image
                        src={tool.imgSrc}
                        alt={tool.imgAlt}
                        width={50}
                        height={30}
                      />
                    </div>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center fade-in-element">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to work together?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              I am always excited to take on new challenges and collaborate on
              innovative projects. Let us discuss how we can bring your ideas to
              life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                <span>Get In Touch</span>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>
              <Link
                href="/projects"
                key={aboutData.title}
                className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                <span>View My Work</span>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
