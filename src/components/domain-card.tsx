import Link from "next/link";
import type { Domain } from "@/data/domains";

export function DomainCard({
  domain,
  count,
}: {
  domain: Domain;
  count: number;
}) {
  return (
    <Link
      href={`/projects/${domain.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-[transform,colors] duration-150 hover:-translate-y-1 hover:border-border active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      style={{ borderTopColor: domain.color, borderTopWidth: 3 }}
    >
      <div>
        <h3 className="font-heading text-base font-semibold text-foreground">
          {domain.name}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{domain.description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs">
        <span className="font-mono text-muted-foreground">
          {count} project{count === 1 ? "" : "s"}
        </span>
        <span
          className="font-medium opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: domain.color }}
        >
          View &rarr;
        </span>
      </div>
    </Link>
  );
}
