import Link from "next/link";
import { profile } from "@/data/profile";
import { domains } from "@/data/domains";
import { ScrambleLink } from "@/components/scramble-link";

const workItems = [
  ...domains.map((d, i) => ({
    tag: String(i + 1).padStart(2, "0"),
    name: d.shortLabel,
    href: `/projects/${d.id}`,
  })),
  { tag: "08", name: "All Projects", href: "/projects" },
];

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[18px] px-6 py-6 text-center">
      <div
        className="font-bold text-[var(--pixel-cream)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(30px,4.6vw,52px)",
          lineHeight: 1.05,
          letterSpacing: "0.04em",
          textShadow: "0 3px 0 rgba(0,0,0,0.25)",
        }}
      >
        {profile.name}
      </div>

      <div
        className="font-bold uppercase text-black"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(14px,1.8vw,20px)",
          letterSpacing: "0.04em",
        }}
      >
        B.Tech CSE (AI&amp;ML) &middot;MBU Tirupati
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <div
          className="uppercase text-[var(--pixel-cream-55)]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(9px,1vw,12px)",
            letterSpacing: "0.3em",
          }}
        >
          Selected Work
        </div>
        <div
          className="grid gap-x-11 gap-y-2"
          style={{ gridTemplateColumns: "repeat(2, minmax(160px, 220px))" }}
        >
          {workItems.map((item) => (
            <Link
              key={item.tag}
              href={item.href}
              className="flex items-baseline gap-2.5 rounded-sm text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pixel-cream)]"
            >
              <span
                className="min-w-[20px] text-white/45"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(9px,1vw,12px)",
                }}
              >
                {item.tag}
              </span>
              <span
                className="font-bold uppercase text-[var(--pixel-cream)] transition-colors hover:text-white"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(10px,1.1vw,13px)",
                  letterSpacing: "0.03em",
                }}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <a
        href={profile.links.email}
        className="flex items-center gap-1.5 uppercase text-[var(--pixel-cream-55)] transition-colors hover:text-[var(--pixel-cream)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(9px,1vw,12px)",
          letterSpacing: "0.2em",
        }}
      >
        <span>Say hi at {profile.email}</span>
        <span className="[animation:pixel-cursor-blink_1s_step-start_infinite]">_</span>
      </a>

      <div className="fixed inset-x-0 bottom-12 z-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-10 sm:bottom-14 sm:px-16">
        <ScrambleLink label="VIEW PROJECTS" href="/projects" />
        <ScrambleLink label="GITHUB" href={profile.links.github} external />
        <ScrambleLink
          label="ACHIEVEMENTS & CERTIFICATIONS"
          href="/about?tab=Achievements"
        />
        <ScrambleLink label="RESUME" href={profile.links.resume} external />
      </div>
    </div>
  );
}
