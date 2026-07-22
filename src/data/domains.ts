export type DomainId =
  | "ai-security"
  | "ai-research"
  | "computer-vision"
  | "quantum"
  | "data-science"
  | "full-stack"
  | "ai-agents";

export interface Domain {
  id: DomainId;
  name: string;
  shortLabel: string;
  description: string;
  color: string;
}

export const domains: Domain[] = [
  {
    id: "ai-security",
    name: "AI Security & Cybersecurity",
    shortLabel: "Security",
    description:
      "Threat detection, fraud analysis, and cryptographic/security primitives.",
    color: "#e11d48",
  },
  {
    id: "ai-research",
    name: "AI Research / AGI",
    shortLabel: "Research",
    description: "Program synthesis, abstraction discovery, and retrieval-augmented reasoning.",
    color: "#7c3aed",
  },
  {
    id: "computer-vision",
    name: "Computer Vision / 3D / Edge AI",
    shortLabel: "Vision & 3D",
    description: "3D reconstruction, digital twins, generative motion, and applied vision.",
    color: "#0ea5e9",
  },
  {
    id: "quantum",
    name: "Quantum Computing",
    shortLabel: "Quantum",
    description: "Quantum machine learning, simulation, and research.",
    color: "#14b8a6",
  },
  {
    id: "data-science",
    name: "Data Science & Analytics",
    shortLabel: "Data Science",
    description: "Applied statistical modeling, EDA, and end-to-end data pipelines.",
    color: "#f59e0b",
  },
  {
    id: "full-stack",
    name: "Full Stack Web",
    shortLabel: "Full Stack",
    description: "AI-powered platforms and full-stack systems and tools.",
    color: "#10b981",
  },
  {
    id: "ai-agents",
    name: "AI Agents & Voice",
    shortLabel: "AI Agents",
    description: "Autonomous agent platforms, orchestration, and voice-driven systems.",
    color: "#db2777",
  },
];

export function getDomain(id: DomainId): Domain {
  const domain = domains.find((d) => d.id === id);
  if (!domain) throw new Error(`Unknown domain: ${id}`);
  return domain;
}
