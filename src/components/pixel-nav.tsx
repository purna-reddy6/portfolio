"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const linkClass =
  "text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--pixel-cream-70)] transition-colors hover:text-[var(--pixel-cream)] focus-visible:text-[var(--pixel-cream)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pixel-cream)] rounded-sm";

export function PixelNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed top-6 right-6 z-20 flex items-center gap-6 font-mono sm:top-7 sm:right-9"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {pathname !== "/" && (
        <Link href="/" className={linkClass}>
          Home
        </Link>
      )}
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
      <a
        href={profile.links.resume}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        Resume
      </a>
    </nav>
  );
}
