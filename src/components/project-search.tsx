"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export function ProjectSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return projects
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects..."
        aria-label="Search projects"
        className="w-full rounded-full border border-[var(--pixel-cream-55)] bg-black/20 px-4 py-2 text-center text-xs uppercase tracking-wide text-[var(--pixel-cream)] placeholder:text-[var(--pixel-cream-55)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pixel-cream)]"
        style={{ fontFamily: "var(--font-mono)" }}
      />
      {query.trim() && (
        <div className="absolute top-full left-1/2 z-30 mt-2 max-h-48 w-64 -translate-x-1/2 overflow-y-auto rounded-lg border border-[var(--pixel-cream-55)] bg-[var(--pixel-dark)]/95 p-3">
          {results.length > 0 ? (
            <div className="flex flex-col gap-2">
              {results.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <p
              className="text-center text-[10px] text-[var(--pixel-cream-55)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              No matches
            </p>
          )}
        </div>
      )}
    </div>
  );
}
