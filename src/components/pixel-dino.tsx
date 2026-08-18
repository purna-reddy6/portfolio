"use client";

import { useEffect, useRef, useState } from "react";

const SPRITE = 70; // native art is 101x101, square
const SPEED = 34; // px/sec
const END_PAUSE_MS = 500;
const FIRE_MS = 700;

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

const FLAME_RECTS = rectsFromGrid(FLAME_ROWS, FLAME_COLORS);

type Bounds = { left: number; right: number; y: number };

function getBounds(): Bounds | null {
  const nameEl = document.querySelector('[data-dino-track="name"]');
  if (!nameEl) return null;
  const r = nameEl.getBoundingClientRect();
  return {
    left: r.left,
    right: r.right - SPRITE,
    y: r.top - SPRITE * 0.75,
  };
}

export function PixelDino() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const boundsRef = useRef<Bounds | null>(null);
  const dirRef = useRef<1 | -1>(1); // 1 = walking toward V (right), -1 = back toward P
  const [firing, setFiring] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Client-only: depends on window/DOM, so it can only be resolved
    // post-mount without mismatching the static server-rendered HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduceMotion(rm);

    const bounds = getBounds();
    boundsRef.current = bounds;
    xRef.current = bounds ? bounds.left : 0;
    if (wrapRef.current && bounds) {
      wrapRef.current.style.transform = `translate3d(${bounds.left}px, ${bounds.y}px, 0) scaleX(1)`;
    }
    setReady(true);

    if (rm) return;

    let raf = 0;
    let last = performance.now();
    let paused = false;

    const applyTransform = () => {
      const b = boundsRef.current;
      if (!wrapRef.current || !b) return;
      const facing = dirRef.current === 1 ? 1 : -1; // art faces right by default
      wrapRef.current.style.transform = `translate3d(${xRef.current}px, ${b.y}px, 0) scaleX(${facing})`;
    };

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      const b = boundsRef.current;
      if (!paused && b) {
        xRef.current += dirRef.current * SPEED * dt;

        if (dirRef.current === 1 && xRef.current >= b.right) {
          xRef.current = b.right;
          applyTransform();
          paused = true;
          setFiring(true);
          setTimeout(() => {
            setFiring(false);
          }, FIRE_MS);
          setTimeout(
            () => {
              dirRef.current = -1;
              paused = false;
            },
            FIRE_MS + END_PAUSE_MS,
          );
        } else if (dirRef.current === -1 && xRef.current <= b.left) {
          xRef.current = b.left;
          applyTransform();
          paused = true;
          setTimeout(() => {
            dirRef.current = 1;
            paused = false;
          }, END_PAUSE_MS);
        } else {
          applyTransform();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => {
      const b = getBounds();
      if (!b) return;
      boundsRef.current = b;
      xRef.current = Math.min(Math.max(xRef.current, b.left), b.right);
      applyTransform();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[15] will-change-transform"
      style={{
        width: SPRITE,
        height: SPRITE,
        opacity: ready ? 1 : 0,
        transition: "opacity 300ms",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={reduceMotion ? "/dino-walk-static.png" : "/dino-walk.webp"}
        alt=""
        width={SPRITE}
        height={SPRITE}
        draggable={false}
        style={{ imageRendering: "pixelated", display: "block" }}
      />
      {firing && (
        <svg
          viewBox={`0 0 ${FLAME_COLS} ${FLAME_ROWS.length}`}
          width={SPRITE * 0.45}
          height={(SPRITE * 0.45 * FLAME_ROWS.length) / FLAME_COLS}
          shapeRendering="crispEdges"
          style={{
            position: "absolute",
            top: SPRITE * 0.02,
            left: SPRITE * 0.86,
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
