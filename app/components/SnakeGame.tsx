"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GRID = 22;
const CELL = 20;
const SIZE = GRID * CELL;
const BASE_MS = 140;
const MIN_MS = 68;
const ACCENT = "#cbff47";
const HI_KEY = "pf_snake_hi";

type Pt = { x: number; y: number };
type Status = "idle" | "playing" | "over";

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [hi, setHi] = useState(0);

  const snake = useRef<Pt[]>([]);
  const dir = useRef<Pt>({ x: 1, y: 0 });
  const nextDir = useRef<Pt>({ x: 1, y: 0 });
  const food = useRef<Pt>({ x: 0, y: 0 });
  const scoreRef = useRef(0);
  const statusRef = useRef<Status>("idle");
  const lastTick = useRef(0);

  const spawnFood = useCallback(() => {
    const taken = new Set(snake.current.map((s) => `${s.x},${s.y}`));
    let p: Pt;
    do {
      p = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      };
    } while (taken.has(`${p.x},${p.y}`));
    food.current = p;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Render at the device's pixel density so the board stays sharp when the
    // container scales up on 2K/4K displays. Game logic stays in SIZE units;
    // the context is scaled to fill the rendered (CSS) size crisply.
    const dpr = window.devicePixelRatio || 1;
    const displaySize = canvas.clientWidth || SIZE;
    const target = Math.max(1, Math.round(displaySize * dpr));
    if (canvas.width !== target || canvas.height !== target) {
      canvas.width = target;
      canvas.height = target;
    }
    const scale = target / SIZE;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    ctx.fillStyle = "#0a0a0b";
    ctx.fillRect(0, 0, SIZE, SIZE);

    ctx.strokeStyle = "rgba(245,245,243,0.05)";
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(SIZE, i * CELL);
      ctx.stroke();
    }

    const f = food.current;
    ctx.save();
    ctx.translate(f.x * CELL + CELL / 2, f.y * CELL + CELL / 2);
    ctx.rotate(Math.PI / 4);
    ctx.shadowColor = ACCENT;
    ctx.shadowBlur = 14;
    ctx.fillStyle = ACCENT;
    const fs = CELL * 0.44;
    ctx.fillRect(-fs / 2, -fs / 2, fs, fs);
    ctx.restore();
    ctx.shadowBlur = 0;

    snake.current.forEach((seg, i) => {
      const isHead = i === snake.current.length - 1;
      ctx.fillStyle = isHead ? ACCENT : "rgba(203,255,71,0.78)";
      ctx.shadowColor = ACCENT;
      ctx.shadowBlur = isHead ? 12 : 0;
      const pad = 2;
      roundRect(ctx, seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 4);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
  }, []);

  const reset = useCallback(() => {
    const mid = Math.floor(GRID / 2);
    snake.current = [
      { x: mid - 2, y: mid },
      { x: mid - 1, y: mid },
      { x: mid, y: mid },
    ];
    dir.current = { x: 1, y: 0 };
    nextDir.current = { x: 1, y: 0 };
    scoreRef.current = 0;
    setScore(0);
    spawnFood();
    draw();
  }, [spawnFood, draw]);

  const endGame = useCallback(() => {
    statusRef.current = "over";
    setStatus("over");
    setHi((prev) => {
      const best = Math.max(prev, scoreRef.current);
      localStorage.setItem(HI_KEY, String(best));
      return best;
    });
  }, []);

  const tick = useCallback(() => {
    dir.current = nextDir.current;
    const head = snake.current[snake.current.length - 1];
    const nx = head.x + dir.current.x;
    const ny = head.y + dir.current.y;

    if (nx < 0 || ny < 0 || nx >= GRID || ny >= GRID) return endGame();
    if (snake.current.some((s) => s.x === nx && s.y === ny)) return endGame();

    snake.current.push({ x: nx, y: ny });
    if (nx === food.current.x && ny === food.current.y) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      spawnFood();
    } else {
      snake.current.shift();
    }
    draw();
  }, [draw, spawnFood, endGame]);

  const start = useCallback(() => {
    reset();
    lastTick.current = performance.now();
    statusRef.current = "playing";
    setStatus("playing");
  }, [reset]);

  const steer = useCallback(
    (nd: Pt) => {
      if (nd.x === -dir.current.x && nd.y === -dir.current.y) return;
      nextDir.current = nd;
      if (statusRef.current === "idle") start();
    },
    [start]
  );

  // initial board + stored high score
  useEffect(() => {
    setHi(Number(localStorage.getItem(HI_KEY) || 0));
    reset();
  }, [reset]);

  // keep the canvas crisp across breakpoint / window resizes
  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  // game loop
  useEffect(() => {
    let raf = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (statusRef.current !== "playing") return;
      const speed = Math.max(MIN_MS, BASE_MS - scoreRef.current * 3);
      if (t - lastTick.current >= speed) {
        lastTick.current = t;
        tick();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tick]);

  // keyboard
  useEffect(() => {
    const dirs: Record<string, Pt> = {
      arrowup: { x: 0, y: -1 },
      w: { x: 0, y: -1 },
      arrowdown: { x: 0, y: 1 },
      s: { x: 0, y: 1 },
      arrowleft: { x: -1, y: 0 },
      a: { x: -1, y: 0 },
      arrowright: { x: 1, y: 0 },
      d: { x: 1, y: 0 },
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k in dirs) {
        e.preventDefault();
        steer(dirs[k]);
      } else if (k === "enter" || k === " ") {
        e.preventDefault();
        if (statusRef.current !== "playing") start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [steer, start]);

  const dpadBtn =
    "flex h-12 items-center justify-center border border-line bg-[#101013] font-hud text-lg text-ink active:border-accent active:text-accent";

  return (
    <div className="w-full max-w-[460px] lg:max-w-[600px] 2xl:max-w-[820px]">
      <div className="mb-3 flex items-center justify-between font-hud text-[10px] text-muted lg:text-xs 2xl:text-sm">
        <span>
          SCORE <span className="text-accent">{String(score).padStart(3, "0")}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> LIME SNAKE
        </span>
        <span>
          HI <span className="text-ink">{String(hi).padStart(3, "0")}</span>
        </span>
      </div>

      <div className="scanlines relative aspect-square w-full overflow-hidden border border-line bg-[#0a0a0b]">
        <canvas ref={canvasRef} width={SIZE} height={SIZE} className="block h-full w-full" />

        {/* corner brackets */}
        {[
          "left-2 top-2 border-l border-t",
          "right-2 top-2 border-r border-t",
          "left-2 bottom-2 border-l border-b",
          "right-2 bottom-2 border-r border-b",
        ].map((c) => (
          <span
            key={c}
            className={`pointer-events-none absolute h-4 w-4 border-accent/60 ${c}`}
          />
        ))}

        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0b]/70 px-6 text-center backdrop-blur-sm">
            {status === "over" ? (
              <>
                <div className="font-hud text-[11px] tracking-[0.3em] text-accent lg:text-sm 2xl:text-base">GAME OVER</div>
                <div className="font-display text-7xl leading-none text-ink lg:text-8xl 2xl:text-9xl">{score}</div>
                <div className="font-hud text-[10px] text-muted lg:text-xs 2xl:text-sm">
                  {score >= hi && score > 0 ? "★ NEW BEST" : `BEST ${String(hi).padStart(3, "0")}`}
                </div>
              </>
            ) : (
              <>
                <div className="font-display text-5xl leading-none text-ink lg:text-6xl 2xl:text-8xl">
                  SNAKE<span className="text-accent">.</span>
                </div>
                <div className="font-hud text-[10px] text-muted lg:text-xs 2xl:text-sm">ARROWS / WASD TO MOVE</div>
              </>
            )}
            <button
              onClick={start}
              className="group relative mt-1 overflow-hidden border border-accent px-7 py-2.5 font-hud text-[11px] text-accent transition-colors hover:text-[#0a0a0b] lg:px-9 lg:py-3 lg:text-sm"
            >
              <span className="relative z-10">{status === "over" ? "PLAY AGAIN" : "▶ START"}</span>
              <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
            </button>
          </div>
        )}
      </div>

      {/* mobile d-pad */}
      <div className="mx-auto mt-5 grid w-44 grid-cols-3 gap-2 sm:hidden">
        <span />
        <button className={dpadBtn} onClick={() => steer({ x: 0, y: -1 })} aria-label="Up">
          ↑
        </button>
        <span />
        <button className={dpadBtn} onClick={() => steer({ x: -1, y: 0 })} aria-label="Left">
          ←
        </button>
        <button className={dpadBtn} onClick={() => steer({ x: 0, y: 1 })} aria-label="Down">
          ↓
        </button>
        <button className={dpadBtn} onClick={() => steer({ x: 1, y: 0 })} aria-label="Right">
          →
        </button>
      </div>

      <p className="mt-4 hidden font-hud text-[10px] leading-relaxed text-muted sm:block lg:text-xs 2xl:text-sm">
        GRAB THE LIME SQUARE · DODGE THE WALLS &amp; YOUR OWN TAIL · SPEED RISES WITH SCORE
      </p>
    </div>
  );
};

export default SnakeGame;
