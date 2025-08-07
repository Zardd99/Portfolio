import React from "react";
import Link from "next/link";
import { Stats } from "../../constants/about";

const AboutStats = ({ stats }: { stats: Stats[] }) => (
  <div className="grid grid-cols-2 gap-4">
    {stats.map((stat) => (
      <Link
        href={stat.href || "#"}
        key={stat.label}
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
);

export default AboutStats;