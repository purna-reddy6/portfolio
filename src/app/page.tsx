import Link from "next/link";
import { profile } from "@/data/profile";
import { domains } from "@/data/domains";
import { featuredProjects, getProjectsByDomain } from "@/data/projects";
import { DomainCard } from "@/components/domain-card";
import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MotionGrid, MotionItem } from "@/components/motion-primitives";

const quickLinks = [
  { href: "/projects", label: `View ${profile.stats[0].value}+ projects` },
  { href: profile.links.github, label: "GitHub", external: true },
  { href: "/about", label: "Experience & achievements" },
  { href: profile.links.resume, label: "Resume", external: true },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="grid grid-cols-1 gap-10 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {profile.education.degree} · {profile.education.school}
          </p>
          <blockquote className="mt-6 max-w-xl text-lg italic text-foreground/90">
            &ldquo;{profile.tagline}&rdquo;
          </blockquote>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {profile.subheading}
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {quickLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Stats bento */}
        <MotionGrid className="grid grid-cols-2 gap-3 self-start">
          {profile.stats.map((stat) => (
            <MotionItem
              key={stat.label}
              className="flex flex-col justify-center rounded-xl border border-border/60 bg-card p-5 transition-transform duration-150 hover:-translate-y-1"
            >
              <span className="font-mono text-3xl font-semibold text-foreground">
                {stat.value}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">{stat.label}</span>
            </MotionItem>
          ))}
        </MotionGrid>
      </section>

      {/* Domains */}
      <section className="pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Explore by domain
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All projects &rarr;
          </Link>
        </div>
        <MotionGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <MotionItem key={domain.id}>
              <DomainCard domain={domain} count={getProjectsByDomain(domain.id).length} />
            </MotionItem>
          ))}
        </MotionGrid>
      </section>

      {/* Featured work */}
      <section className="pb-24">
        <h2 className="mb-6 font-heading text-xl font-semibold text-foreground">
          Featured work
        </h2>
        <MotionGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <MotionItem key={project.slug}>
              <ProjectCard project={project} />
            </MotionItem>
          ))}
        </MotionGrid>
      </section>
    </div>
  );
}
