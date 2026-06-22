import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

export const metadata = {
  title: "Selected Work — Sakda Chin",
};

export default function ProjectsPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <SmoothScroll>
        <main className="relative w-full overflow-hidden pt-20">
          <Projects />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
