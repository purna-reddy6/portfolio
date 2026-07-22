import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
};

const contactLinks = [
  { label: "Email", value: profile.email, href: profile.links.email },
  { label: "GitHub", value: "github.com/purna-reddy6", href: profile.links.github },
  { label: "LinkedIn", value: "linkedin.com/in/purna-reddy", href: profile.links.linkedin },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Contact
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Based in {profile.location}. Reach out directly — happy to talk about any of the
        work in the {profile.stats[0].value}-project catalog, or anything else.
      </p>

      <div className="mt-10 divide-y divide-border/60 rounded-xl border border-border/60 bg-card">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center justify-between px-5 py-4 text-sm transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:-outline-offset-2"
          >
            <span className="text-muted-foreground">{link.label}</span>
            <span className="font-medium text-foreground">{link.value}</span>
          </a>
        ))}
      </div>

      <a
        href={profile.links.resume}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        Download Resume
      </a>
    </div>
  );
}
