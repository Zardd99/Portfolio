import React from "react";
import { Skills } from "../../constants/about";
import gsap from "gsap";

const AboutSkills = ({ skills }: { skills: Skills[] }) => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
        Technical Skills
      </h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 font-medium">{skill.name}</span>
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
  );
};

export default AboutSkills;
