type ProjectsT = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  github: string;
  live: string;
  date: string;
  featured?: boolean;
};

type CategoriesT = {
  key: string;
  label: string;
};

const projects = [
  {
    id: 3,
    title: "Restaurant Management System",
    description:
      "My flagship build — a full-stack restaurant operations platform with role-based dashboards (admin, manager, chef, waiter, cashier, customer), real-time order tracking over WebSockets, inventory with automatic ingredient deduction, and billing & receipts on a clean-architecture Express API.",
    image: "/restaurant-mangement-system-seven.vercel.app_dashboard.png",
    technologies: [
      "ReactJS",
      "TypeScript",
      "NextJS",
      "TailwindCSS",
      "NodeJS",
      "Express",
      "MongoDB",
      "Socket.io",
    ],
    category: "fullstack",
    github: "https://github.com/Zardd99/restaurant_mangement_system",
    live: "https://restaurant-mangement-system-seven.vercel.app/login",
    date: "2025",
    featured: true,
  },
  {
    id: 1,
    title: "FOODLE",
    description:
      "A full-stack, responsive food e-commerce application built with the MERN stack equivalent using Supabase. It a plateform which allow user to browse through our menus, managing carts, and simulate a checkuot process. This project use ReactJS for front-end and style using tailwindCSS which make the website resposive and scalable when needed. It also include user authentication, database management (PostgreSQL), and real-time data handling.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
    technologies: [
      "ReactJS",
      "TailwindCSS",
      "Supabase (Auth, PostgreSQL, Realtime)",
      "React Router",
    ],
    category: "fullstack",
    github: "https://github.com/Zardd99/Project_Retaurants_Website",
    live: "https://frond-end-back-end-final-project.vercel.app",
    date: "2025",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "Engineered and deployed a modern, responsive portfolio website to highlight my technical abilities and project experience. Built a scalable and maintainable user interface using ReactJS and its component-based architecture. Utilized TailwindCSS for utility-first styling, creating a clean, mobile-first design with a consistent look and feel.",
    image: "/portfolio_Projects.png",
    technologies: ["ReactJS", "TypeScript", "NextJS", "TailwindCSS"],
    category: "frontend",
    github: "https://github.com/Zardd99/Portfolio",
    live: "https://portfolio-one-orpin-30.vercel.app/",
    date: "2025",
  },
];

const categories = [
  { key: "all", label: "All Projects" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "fullstack", label: "Full Stack" },
];

export { projects, categories };
export type { ProjectsT, CategoriesT };
