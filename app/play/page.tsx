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
      <main className="relative min-h-screen w-full overflow-hidden px-5 pb-20 pt-24 sm:px-8 md:px-12 lg:pt-28">
        <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-30" />

        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 2xl:max-w-[1760px] min-[2560px]:max-w-[2200px] lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:flex-1">
            <div className="mb-4 flex items-center gap-3 font-hud text-[11px] text-accent 2xl:text-sm">
              <span className="h-px w-10 bg-accent" />
              ARCADE / 01 — EXPERIMENTAL
            </div>
            <h1 className="font-display leading-[0.82] text-[clamp(3.25rem,12vw,11rem)]">
              SNAKE<span className="text-accent">.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted 2xl:text-base">
              A little break between sections. Steer the lime serpent with the arrow keys
              or WASD, swallow the glowing squares, and don&apos;t crash into the walls or
              your own tail. It gets faster the longer you last.
            </p>
            <Link
              href="/#home"
              className="mt-9 inline-flex items-center gap-2 font-hud text-[11px] text-muted transition-colors hover:text-accent 2xl:text-sm"
            >
              ← BACK TO PORTFOLIO
            </Link>
          </div>

          {/* Definite, clamp-based width so the board never collapses and scales
              smoothly from phone (full width) up to 4K (capped). */}
          <div className="mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none lg:w-[clamp(380px,40vw,560px)] lg:shrink-0 2xl:w-[clamp(560px,34vw,880px)]">
            <SnakeGame />
          </div>
        </div>
      </main>
    </>
  );
}
