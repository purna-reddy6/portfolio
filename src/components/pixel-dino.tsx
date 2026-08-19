"use client";

import { useEffect, useRef, useState } from "react";

const SPRITE = 70; // native art is 101x101, square
const SPEED = 34; // px/sec
const TICK_MS = 50;
const FRAME_MS = 120; // matches the source animation's own per-frame duration
const END_PAUSE_MS = 500; // pause at the P end before walking forward again
const HOLD_MS = 700; // hold the final fire pose before turning around

// The full 16-frame source sequence, in its original order:
//   0-7   walking cycle (loops while moving)
//   8-11  settling to a stand (plays once on arrival at the V end)
//   12-15 mouth opening / fire (plays once, continuing straight on from 11)
const FRAME_COUNT = 16;
const WALK_FRAMES = 8;
const framePath = (i: number) => `/dino-frames/f${i}.png`;

type Bounds = { left: number; right: number; y: number };
type Mode = "walk" | "arrive";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const xRef = useRef(0);
  const boundsRef = useRef<Bounds | null>(null);
  const dirRef = useRef<1 | -1>(1); // 1 = walking toward V (right), -1 = back toward P
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Client-only: depends on window/DOM, so it can only be resolved
    // post-mount without mismatching the static server-rendered HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduceMotion(rm);

    // Preload every frame so mode switches never stall on a network fetch.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
    }

    const bounds = getBounds();
    boundsRef.current = bounds;
    xRef.current = bounds ? bounds.left : 0;
    if (wrapRef.current && bounds) {
      wrapRef.current.style.transform = `translate3d(${bounds.left}px, ${bounds.y}px, 0) scaleX(1)`;
    }
    setReady(true);

    if (rm) return;

    let mode: Mode = "walk";
    let walkFrame = 0;
    let arriveFrame = 0;
    let frameTimer = 0;
    let moving = true;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const setImgFrame = (i: number) => {
      if (imgRef.current) imgRef.current.src = framePath(i);
    };
    setImgFrame(0);

    const applyTransform = () => {
      const b = boundsRef.current;
      if (!wrapRef.current || !b) return;
      const facing = dirRef.current === 1 ? 1 : -1; // art faces right by default
      wrapRef.current.style.transform = `translate3d(${xRef.current}px, ${b.y}px, 0) scaleX(${facing})`;
    };

    const startPause = (ms: number, after: () => void) => {
      moving = false;
      pauseTimer = setTimeout(() => {
        moving = true;
        after();
      }, ms);
    };

    let lastTick = performance.now();

    const interval = setInterval(() => {
      const b = boundsRef.current;
      if (!b) return;

      // Measure real elapsed time rather than assuming TICK_MS — a
      // throttled/backgrounded tab can delay callbacks arbitrarily, and
      // stepping by a fixed assumed duration on every fire (regardless of
      // how much real time actually passed) causes a burst of stacked-up
      // ticks to fast-forward the walk cycle once the tab is foregrounded.
      const now = performance.now();
      const dt = Math.min((now - lastTick) / 1000, 0.25);
      lastTick = now;

      if (moving) {
        xRef.current += dirRef.current * SPEED * dt;

        if (dirRef.current === 1 && xRef.current >= b.right) {
          xRef.current = b.right;
          applyTransform();
          mode = "arrive";
          arriveFrame = 0;
          frameTimer = 0;
          setImgFrame(WALK_FRAMES + arriveFrame);
          moving = false;
          return;
        }

        if (dirRef.current === -1 && xRef.current <= b.left) {
          xRef.current = b.left;
          applyTransform();
          walkFrame = 0;
          setImgFrame(0);
          startPause(END_PAUSE_MS, () => {
            dirRef.current = 1;
          });
          return;
        }

        applyTransform();
      }

      frameTimer += dt * 1000;
      if (frameTimer < FRAME_MS) return;
      frameTimer = 0;

      if (mode === "walk") {
        if (!moving) return;
        walkFrame = (walkFrame + 1) % WALK_FRAMES;
        setImgFrame(walkFrame);
        return;
      }

      // mode === "arrive": step through the settle+fire tail (frames 8-15) once.
      if (arriveFrame < FRAME_COUNT - WALK_FRAMES - 1) {
        arriveFrame += 1;
        setImgFrame(WALK_FRAMES + arriveFrame);
      } else {
        // Reached the final fire frame — hold, then turn around and resume walking.
        startPause(HOLD_MS, () => {
          mode = "walk";
          dirRef.current = -1;
          walkFrame = 0;
          setImgFrame(0);
        });
      }
    }, TICK_MS);

    const onResize = () => {
      const b = getBounds();
      if (!b) return;
      boundsRef.current = b;
      xRef.current = Math.min(Math.max(xRef.current, b.left), b.right);
      applyTransform();
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(interval);
      if (pauseTimer) clearTimeout(pauseTimer);
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
        ref={imgRef}
        src={reduceMotion ? "/dino-walk-static.png" : framePath(0)}
        alt=""
        width={SPRITE}
        height={SPRITE}
        draggable={false}
        style={{ imageRendering: "pixelated", display: "block" }}
      />
    </div>
  );
}
