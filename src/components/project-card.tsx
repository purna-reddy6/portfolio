"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export function ProjectCard({ project }: { project: Project }) {
  const domain = getDomain(project.domain);

  return (
    <Dialog>
      <DialogTrigger className="w-full appearance-none border-0 bg-transparent p-0 text-left">
        <Card
          className="h-full cursor-pointer border-l-2 py-4 transition-colors hover:bg-muted/40"
          style={{ borderLeftColor: domain.color }}
        >
          <CardHeader className="px-4">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="font-mono text-sm">{project.name}</CardTitle>
              {project.liveDemo && (
                <Badge variant="secondary" className="shrink-0">
                  Live
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-4">
            <p className="text-sm text-muted-foreground">{project.tagline}</p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div
            className="mb-1 h-1 w-10 rounded-full"
            style={{ backgroundColor: domain.color }}
          />
          <DialogTitle className="font-mono text-lg">{project.name}</DialogTitle>
          <DialogDescription>
            {domain.name} · {project.subcategory}
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-foreground">{project.tagline}</p>

        {project.problem && (
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium text-foreground">Problem — </span>
              <span className="text-muted-foreground">{project.problem}</span>
            </p>
            <p>
              <span className="font-medium text-foreground">Approach — </span>
              <span className="text-muted-foreground">{project.approach}</span>
            </p>
            <p>
              <span className="font-medium text-foreground">Outcome — </span>
              <span className="text-muted-foreground">{project.outcome}</span>
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>

        {project.metric && (
          <div className="rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground">
            {project.metric}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 flex-1 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Live Demo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 flex-1 items-center justify-center rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            GitHub
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
