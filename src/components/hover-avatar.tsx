"use client";

import { useEffect, useState } from "react";

const SIZE = "clamp(114px,14.3vw,174px)";
const TITLEBAR_H = "clamp(20px,2.4vw,28px)";

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
        className="overflow-hidden rounded-[10px] border border-black/15 bg-white transition-[transform,box-shadow] duration-300 ease-out"
        style={{
          transform: hovering ? "scale(1.08)" : "scale(1)",
          transformOrigin: "top right",
          boxShadow: hovering
            ? "0 22px 42px rgba(0,0,0,0.5)"
            : "0 10px 22px rgba(0,0,0,0.32)",
        }}
      >
        <div
          className="flex items-center justify-between bg-gradient-to-b from-[#efefef] to-[#d9d9d9] px-2"
          style={{ height: TITLEBAR_H }}
        >
          <div className="flex items-center gap-[5px]">
            <span className="block h-[9px] w-[9px] rounded-full bg-[#ff5f57]" />
            <span className="block h-[9px] w-[9px] rounded-full bg-[#febc2e]" />
            <span className="block h-[9px] w-[9px] rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[12px] leading-none text-black/35">&times;</span>
        </div>
        <div style={{ height: SIZE }}>
          {/* key intentionally omitted: swapping src on the same <img> node
              already restarts an animated image's playback from frame 0 —
              forcing a remount here caused a blank flash before hover. */}
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
  );
}
