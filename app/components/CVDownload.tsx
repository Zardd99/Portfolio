"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { Download } from "lucide-react";

interface CVDownloadProps {
  className?: string;
}

const CVDownload: React.FC<CVDownloadProps> = ({ className = "" }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Sakda-Chin-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const magnet = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.3,
      y: (e.clientY - (r.top + r.height / 2)) * 0.3,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const reset = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });

  return (
    <a
      ref={ref}
      href="#home"
      onClick={handleDownload}
      onMouseMove={magnet}
      onMouseLeave={reset}
      className={`group inline-flex items-center gap-3 bg-accent px-7 py-3.5 font-hud text-[11px] text-[#0a0a0b] transition-colors ${className}`}
    >
      <Download size={15} className="transition-transform group-hover:-translate-y-0.5" />
      DOWNLOAD CV
    </a>
  );
};

export default CVDownload;
