type Tool = {
  id: string;
  name: string;
  imgSrc: string;
  imgAlt: string;
};

type Stats = {
  number: string;
  label: string;
  href?: string;
};

type Skills = {
  name: string;
  level: number;
};

type Values = {
  icon: string;
  title: string;
  description: string;
};

type AboutContents = {
  title: string;
  subtitle: string;
  story: string[];
  skills: Skills[];
  values: Values[];
  stats: Stats[];
  tools: Tool[];
};

const ABOUT_CONTENTS: AboutContents[] = [
  {
    title: "About Me",
    subtitle:
      "Passionate developer crafting digital experiences with modern technologies 😁",
    story: [
      "Hi, I'm Sakda Chin. I am a front-end developer who enjoys creating beautiful, functional, and user-friendly web applications. My journey into web development began with a curiosity about how websites work. It quickly grew into a strong passion for crafting digital experiences.",
      "I focus on modern JavaScript frameworks, especially React and Next.js. I'm eager to learn new technologies and best practices. I think great code should work well and also be easy to maintain, scale, and access for everyone.",
      "When I'm not coding, I explore new design trends, contribute to open-source projects, or share my knowledge with the developer community/ my friends. I always look for new challenges that help me grow as a developer and as a problem solver.",
    ],
    skills: [
      { name: "React & Next.js", level: 69 },
      { name: "TypeScript", level: 45 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript", level: 60 },
      { name: "Node.js", level: 75 },
      { name: "Git & GitHub", level: 95 },
    ],
    values: [
      {
        icon: "💡",
        title: "Innovation",
        description:
          "Always exploring new technologies and creative solutions to complex problems.",
      },
      {
        icon: "🎯",
        title: "Precision",
        description:
          "Attention to detail in every line of code, ensuring quality and performance.",
      },
      {
        icon: "🤝",
        title: "Collaboration",
        description:
          "Believing that the best projects come from great teamwork and communication.",
      },
      {
        icon: "📚",
        title: "Learning",
        description:
          "Committed to continuous growth and staying current with industry trends.",
      },
    ],
    stats: [
      { number: "10+", label: "Projects Completed", href: "/projects" },
      { number: "2+", label: "Years Experience", href: "#about" },
      { number: "15+", label: "Technologies Mastered", href: "#about" },
    ],
    tools: [
      {
        id: "vscode",
        name: "VS Code",
        imgSrc: "/vscode.png",
        imgAlt: "VS Code Logo",
      },
      {
        id: "figma",
        name: "Figma",
        imgSrc: "/figma.png",
        imgAlt: "Figma Logo",
      },
      {
        id: "git",
        name: "Git",
        imgSrc: "/git.png",
        imgAlt: "Git Logo",
      },
      {
        id: "npm",
        name: "npm/yarn",
        imgSrc: "/npm.png",
        imgAlt: "npm/yarn Logo",
      },
      {
        id: "vite",
        name: "Vite",
        imgSrc: "/vite.png",
        imgAlt: "Vite Logo",
      },
      {
        id: "chrome",
        name: "Chrome DevTools",
        imgSrc: "/chrome.png",
        imgAlt: "Chrome DevTools Logo",
      },
      {
        id: "vercel",
        name: "Vercel",
        imgSrc: "/vercel.png",
        imgAlt: "Vercel Logo",
      },
      {
        id: "mongodb",
        name: "MongoDB",
        imgSrc: "/mongodb.png",
        imgAlt: "MongoDB Logo",
      },
      {
        id: "firebase",
        name: "Firebase",
        imgSrc: "/firebase.png",
        imgAlt: "Firebase Logo",
      },
      {
        id: "supabase",
        name: "Supabase",
        imgSrc: "/supabase.png",
        imgAlt: "Supabase Logo",
      },
      {
        id: "gsap",
        name: "GSAP",
        imgSrc: "/gsap.png",
        imgAlt: "GSAP Logo",
      },
    ],
  },
];

export { ABOUT_CONTENTS };
export type { AboutContents, Tool, Stats, Skills, Values };
