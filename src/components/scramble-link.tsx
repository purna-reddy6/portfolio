"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const SCRAMBLE_CHARS = "01#$%&*<>/\\+=?";
const FRAMES = 9;
const FRAME_MS = 35;

function scramble(label: string, revealCount: number) {
  return label
    .split("")
    .map((ch, i) => {
      if (ch === " " || ch === "&" || i < revealCount) return ch;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

function useScramble(label: string) {
  const [display, setDisplay] = useState(label);
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    if (timer.current) clearTimeout(timer.current);
    setActive(true);
    let frame = 0;
    const tick = () => {
      frame++;
      if (frame >= FRAMES) {
        setDisplay(label);
        return;
      }
      setDisplay(scramble(label, Math.floor((frame / FRAMES) * label.length)));
      timer.current = setTimeout(tick, FRAME_MS);
    };
    tick();
  };

  const stop = () => {
    if (timer.current) clearTimeout(timer.current);
    setActive(false);
    setDisplay(label);
  };

  return { display, active, start, stop };
}

export function ScrambleLink({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const { display, active, start, stop } = useScramble(label);

  const content = (
    <span
      className="relative inline-block font-bold"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(10px,1.05vw,13px)",
        letterSpacing: "0.06em",
        color: "var(--pixel-cream)",
        textShadow: active
          ? "1.5px 0 0 var(--pixel-cream), -1.5px 0 0 var(--pixel-red-dim)"
          : "none",
      }}
    >
      {display}
      <span
        className="absolute -bottom-1 left-0 h-px w-full origin-left bg-[var(--pixel-cream)] transition-transform duration-200"
        style={{ transform: active ? "scaleX(1)" : "scaleX(0)" }}
      />
    </span>
  );

  const handlers = {
    onMouseEnter: start,
    onMouseLeave: stop,
    onFocus: start,
    onBlur: stop,
  };

  const className =
    "rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pixel-cream)]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} {...handlers}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...handlers}>
      {content}
    </Link>
  );
}
