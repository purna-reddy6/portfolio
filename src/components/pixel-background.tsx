export function PixelBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-[var(--pixel-red)]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.15] [animation:pixel-scan_0.4s_linear_infinite] [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.6)_0px,rgba(0,0,0,0.6)_1px,transparent_1px,transparent_3px)]"
      />
    </div>
  );
}
