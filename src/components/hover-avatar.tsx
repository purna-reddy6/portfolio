"use client";

import { useEffect, useState } from "react";

export function HoverAvatar() {
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Warm the cache so the first hover doesn't stall on a fetch.
    const img = new Image();
    img.src = "/avatar.webp";
  }, []);

  return (
    <div
      className="fixed top-[72px] right-6 z-20 overflow-hidden border-2 border-[var(--pixel-cream-55)] transition-colors duration-200 hover:border-[var(--pixel-cream)] sm:top-24 sm:right-9"
      style={{ width: "clamp(114px,14.3vw,174px)", height: "clamp(114px,14.3vw,174px)" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        // key forces a fresh <img> on every hover-in, so the (loop=1) clip
        // always restarts from frame 0 and holds on its last frame instead
        // of continuing/looping while the mouse stays over the picture.
        key={hovering ? "animated" : "static"}
        src={hovering ? "/avatar.webp" : "/avatar-static.png"}
        alt="Purna Sainath Reddy V"
        width={174}
        height={174}
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
