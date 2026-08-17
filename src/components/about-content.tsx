"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { experience, achievements, publications } from "@/data/experience";

const tabs = ["Skills", "Experience", "Achievements", "Research"] as const;
type Tab = (typeof tabs)[number];

const labelStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "9px",
  letterSpacing: "0.2em",
} as const;

function isTab(value: string | null): value is Tab {
  return tabs.includes(value as Tab);
}

export function AboutContent() {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const [active, setActive] = useState<Tab>(
    isTab(requestedTab) ? requestedTab : "Skills",
  );

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 overflow-hidden px-6 py-6 pt-20 text-center sm:pt-16">
      <div
        className="uppercase text-[var(--pixel-cream-65)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(10px,1.1vw,13px)",
          letterSpacing: "0.25em",
        }}
      >
        About
      </div>
      <div
        className="max-w-2xl font-bold text-[var(--pixel-dark)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px,3.2vw,36px)",
          lineHeight: 1.1,
        }}
      >
        {profile.name}
      </div>
      <p
        className="max-w-xl text-[var(--pixel-cream-70)]"
        style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
      >
        {profile.education.degree} &middot; {profile.education.school} &middot;{" "}
        {profile.location}
      </p>

      <div
        className="flex gap-2 rounded-full border border-[var(--pixel-cream-55)] p-1"
        role="tablist"
        aria-label="About sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pixel-cream)] ${
              active === tab
                ? "bg-[var(--pixel-cream)] text-[var(--pixel-dark)]"
                : "text-[var(--pixel-cream-70)] hover:text-[var(--pixel-cream)]"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl flex-1 overflow-y-auto">
        {active === "Skills" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-lg border border-[var(--pixel-cream-55)]/40 p-3 text-left"
              >
                <div className="uppercase text-[var(--pixel-cream-65)]" style={labelStyle}>
                  {group.title}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--pixel-cream-55)]/50 px-1.5 py-0.5 text-[9px] uppercase text-[var(--pixel-cream-70)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "Experience" && (
          <div className="flex flex-col gap-3 text-left">
            {experience.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-[var(--pixel-cream-55)]/40 p-3"
              >
                <div
                  className="text-[var(--pixel-cream-55)]"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
                >
                  {entry.start} &ndash; {entry.end}
                </div>
                <div
                  className="mt-0.5 font-bold uppercase text-[var(--pixel-cream)]"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
                >
                  {entry.role} &middot; {entry.org}
                </div>
                <ul
                  className="mt-1.5 list-disc space-y-0.5 pl-4 text-[var(--pixel-cream-70)]"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
                >
                  {entry.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {active === "Achievements" && (
          <div className="flex flex-col gap-2 text-left">
            {achievements.map((a) => (
              <div
                key={a.id}
                className="rounded-lg border border-[var(--pixel-cream-55)]/40 px-3 py-2 text-[var(--pixel-cream-70)]"
                style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
              >
                {a.text}
              </div>
            ))}
          </div>
        )}

        {active === "Research" && (
          <div className="flex flex-col gap-2 text-left">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="rounded-lg border border-[var(--pixel-cream-55)]/40 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="font-bold uppercase text-[var(--pixel-cream)]"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
                  >
                    {pub.title}
                  </div>
                  <a
                    href={pub.href}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 uppercase text-[var(--pixel-red-dim)] hover:underline"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
                  >
                    {pub.linkLabel} &rarr;
                  </a>
                </div>
                <p
                  className="mt-1 text-[var(--pixel-cream-70)]"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
                >
                  {pub.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
