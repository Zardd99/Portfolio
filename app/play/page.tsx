import Link from "next/link";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import SnakeGame from "../components/SnakeGame";

export const metadata = {
  title: "Arcade — Sakda Chin",
  description: "A small experimental minigame tucked inside the portfolio.",
};

export default function PlayPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main className="relative min-h-screen w-full overflow-hidden px-6 pb-20 pt-28 md:px-12">
        <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-30" />

        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3 font-hud text-[11px] text-accent">
              <span className="h-px w-10 bg-accent" />
              ARCADE / 01 — EXPERIMENTAL
            </div>
            <h1 className="font-display text-[18vw] leading-[0.82] md:text-[9vw]">
              SNAKE<span className="text-accent">.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              A little break between sections. Steer the lime serpent with the arrow keys
              or WASD, swallow the glowing squares, and don&apos;t crash into the walls or
              your own tail. It gets faster the longer you last.
            </p>
            <Link
              href="/#home"
              className="mt-9 inline-flex items-center gap-2 font-hud text-[11px] text-muted transition-colors hover:text-accent"
            >
              ← BACK TO PORTFOLIO
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <SnakeGame />
          </div>
        </div>
      </main>
    </>
  );
}
