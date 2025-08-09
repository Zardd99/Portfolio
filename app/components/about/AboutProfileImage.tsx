import React from "react";
import Image from "next/image";

const AboutProfileImage = () => (
  <div className="flex justify-center mb-8">
    <div className="relative">
      <div className="w-48 h-48 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1 group">
        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 absolute inset-0 pointer-events-none transition-all duration-300">
            {Array.from("Chin Sakda").map((char, i, arr) => {
              const startAngle = Math.PI;
              const endAngle = 0;
              const angle =
                startAngle - (i / (arr.length - 1)) * (startAngle - endAngle);
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
          </div>
          <Image
            src="/Self.png"
            alt="Profile Picture"
            className="w-full h-full rounded-full object-cover hover:scale-105 transition-all duration-300"
            width={192}
            height={192}
          />
        </div>
      </div>
    </div>
  </div>
);

export default AboutProfileImage;
