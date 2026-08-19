import { profile } from "@/data/profile";
import { ScrambleLink } from "@/components/scramble-link";
import { ProjectTicker } from "@/components/project-ticker";
import { PixelDino } from "@/components/pixel-dino";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[18px] px-6 py-6 text-center">
      <PixelDino />

      <div
        className="group fixed top-16 right-6 z-20 overflow-hidden rounded-full border-2 border-[var(--pixel-cream-55)] transition-colors duration-200 hover:border-[var(--pixel-cream)] sm:top-20 sm:right-9"
        style={{ width: "clamp(56px,7vw,84px)", height: "clamp(56px,7vw,84px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar-static.png"
          alt="Purna Sainath Reddy V"
          width={84}
          height={84}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-200 group-hover:opacity-0"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar.webp"
          alt=""
          aria-hidden="true"
          width={84}
          height={84}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>
      <div
        data-dino-track="name"
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

      <div className="flex flex-wrap items-center justify-center gap-3">
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
        <ProjectTicker />
      </div>

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
