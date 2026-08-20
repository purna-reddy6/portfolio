"use client";

import { useEffect, useState } from "react";

const SIZE = "clamp(114px,14.3vw,174px)";
const TITLEBAR_H = "clamp(20px,2.4vw,28px)";

const DOTS = [
  {
    background:
      "radial-gradient(circle at 34% 30%, #ff938a, #ff5f57 55%, #d33a32 100%)",
  },
  {
    background:
      "radial-gradient(circle at 34% 30%, #ffe085, #febc2e 55%, #c98a1f 100%)",
  },
  {
    background:
      "radial-gradient(circle at 34% 30%, #8ef09a, #28c840 55%, #1f9c34 100%)",
  },
];

const dotShadow =
  "inset 0 0.5px 0.5px rgba(255,255,255,0.6), inset 0 -0.5px 0.5px rgba(0,0,0,0.25), 0 0 0 0.5px rgba(0,0,0,0.15)";

export function HoverAvatar() {
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Warm the cache so the first hover doesn't stall on a fetch.
    const img = new Image();
    img.src = "/avatar.webp";
  }, []);

  return (
    <div
      className="fixed top-[72px] right-6 z-20 sm:top-24 sm:right-9"
      style={{ width: SIZE }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="overflow-hidden rounded-[12px] border border-black/15 bg-[#f3f3f3] transition-[transform,box-shadow] duration-300 ease-out"
        style={{
          transform: hovering ? "scale(1.08)" : "scale(1)",
          transformOrigin: "top right",
          boxShadow: hovering
            ? "0 22px 42px rgba(0,0,0,0.5)"
            : "0 10px 22px rgba(0,0,0,0.32)",
        }}
      >
        <div
          className="flex items-center justify-between bg-gradient-to-b from-[#f2f2f2] to-[#d9d9d9] px-2.5"
          style={{ height: TITLEBAR_H }}
        >
          <div className="flex items-center gap-[6px]">
            {DOTS.map((dot, i) => (
              <span
                key={i}
                className="block h-[10px] w-[10px] rounded-full"
                style={{ background: dot.background, boxShadow: dotShadow }}
              />
            ))}
          </div>
          <span className="text-[12px] leading-none text-black/35">&times;</span>
        </div>
        <div className="p-[7px]">
          {/* key intentionally omitted: swapping src on the same <img> node
              already restarts an animated image's playback from frame 0 —
              forcing a remount here caused a blank flash before hover. */}
          <div className="aspect-square w-full overflow-hidden rounded-[7px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hovering ? "/avatar.webp" : "/avatar-static.png"}
              alt="Purna Sainath Reddy V"
              width={174}
              height={174}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
