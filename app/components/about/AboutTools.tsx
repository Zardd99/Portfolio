import React from "react";
import Image from "next/image";
import { Tool } from "@/app/constants/about";

const AboutTools = ({ tools }: { tools: Tool[] }) => (
  <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
      Tools & Technologies
    </h3>
    <div className="flex flex-wrap gap-3">
      {tools.map((tool) => (
        <span
          key={tool.id}
          className=" px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full text-sm text-gray-200 border border-gray-600 hover:border-cyan-400/50 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 cursor-default group"
        >
          {tool.name}
          <div className="absolute right-10 top-10 -translate-x-1/2 mt-2 opacity-0 xl:group-hover:opacity-100 pointer-events-none transition-all duration-300 z-10">
            <Image src={tool.imgSrc} alt={tool.imgAlt} width={50} height={30} />
          </div>
        </span>
      ))}
    </div>
  </div>
);

export default AboutTools;
