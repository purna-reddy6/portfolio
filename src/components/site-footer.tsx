import Link from "next/link";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-5 text-sm">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.email}
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Email
          </a>
          <Link
            href="/projects"
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Projects
          </Link>
        </div>
      </div>
    </footer>
  );
}
