type HeroContents = {
  subtitle: string;
  title: string;
  title2: string;
  description: string;
  highlight: string;
  skills: string;
  description2: string;
};

const HERO_CONTENT: HeroContents[] = [
  {
    subtitle: "Junior Developer | Responsive Web",
    title: "Welc<b>o</b>me to my <br /> Portfolio",
    title2: "This is <br />Sakda Chin",
    description:
      "Front-End Developer passionate about crafting responsive web experiences.",
    highlight: "Specializing in:",
    skills: "React · TypeScript · Tailwind CSS · JavaScript · NextJS",
    description2: "Built with NextJS + React + Tailwind CSS v4",
  },
];

export { HERO_CONTENT };
export type { HeroContents };
