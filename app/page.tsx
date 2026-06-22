import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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
        <main className="relative w-full overflow-hidden">
          <Hero />
          <Marquee items={MARQUEE_ITEMS} />
          <About />
          <Projects />
          <Marquee items={MARQUEE_ITEMS} reverse />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
