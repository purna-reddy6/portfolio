import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { domains, type DomainId } from "@/data/domains";
import { getProjectsByDomain } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export function generateStaticParams() {
  return domains.map((d) => ({ domain: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain: domainId } = await params;
  const domain = domains.find((d) => d.id === domainId);
  return { title: domain ? domain.name : "Domain not found" };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain: domainId } = await params;
  const domain = domains.find((d) => d.id === (domainId as DomainId));
  if (!domain) notFound();

  const domainProjects = getProjectsByDomain(domain.id);
  const subcategories = Array.from(
    new Set(domainProjects.map((p) => p.subcategory))
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; All domains
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: domain.color }}
        />
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {domain.name}
        </h1>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {domain.description} &mdash; {domainProjects.length} project
        {domainProjects.length === 1 ? "" : "s"}.
      </p>

      <div className="mt-10 space-y-12">
        {subcategories.map((subcategory) => {
          const items = domainProjects.filter((p) => p.subcategory === subcategory);
          return (
            <div key={subcategory}>
              <h2 className="mb-4 flex items-baseline gap-2 font-heading text-lg font-semibold text-foreground">
                {subcategory}
                <span className="text-xs font-normal text-muted-foreground">
                  {items.length} project{items.length === 1 ? "" : "s"}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
