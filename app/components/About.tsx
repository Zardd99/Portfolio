import React, { useEffect } from "react";
import { ABOUT_CONTENTS, AboutContents } from "../constants/about";
import AboutHeader from "./about/AboutHeader";
import AboutJourney from "./about/AboutJourney";
import AboutValues from "./about/AboutValues";
import AboutProfileImage from "./about/AboutProfileImage";
import AboutSkills from "./about/AboutSkills";
import AboutStats from "./about/AboutStats";
import AboutTools from "./about/AboutTools";
import AboutContact from "./about/AboutContact";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AboutHeader title={aboutData.title} subtitle={aboutData.subtitle} />
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 fade-in-element">
          <AboutJourney story={aboutData.story} />
          <AboutValues values={aboutData.values} />
        </div>
        <div className="space-y-8 fade-in-element">
          <AboutProfileImage />
          <AboutSkills skills={aboutData.skills} />
          <AboutStats stats={aboutData.stats} />
          <AboutTools tools={aboutData.tools} />
        </div>
      </div>
      <AboutContact />
    </div>
  );
};

export default About;
