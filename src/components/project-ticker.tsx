"use client";

import { useEffect, useState } from "react";
import { projects, type Project } from "@/data/projects";

function pickRandom(list: Project[], count: number) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export function ProjectTicker() {
  const [items, setItems] = useState<Project[] | null>(null);

  useEffect(() => {
    // Client-only randomization: must run post-mount so the static
    // server-rendered HTML (empty) matches the initial client render,
    // avoiding a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(pickRandom(projects, 4));
  }, []);

  return (
    <div className="w-[280px] overflow-hidden rounded-full border border-[var(--pixel-cream-55)] py-2.5 sm:w-[360px]">
      <div className="flex w-max animate-[pixel-ticker_16s_linear_infinite] gap-10 whitespace-nowrap px-6 hover:[animation-play-state:paused]">
        {items &&
          [...items, ...items].map((project, i) => (
            <a
              key={`${project.slug}-${i}`}
              href={project.liveDemo ?? project.github}
              target="_blank"
              rel="noreferrer"
              className="font-bold uppercase text-[var(--pixel-cream-70)] transition-colors hover:text-[var(--pixel-cream)]"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.04em",
              }}
            >
              {project.name}
            </a>
          ))}
      </div>
    </div>
  );
}
