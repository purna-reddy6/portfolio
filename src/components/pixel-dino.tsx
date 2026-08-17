"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 18;
const ROWS = 11;

const DINO_COLORS: Record<string, string> = {
  B: "var(--pixel-cream)",
  D: "var(--pixel-dark)",
};

// Head, neck, torso and tail — identical across both walk frames.
const BODY_ROWS = [
  ".............BBB..",
  "............BBDBB.",
  "............BBBBDD",
  "...........BBBBDDD",
  ".......BBBBBBB....",
  ".BBBBBBBBBBBBB....",
  "BBBBBBBBBBBBB.....",
  "B..BBBBBBBBBB.....",
  ".....BB..BB.......",
  ".....BB..BB.......",
];

// Only the foot row alternates, to fake a two-frame walk cycle.
const FOOT_A = ".....BB...........";
const FOOT_B = ".........BB.......";

const FLAME_COLS = 5;
const FLAME_COLORS: Record<string, string> = {
  Y: "#ffd23f",
  O: "#ff5a1f",
};
const FLAME_ROWS = ["..Y..", ".YOY.", "YOOOY", ".OYO."];

function rectsFromGrid(rows: string[], colors: Record<string, string>) {
  const rects: { x: number; y: number; fill: string }[] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === ".") continue;
      rects.push({ x, y, fill: colors[ch] });
    }
  });
  return rects;
}

const FRAME_A_RECTS = rectsFromGrid([...BODY_ROWS, FOOT_A], DINO_COLORS);
const FRAME_B_RECTS = rectsFromGrid([...BODY_ROWS, FOOT_B], DINO_COLORS);
const FLAME_RECTS = rectsFromGrid(FLAME_ROWS, FLAME_COLORS);

const SPRITE_W = 63;
const SPRITE_H = (SPRITE_W / COLS) * ROWS;
const SPEED = 34; // px/sec

type Point = { x: number; y: number };

function rectsOverlap(
  x: number,
  y: number,
  w: number,
  h: number,
  rect: DOMRect,
  pad: number,
) {
  return (
    x < rect.right + pad &&
    x + w > rect.left - pad &&
    y < rect.bottom + pad &&
    y + h > rect.top - pad
  );
}

function getAvoidRects(): DOMRect[] {
  return Array.from(document.querySelectorAll("[data-dino-avoid]")).map((el) =>
    el.getBoundingClientRect(),
  );
}

function pickTarget(): Point {
  const rects = getAvoidRects();
  const margin = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (let i = 0; i < 40; i++) {
    const x = margin + Math.random() * Math.max(1, vw - SPRITE_W - margin * 2);
    const y = margin + Math.random() * Math.max(1, vh - SPRITE_H - margin * 2);
    if (!rects.some((r) => rectsOverlap(x, y, SPRITE_W, SPRITE_H, r, 10))) {
      return { x, y };
    }
  }
  return { x: margin, y: vh - SPRITE_H - margin };
}

export function PixelDino() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<Point>({ x: -999, y: -999 });
  const targetRef = useRef<Point>({ x: -999, y: -999 });
  const facingRef = useRef<1 | -1>(1);
  const [frameA, setFrameA] = useState(true);
  const [firing, setFiring] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const start = pickTarget();
    posRef.current = start;
    targetRef.current = start;
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translate3d(${start.x}px, ${start.y}px, 0) scaleX(1)`;
    }
    // Client-only initial position (depends on window/DOM), so it can only
    // be set post-mount without mismatching the static server-rendered HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);

    if (reduceMotion) return;

    let raf = 0;
    let last = performance.now();
    let waiting = false;

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const p = posRef.current;
      const t = targetRef.current;
      const dx = t.x - p.x;
      const dy = t.y - p.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 2) {
        if (!waiting) {
          waiting = true;
          setTimeout(
            () => {
              targetRef.current = pickTarget();
              waiting = false;
            },
            600 + Math.random() * 1800,
          );
        }
      } else {
        const step = Math.min(dist, SPEED * dt);
        const nx = p.x + (dx / dist) * step;
        const ny = p.y + (dy / dist) * step;
        posRef.current = { x: nx, y: ny };
        facingRef.current = dx >= 0 ? 1 : -1;
        if (wrapRef.current) {
          wrapRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0) scaleX(${facingRef.current})`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const walkTimer = setInterval(() => setFrameA((f) => !f), 260);

    const fireTimer = setInterval(() => {
      if (Math.random() < 0.12) {
        setFiring(true);
        setTimeout(() => setFiring(false), 700);
      }
    }, 1000);

    const onResize = () => {
      targetRef.current = pickTarget();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(walkTimer);
      clearInterval(fireTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[15] will-change-transform"
      style={{
        width: SPRITE_W,
        height: SPRITE_H,
        opacity: ready ? 1 : 0,
        transition: "opacity 300ms",
      }}
    >
      <svg
        viewBox={`0 0 ${COLS} ${ROWS}`}
        width={SPRITE_W}
        height={SPRITE_H}
        shapeRendering="crispEdges"
      >
        {(frameA ? FRAME_A_RECTS : FRAME_B_RECTS).map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={1} height={1} style={{ fill: r.fill }} />
        ))}
      </svg>
      {firing && (
        <svg
          viewBox={`0 0 ${FLAME_COLS} ${FLAME_ROWS.length}`}
          width={SPRITE_W * 0.45}
          height={(SPRITE_W * 0.45 * FLAME_ROWS.length) / FLAME_COLS}
          shapeRendering="crispEdges"
          style={{
            position: "absolute",
            top: SPRITE_H * 0.1,
            left: SPRITE_W * 0.94,
          }}
        >
          {FLAME_RECTS.map((r, i) => (
            <rect key={i} x={r.x} y={r.y} width={1} height={1} style={{ fill: r.fill }} />
          ))}
        </svg>
      )}
    </div>
  );
}
