export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  start: string;
  end: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "finlatics",
    role: "Finlatics Business Analytics Experience Program",
    org: "Finlatics",
    start: "Dec 2025",
    end: "Feb 2026",
    bullets: [
      "Built Excel and Power BI dashboards tracking KPIs, sales patterns and profitability.",
      "Applied regression to find key pricing factors and model revenue impact.",
    ],
  },
  {
    id: "vidya",
    role: "Website Development Intern",
    org: "Vidya - The Change",
    start: "Apr 2025",
    end: "May 2025",
    bullets: [
      "Built accessible, user-friendly web interfaces for digital access to learning resources.",
      "Optimized platform performance for low-connectivity users, with a non-profit team.",
    ],
  },
];

export interface AchievementEntry {
  id: string;
  text: string;
}

export const achievements: AchievementEntry[] = [
  {
    id: "systems-shipped",
    text: "Built and deployed 15 full-stack & ML systems end-to-end — from data pipelines and model training to live, production-grade web apps.",
  },
  {
    id: "domain-depth",
    text: "Self-directed depth across 7 technical domains — AI security, ML/AGI research, computer vision, data science, full-stack, AI agents, and quantum.",
  },
  {
    id: "papers",
    text: "Two first-authored AI research papers ready for publication (ARC-AGI program synthesis; variational quantum machine learning).",
  },
  {
    id: "live-demos",
    text: "13 live demos shipped across a 35+ project portfolio spanning 7 technical domains.",
  },
];

export interface PublicationEntry {
  id: string;
  title: string;
  tech: string[];
  description: string;
  linkLabel: string;
  href: string;
  projectSlug?: string;
}

export const publications: PublicationEntry[] = [
  {
    id: "agi-program-synthesis",
    title: "AGI Program Synthesis",
    tech: ["DreamCoder", "Wake-Sleep", "ARC-AGI", "MDL Compression"],
    description:
      'First-authored "PrimaLearn Bootstrapping" paper; invents its own abstractions, 11.8% vs 10.5% baseline.',
    linkLabel: "Read paper",
    href: "https://github.com/purna-reddy6/PrimaLearn/blob/main/paper/paper.pdf",
    projectSlug: "primalearn",
  },
  {
    id: "temporalforge",
    title: "TemporalForge: 4D Completion",
    tech: ["Diffusion", "Zero123++/SV3D", "Optical Flow"],
    description:
      "Turns monocular video into a complete, explorable 360° 4D scene with consistent generated views.",
    linkLabel: "GitHub",
    href: "https://github.com/purna-reddy6/TemporalForge",
    projectSlug: "temporalforge",
  },
  {
    id: "motionprobe",
    title: "MotionProbe",
    tech: ["VLMs (CLIP)", "DRL", "PyTorch", "Distributed (DDP)"],
    description:
      "A VLM critic scores generative-motion naturalness, fed back as a DRL perceptual reward.",
    linkLabel: "GitHub",
    href: "https://github.com/purna-reddy6/MotionProbe",
    projectSlug: "motionprobe",
  },
  {
    id: "quantum-ml",
    title: "Quantum Machine Learning",
    tech: ["Qiskit", "PennyLane", "VQC", "Quantum Kernels"],
    description:
      "IEEE-format paper where VQC and quantum-kernel models beat classical baselines.",
    linkLabel: "GitHub",
    href: "https://github.com/purna-reddy6/QubitSim",
    projectSlug: "qubitsim",
  },
  {
    id: "cortexrag",
    title: "CortexRAG",
    tech: ["RAG", "Phi-3", "llama.cpp", "FAISS", "LangChain"],
    description:
      "Offline, citation-backed neuroscience RAG running fully on-device with zero API cost.",
    linkLabel: "GitHub",
    href: "https://github.com/purna-reddy6/CortexRAG",
    projectSlug: "cortexrag",
  },
];
