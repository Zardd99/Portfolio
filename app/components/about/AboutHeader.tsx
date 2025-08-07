import React from "react";
import { AboutContents } from "../../constants/about";
type AboutHeaderProps = Pick<AboutContents, "title" | "subtitle">;

const AboutHeader = ({ title, subtitle }: AboutHeaderProps) => (
  <div className="text-center mb-16 fade-in-element">
    <h2 className="font-bebas-neue text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
      {title}
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
    <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
  </div>
);

export default AboutHeader;
