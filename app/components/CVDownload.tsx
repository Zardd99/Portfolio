import React from "react";

interface CVDownloadProps {
  className?: string;
}
const BUTTON_TEXT = "Download CV";

const CVDownload: React.FC<CVDownloadProps> = () => {
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "./resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <a
        className="font-ibm-plex-sans font-semibold bg-blue-500 p-4 rounded-4xl text-white text-xs sm:text-sm md:text-base hover:bg-blue-400 hover:scale-105 transition-transform duration-300 ease-in-out"
        href="#home"
        onClick={handleDownload}
      >
        {BUTTON_TEXT}
      </a>
    </>
  );
};

export default CVDownload;
