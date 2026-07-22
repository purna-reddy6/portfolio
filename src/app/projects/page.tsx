import type { Metadata } from "next";
import { domains } from "@/data/domains";
import { getProjectsByDomain, projects } from "@/data/projects";
import { DomainCard } from "@/components/domain-card";
import { ProjectSearch } from "@/components/project-search";
import { MotionGrid, MotionItem } from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Projects
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {projects.length} projects spanning {domains.length} domains.
      </p>

      <div className="mt-8 max-w-md">
        <ProjectSearch />
      </div>

      <MotionGrid className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((domain) => (
          <MotionItem key={domain.id}>
            <DomainCard domain={domain} count={getProjectsByDomain(domain.id).length} />
          </MotionItem>
        ))}
      </MotionGrid>
    </div>
  );
}
