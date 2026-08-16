export function PixelBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-[var(--pixel-red)]"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/pixel-fire-bg-poster.jpg"
        className="h-full w-full object-cover [image-rendering:pixelated] motion-reduce:hidden"
      >
        <source src="/pixel-fire-bg.mp4" type="video/mp4" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pixel-fire-bg-poster.jpg"
        alt=""
        className="hidden h-full w-full object-cover [image-rendering:pixelated] motion-reduce:block"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.15] [animation:pixel-scan_0.4s_linear_infinite] [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.6)_0px,rgba(0,0,0,0.6)_1px,transparent_1px,transparent_3px)]"
      />
    </div>
  );
}
