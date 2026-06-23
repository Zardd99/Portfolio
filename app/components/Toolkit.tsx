"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import type { Tool } from "../constants/about";

gsap.registerPlugin(Flip);

/**
 * Draggable toolkit — grab a chip and drag it through the row; the others slide
 * out of the way (GSAP Flip) and the grabbed chip springs back into its slot on
 * release. All transient drag state lives in refs so the pointer handlers stay
 * stable; React state is only used for the visual "is dragging" styling.
 */
const Toolkit = ({ tools: initial }: { tools: Tool[] }) => {
  const [tools, setTools] = useState(initial);
  const [dragId, setDragId] = useState<string | null>(null);

  const toolsRef = useRef(initial);
  const chipRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragIdRef = useRef<string | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // glue a chip's center to a screen point regardless of which slot it's in
  const glue = useCallback((id: string, px: number, py: number) => {
    const el = chipRefs.current[id];
    if (!el) return;
    const curX = Number(gsap.getProperty(el, "x")) || 0;
    const curY = Number(gsap.getProperty(el, "y")) || 0;
    const r = el.getBoundingClientRect();
    gsap.set(el, {
      x: px - (r.left + r.width / 2 - curX),
      y: py - (r.top + r.height / 2 - curY),
    });
  }, []);

  const siblingEls = useCallback(
    (exceptId: string) =>
      toolsRef.current
        .filter((t) => t.id !== exceptId)
        .map((t) => chipRefs.current[t.id])
        .filter((el): el is HTMLDivElement => !!el),
    []
  );

  const swap = useCallback((id: string, overId: string) => {
    const arr = [...toolsRef.current];
    const i = arr.findIndex((t) => t.id === id);
    const j = arr.findIndex((t) => t.id === overId);
    if (i < 0 || j < 0 || i === j) return;
    const flipEls = arr
      .filter((t) => t.id !== id)
      .map((t) => chipRefs.current[t.id])
      .filter((el): el is HTMLDivElement => !!el);
    flipStateRef.current = Flip.getState(flipEls);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    toolsRef.current = arr;
    setTools(arr);
  }, []);

  const onMove = useCallback(
    (e: PointerEvent) => {
      const id = dragIdRef.current;
      if (!id) return;
      pointerRef.current = { x: e.clientX, y: e.clientY };
      const over = siblingEls(id).find((el) => {
        const r = el.getBoundingClientRect();
        return (
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom
        );
      });
      if (over?.dataset.id) swap(id, over.dataset.id);
      glue(id, e.clientX, e.clientY);
    },
    [siblingEls, swap, glue]
  );

  const onUp = useCallback(() => {
    const id = dragIdRef.current;
    abortRef.current?.abort();
    abortRef.current = null;
    dragIdRef.current = null;
    pointerRef.current = null;
    setDragId(null);
    if (id) {
      const el = chipRefs.current[id];
      if (el)
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.45)",
          clearProps: "zIndex",
          overwrite: true,
        });
    }
  }, []);

  const onDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, id: string) => {
      e.preventDefault();
      dragIdRef.current = id;
      pointerRef.current = { x: e.clientX, y: e.clientY };
      setDragId(id);
      const el = chipRefs.current[id];
      if (el)
        gsap.to(el, {
          scale: 1.12,
          rotate: gsap.utils.random(-5, 5),
          zIndex: 60,
          duration: 0.2,
          ease: "power2.out",
          overwrite: true,
        });
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      window.addEventListener("pointermove", onMove, { signal: ctrl.signal });
      window.addEventListener("pointerup", onUp, { signal: ctrl.signal });
    },
    [onMove, onUp]
  );

  // animate the reflow after a swap, then re-glue the dragged chip to the cursor
  useLayoutEffect(() => {
    if (flipStateRef.current) {
      Flip.from(flipStateRef.current, { duration: 0.45, ease: "power3.out" });
      flipStateRef.current = null;
    }
    const id = dragIdRef.current;
    const p = pointerRef.current;
    if (id && p) glue(id, p.x, p.y);
  }, [tools, glue]);

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <div className="flex flex-wrap gap-3">
      {tools.map((tool) => (
        <div
          key={tool.id}
          data-id={tool.id}
          ref={(el) => {
            chipRefs.current[tool.id] = el;
          }}
          onPointerDown={(e) => onDown(e, tool.id)}
          className={`flex touch-none select-none items-center gap-2.5 border bg-[#101013] px-4 py-2.5 transition-colors ${
            dragId === tool.id
              ? "cursor-grabbing border-accent shadow-[0_12px_34px_-8px_rgba(203,255,71,0.55)]"
              : "cursor-grab border-line hover:border-accent/50"
          }`}
        >
          <Image
            src={tool.imgSrc}
            alt={tool.imgAlt}
            width={18}
            height={18}
            draggable={false}
            className="pointer-events-none object-contain"
          />
          <span className="pointer-events-none font-hud text-[10px] text-muted">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Toolkit;
