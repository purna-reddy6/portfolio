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
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 py-6 text-center">
      <div
        className="uppercase text-[var(--pixel-cream-65)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(10px,1.1vw,13px)",
          letterSpacing: "0.25em",
        }}
      >
        Get In Touch
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
        Contact
      </div>

      <p
        className="max-w-md text-[var(--pixel-cream-70)]"
        style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
      >
        Based in {profile.location}. Happy to talk about any of the{" "}
        {profile.stats[0].value}-project catalog, or anything else.
      </p>

      <div className="flex w-full max-w-sm flex-col divide-y divide-[var(--pixel-cream-55)]/30 rounded-lg border border-[var(--pixel-cream-55)]/40">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center justify-between px-4 py-2.5 transition-colors hover:bg-[var(--pixel-cream)]/10 focus-visible:bg-[var(--pixel-cream)]/10 focus-visible:outline-none"
            style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
          >
            <span className="uppercase text-[var(--pixel-cream-55)]">{link.label}</span>
            <span className="font-bold text-[var(--pixel-cream)]">{link.value}</span>
          </a>
        ))}
      </div>

      <a
        href={profile.links.resume}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--pixel-cream)] px-5 text-sm font-bold uppercase tracking-wide text-[var(--pixel-dark)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pixel-cream)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Download Resume
      </a>
    </div>
  );
}
