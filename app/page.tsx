"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="font-ibm-plex-sans min-h-screen">
      <main className="flex flex-col gap-[32px] items-center">
        <header className="flex w-full container">
          <Navbar />
        </header>
        <section className="flex flex-col gap-8 items-center justify-center text-center container mt-50">
          <Hero />
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
