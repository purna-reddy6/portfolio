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
  let counter = 0;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-6 py-6 text-center">
      <Link
        href="/projects"
        className="absolute top-6 left-6 uppercase text-[var(--pixel-cream-55)] transition-colors hover:text-[var(--pixel-cream)] sm:top-7 sm:left-9"
        style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
      >
        &larr; All Domains
      </Link>

      <div
        className="uppercase text-[var(--pixel-cream-65)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(10px,1.1vw,13px)",
          letterSpacing: "0.25em",
        }}
      >
        {domain.shortLabel} &mdash; {domainProjects.length} Project
        {domainProjects.length === 1 ? "" : "s"}
      </div>

      <div
        className="max-w-2xl font-bold text-[var(--pixel-dark)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px,3.4vw,40px)",
          lineHeight: 1.1,
          letterSpacing: "0.03em",
        }}
      >
        {domain.name}
      </div>

      <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
        {subcategories.map((subcategory) => {
          const items = domainProjects.filter((p) => p.subcategory === subcategory);
          return (
            <div key={subcategory} className="flex flex-col items-start gap-2">
              <div
                className="uppercase text-[var(--pixel-cream-55)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                }}
              >
                {subcategory}
              </div>
              <div className="flex flex-col gap-1.5">
                {items.map((project) => {
                  counter += 1;
                  return (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      tag={String(counter).padStart(2, "0")}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
