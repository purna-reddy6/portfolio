"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 18;
const ROWS = 12;

const DINO_COLORS: Record<string, string> = {
  B: "#2fae4a",
  D: "var(--pixel-dark)",
};

// Head, neck, arched back, torso and tail — identical across both walk
// frames; only the lower legs (rows 10-11) diverge to fake a stride.
const SHARED_ROWS = [
  "............BBB...",
  "...........BBDBB..",
  "..........BBBBDDD.",
  ".........BBBBDDDD.",
  "......BBBBBBBB....",
  ".BBBBBBBBBBBBB....",
  "BBBBBBBBBBBBBB....",
  "B.BBBBBBBBBBB.....",
  ".....BB..BB.......",
  ".....BB..BB.......",
];

// Frame A: back leg planted, front leg swung forward mid-stride.
const LEGS_A = [".....BB....BB.....", ".....BB..........."];
// Frame B: front leg planted, back leg trailing behind.
const LEGS_B = ["...BB....BB.......", ".........BB......."];

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

const FRAME_A_RECTS = rectsFromGrid([...SHARED_ROWS, ...LEGS_A], DINO_COLORS);
const FRAME_B_RECTS = rectsFromGrid([...SHARED_ROWS, ...LEGS_B], DINO_COLORS);
const FLAME_RECTS = rectsFromGrid(FLAME_ROWS, FLAME_COLORS);

const SPRITE_W = 84;
const SPRITE_H = (SPRITE_W / COLS) * ROWS;
const SPEED = 36; // px/sec

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

function validate(x: number, y: number, rects: DOMRect[]): boolean {
  return !rects.some((r) => rectsOverlap(x, y, SPRITE_W, SPRITE_H, r, 8));
}

function fallbackTarget(): Point {
  const rects = getAvoidRects();
  const margin = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (let i = 0; i < 40; i++) {
    const x = margin + Math.random() * Math.max(1, vw - SPRITE_W - margin * 2);
    const y = margin + Math.random() * Math.max(1, vh - SPRITE_H - margin * 2);
    if (validate(x, y, rects)) return { x, y };
  }
  return { x: margin, y: vh - SPRITE_H - margin };
}

type Zone = { side: "left" | "right"; start: number; end: number };

// Paces along the same horizontal line as the name, staying either in
// front of it (left) or behind it (right) — never crossing over it. If the
// next target is on the opposite side from where the dino currently is,
// the returned path detours above the name instead of cutting through it.
function buildPath(current: Point): Point[] {
  const nameEl = document.querySelector('[data-dino-track="name"]');
  if (!nameEl) return [fallbackTarget()];

  const nameRect = nameEl.getBoundingClientRect();
  const margin = 16;
  const gap = 28;
  const vw = window.innerWidth;
  const y = Math.max(
    margin,
    Math.min(
      nameRect.top + (nameRect.height - SPRITE_H) / 2,
      window.innerHeight - SPRITE_H - margin,
    ),
  );

  const zones: Zone[] = [];
  const leftEnd = nameRect.left - gap - SPRITE_W;
  const rightStart = nameRect.right + gap;
  const rightEnd = vw - margin - SPRITE_W;
  if (leftEnd > margin) zones.push({ side: "left", start: margin, end: leftEnd });
  if (rightEnd > rightStart) zones.push({ side: "right", start: rightStart, end: rightEnd });
  if (zones.length === 0) return [fallbackTarget()];

  const rects = getAvoidRects();
  let chosen: { x: number; y: number; side: "left" | "right" } | null = null;
  for (let i = 0; i < 20 && !chosen; i++) {
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const x = zone.start + Math.random() * (zone.end - zone.start);
    if (validate(x, y, rects)) chosen = { x, y, side: zone.side };
  }
  if (!chosen) {
    const zone = zones[0];
    chosen = { x: zone.start + (zone.end - zone.start) / 2, y, side: zone.side };
  }

  const currentSide: "left" | "right" =
    current.x + SPRITE_W / 2 < nameRect.left + nameRect.width / 2 ? "left" : "right";

  if (currentSide === chosen.side) return [{ x: chosen.x, y: chosen.y }];

  const safeY = Math.max(margin, nameRect.top - SPRITE_H - gap);
  return [
    { x: current.x, y: safeY },
    { x: chosen.x, y: safeY },
    { x: chosen.x, y: chosen.y },
  ];
}

export function PixelDino() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<Point>({ x: -999, y: -999 });
  const queueRef = useRef<Point[]>([]);
  const facingRef = useRef<1 | -1>(1);
  const [frameA, setFrameA] = useState(true);
  const [firing, setFiring] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const initialPath = buildPath({ x: -9999, y: 0 });
    const start = initialPath[initialPath.length - 1];
    posRef.current = start;
    queueRef.current = [];
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
      const t = queueRef.current[0];

      if (!t) {
        if (!waiting) {
          waiting = true;
          setTimeout(
            () => {
              queueRef.current = buildPath(posRef.current);
              waiting = false;
            },
            600 + Math.random() * 1800,
          );
        }
        raf = requestAnimationFrame(loop);
        return;
      }

      const dx = t.x - p.x;
      const dy = t.y - p.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 2) {
        queueRef.current = queueRef.current.slice(1);
      } else {
        const step = Math.min(dist, SPEED * dt);
        const nx = p.x + (dx / dist) * step;
        const ny = p.y + (dy / dist) * step;
        posRef.current = { x: nx, y: ny };
        if (Math.abs(dx) > 1) facingRef.current = dx >= 0 ? 1 : -1;
        if (wrapRef.current) {
          wrapRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0) scaleX(${facingRef.current})`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const walkTimer = setInterval(() => setFrameA((f) => !f), 220);

    const fireTimer = setInterval(() => {
      if (Math.random() < 0.12) {
        setFiring(true);
        setTimeout(() => setFiring(false), 700);
      }
    }, 1000);

    const onResize = () => {
      queueRef.current = buildPath(posRef.current);
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
          width={SPRITE_W * 0.4}
          height={(SPRITE_W * 0.4 * FLAME_ROWS.length) / FLAME_COLS}
          shapeRendering="crispEdges"
          style={{
            position: "absolute",
            top: SPRITE_H * 0.08,
            left: SPRITE_W * 0.95,
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
