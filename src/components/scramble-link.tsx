import Link from "next/link";

const labelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "clamp(13px,1.5vw,18px)",
  letterSpacing: "0.06em",
} as const;

const wipeTransition =
  "transition-[clip-path] duration-300 [transition-timing-function:steps(8,jump-end)]";

export function ScrambleLink({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const content = (
    <span className="group relative inline-flex items-center">
      <span
        aria-hidden
        className="mr-1.5 hidden h-[0.85em] w-[0.5em] shrink-0 bg-[var(--pixel-cream)] group-hover:inline-block group-focus-visible:inline-block [animation:pixel-cursor-blink_0.5s_step-start_infinite]"
      />
      <span className="relative inline-block font-bold">
        <span style={labelStyle} className="relative z-0 block text-[var(--pixel-cream)]">
          {label}
        </span>
        <span
          aria-hidden
          style={labelStyle}
          className={`pointer-events-none absolute inset-0 z-10 block whitespace-nowrap bg-[var(--pixel-cream)] font-bold text-[var(--pixel-dark)] [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)] ${wipeTransition}`}
        >
          {label}
        </span>
      </span>
    </span>
  );

  const className =
    "rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pixel-cream)]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
