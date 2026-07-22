"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { MotionGrid, MotionItem } from "@/components/motion-primitives";

export function ProjectSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search any project, tech, or domain..."
        aria-label="Search projects"
        className="w-full rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      />
      {query.trim() && (
        <div className="mt-4">
          <p className="mb-3 text-xs text-muted-foreground">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
          {results.length > 0 ? (
            <MotionGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <MotionItem key={p.slug}>
                  <ProjectCard project={p} />
                </MotionItem>
              ))}
            </MotionGrid>
          ) : (
            <p className="text-sm text-muted-foreground">No projects match &ldquo;{query}&rdquo;.</p>
          )}
        </div>
      )}
    </div>
  );
}
