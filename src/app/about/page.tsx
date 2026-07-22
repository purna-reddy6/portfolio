import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { experience, achievements, publications } from "@/data/experience";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {profile.intro}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        {profile.education.degree}, {profile.education.school} (
        {profile.education.start}&ndash;{profile.education.end}) &middot;{" "}
        {profile.location}
      </p>

      {/* Skills */}
      <section className="mt-14">
        <h2 className="font-heading text-xl font-semibold text-foreground">Skills</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.id} className="rounded-xl border border-border/60 bg-card p-5">
              <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience timeline */}
      <section className="mt-14">
        <h2 className="font-heading text-xl font-semibold text-foreground">Experience</h2>
        <ol className="mt-6 space-y-8 border-l border-border/60 pl-6">
          {experience.map((entry) => (
            <li key={entry.id} className="relative">
              <span className="absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full bg-primary" />
              <p className="text-xs font-mono text-muted-foreground">
                {entry.start} &ndash; {entry.end}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-foreground">
                {entry.role} &middot; {entry.org}
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Achievements */}
      <section className="mt-14">
        <h2 className="font-heading text-xl font-semibold text-foreground">Achievements</h2>
        <ul className="mt-6 space-y-3">
          {achievements.map((a) => (
            <li
              key={a.id}
              className="rounded-lg border border-border/60 bg-card px-4 py-3 text-sm text-muted-foreground"
            >
              {a.text}
            </li>
          ))}
        </ul>
      </section>

      {/* Publications */}
      <section className="mt-14 mb-8">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Research &amp; Publications
        </h2>
        <div className="mt-6 space-y-4">
          {publications.map((pub) => (
            <div key={pub.id} className="rounded-xl border border-border/60 bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-semibold text-foreground">{pub.title}</h3>
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs font-medium text-primary hover:underline"
                >
                  {pub.linkLabel} &rarr;
                </a>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{pub.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pub.tech.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <blockquote className="border-t border-border/60 pt-8 text-sm italic text-muted-foreground">
        &ldquo;{profile.closingQuote}&rdquo;
      </blockquote>
    </div>
  );
}
