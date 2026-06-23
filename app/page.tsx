import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import FooterReveal from "./components/FooterReveal";

const MARQUEE_ITEMS = [
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "TAILWIND",
  "GSAP",
  "NODE.JS",
  "MONGODB",
  "THREE.JS",
];

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Navbar />
      <SmoothScroll>
        <main className="relative z-10 w-full overflow-hidden bg-[#0a0a0b]">
          <Hero />
          <Marquee items={MARQUEE_ITEMS} />
          <About />
          <Projects />
          <Marquee items={MARQUEE_ITEMS} reverse />
          <Contact />
        </main>
        {/* Footer sits ABOVE the navbar (z-200) so it swallows it on scroll-in */}
        <div className="relative z-[210]">
          <FooterReveal />
        </div>
      </SmoothScroll>
    </>
  );
}
