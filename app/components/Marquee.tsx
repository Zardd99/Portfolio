"use client";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

const Marquee = ({ items, reverse = false, className = "" }: MarqueeProps) => {
  const row = [...items, ...items];
  return (
    <div
      className={`relative flex w-full overflow-hidden border-y border-line bg-[#0e0e10] py-5 ${className}`}
    >
      <div
        className={`flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-3xl text-ink/80 md:text-5xl">
              {item}
            </span>
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
