"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/data/projects";
import { getDomain } from "@/data/domains";

export function ProjectCard({
  project,
  tag,
}: {
  project: Project;
  tag?: string;
}) {
  const domain = getDomain(project.domain);

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-baseline gap-2.5 rounded-sm border-0 bg-transparent p-0 text-left appearance-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pixel-cream)]">
        {tag && (
          <span
            className="min-w-[20px] text-white/45"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(9px,1vw,12px)" }}
          >
            {tag}
          </span>
        )}
        <span className="flex flex-col">
          <span
            className="font-bold uppercase text-[var(--pixel-cream)] transition-colors hover:text-white"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(10px,1.1vw,13px)",
              letterSpacing: "0.03em",
            }}
          >
            {project.name}
            {project.liveDemo && (
              <span className="ml-1.5 align-middle text-[8px] font-bold text-[var(--pixel-cream-55)]">
                LIVE
              </span>
            )}
          </span>
        </span>
      </DialogTrigger>

      <DialogContent
        className="border-2 border-[var(--pixel-cream)] bg-[var(--pixel-dark)] text-[var(--pixel-cream)] sm:max-w-lg"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <DialogHeader>
          <div className="mb-1 h-1 w-10 rounded-full bg-[var(--pixel-red)]" />
          <DialogTitle
            className="text-lg uppercase text-[var(--pixel-cream)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.name}
          </DialogTitle>
          <DialogDescription className="uppercase tracking-wide text-[var(--pixel-cream-55)]">
            {domain.name} &middot; {project.subcategory}
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-[var(--pixel-cream)]">{project.tagline}</p>

        {project.problem && (
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-bold text-[var(--pixel-cream)]">Problem — </span>
              <span className="text-[var(--pixel-cream-70)]">{project.problem}</span>
            </p>
            <p>
              <span className="font-bold text-[var(--pixel-cream)]">Approach — </span>
              <span className="text-[var(--pixel-cream-70)]">{project.approach}</span>
            </p>
            <p>
              <span className="font-bold text-[var(--pixel-cream)]">Outcome — </span>
              <span className="text-[var(--pixel-cream-70)]">{project.outcome}</span>
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--pixel-cream-55)] px-2 py-0.5 text-[10px] uppercase text-[var(--pixel-cream-70)]"
            >
              {t}
            </span>
          ))}
        </div>

        {project.metric && (
          <div className="rounded-lg border border-[var(--pixel-red)] bg-[var(--pixel-red)]/20 px-3 py-2 text-xs font-medium text-[var(--pixel-cream)]">
            {project.metric}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 flex-1 items-center justify-center rounded-lg bg-[var(--pixel-red)] px-3 text-sm font-bold uppercase text-[var(--pixel-cream)] transition-colors hover:bg-[var(--pixel-red-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pixel-cream)]"
            >
              Live Demo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 flex-1 items-center justify-center rounded-lg border border-[var(--pixel-cream)] px-3 text-sm font-bold uppercase text-[var(--pixel-cream)] transition-colors hover:bg-[var(--pixel-cream)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pixel-cream)]"
          >
            GitHub
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
