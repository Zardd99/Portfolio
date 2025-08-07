import React from "react";
import { Values } from "../../constants/about";

const AboutValues = ({ values }: { values: Values[] }) => (
  <div className="grid sm:grid-cols-2 gap-6 mt-8">
    {values.map((value) => (
      <div
        key={value.title}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group"
      >
        <div className="text-cyan-400 text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-heartbeat">
          {value.icon}
        </div>
        <h4 className="font-semibold text-white mb-2">{value.title}</h4>
        <p className="text-gray-400 text-sm">{value.description}</p>
      </div>
    ))}
  </div>
);

export default AboutValues;
