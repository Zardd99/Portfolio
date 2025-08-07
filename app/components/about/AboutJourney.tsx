import React from "react";
import { AboutContents } from "../../constants/about";
type AboutJourneyProps = Pick<AboutContents, "story">;

const AboutJourney = ({ story }: AboutJourneyProps) => (
  <div className="relative">
    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
    <div className="pl-8">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
        My Journey
      </h3>
      <div className="space-y-4 text-gray-300 leading-relaxed">
        {story.map((paragraph, idx) => (
          <p key={idx} className="text-base md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default AboutJourney;
