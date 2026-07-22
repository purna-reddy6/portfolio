export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "ai-research",
    title: "AI Research & Specialised Systems",
    items: [
      "Program Synthesis",
      "ARC-AGI",
      "DreamCoder / Wake-Sleep",
      "RAG (FAISS, LangChain)",
      "VLMs",
      "Diffusion / 4D",
      "Quantum ML (Qiskit, PennyLane)",
      "Whisper",
      "ChromaDB",
      "OpenAI API",
    ],
  },
  {
    id: "ml-ai",
    title: "Machine Learning & AI",
    items: [
      "PyTorch",
      "PyTorch Geometric",
      "GraphSAGE",
      "XGBoost",
      "scikit-learn",
      "YOLOv8",
      "ONNX",
      "NumPy",
      "MLflow",
      "SHAP",
      "Multi-Agent Systems",
    ],
  },
  {
    id: "languages",
    title: "Languages",
    items: ["Python", "SQL", "Java", "C++", "TypeScript / JavaScript"],
  },
  {
    id: "vision-3d-systems",
    title: "Vision, 3D & Systems",
    items: [
      "OpenCV",
      "COLMAP (Photogrammetry)",
      "Edge AI (AMD Ryzen NPU)",
      "Digital Twin",
      "Diffusion View-Synthesis",
      "Deterministic Optimization",
      "Three.js",
      "WebGL",
    ],
  },
  {
    id: "data-science",
    title: "Data Science & Analytics",
    items: [
      "Statistical Modeling",
      "Regression",
      "EDA",
      "Drift Detection (PSI)",
      "Data Visualization (Power BI, Plotly, Recharts)",
      "Excel",
      "Web Scraping",
    ],
  },
  {
    id: "web-infra",
    title: "Web & Infrastructure",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "Django",
      "PostgreSQL",
      "Neo4j",
      "Tailwind",
      "Docker",
      "Databricks",
      "Azure Arc",
      "Privacy Engineering (k-Anonymity, Differential Privacy)",
    ],
  },
];
