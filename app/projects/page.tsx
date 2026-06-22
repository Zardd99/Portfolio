import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
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
          <Footer />
        </main>
        <FooterReveal />
      </SmoothScroll>
    </>
  );
}
