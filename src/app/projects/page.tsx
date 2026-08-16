import type { Metadata } from "next";
import Link from "next/link";
import { domains } from "@/data/domains";
import { getProjectsByDomain, projects } from "@/data/projects";
import { ProjectSearch } from "@/components/project-search";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 py-6 text-center">
      <div
        className="uppercase text-[var(--pixel-cream-65)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(10px,1.1vw,13px)",
          letterSpacing: "0.25em",
        }}
      >
        Work &mdash; {projects.length} Projects
      </div>

      <div
        className="font-bold text-[var(--pixel-dark)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(30px,4.6vw,48px)",
          lineHeight: 1.05,
          letterSpacing: "0.04em",
        }}
      >
        Domains
      </div>

      <div className="flex flex-col items-center gap-3">
        <div
          className="grid gap-x-14 gap-y-3"
          style={{ gridTemplateColumns: "repeat(2, minmax(200px, 280px))" }}
        >
          {domains.map((domain, i) => (
            <Link
              key={domain.id}
              href={`/projects/${domain.id}`}
              className="flex items-baseline gap-3 rounded-sm text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pixel-cream)]"
            >
              <span
                className="min-w-[22px] text-white/45"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(9px,1vw,12px)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col">
                <span
                  className="font-bold uppercase text-[var(--pixel-cream)] transition-colors hover:text-white"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(11px,1.2vw,14px)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {domain.name}
                </span>
                <span
                  className="text-[var(--pixel-cream-55)]"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
                >
                  {getProjectsByDomain(domain.id).length} projects
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full max-w-xs">
        <ProjectSearch />
      </div>
    </div>
  );
}
