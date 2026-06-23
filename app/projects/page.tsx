import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import FooterReveal from "../components/FooterReveal";

export const metadata = {
  title: "Selected Work — Sakda Chin",
};

export default function ProjectsPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <SmoothScroll>
        <main className="relative z-10 w-full overflow-hidden bg-[#0a0a0b] pt-20">
          <Projects />
        </main>
        {/* Footer sits ABOVE the navbar (z-200) so it swallows it on scroll-in */}
        <div className="relative z-[210]">
          <FooterReveal />
        </div>
      </SmoothScroll>
    </>
  );
}
