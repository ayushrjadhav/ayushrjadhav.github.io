// src/data/projects.js
export const projects = [
  {
    id: "wischeduler",
    title: "Wischeduler — AI Scheduling Assistant",
    tagline: "LLM reasoning + optimization; 1st-place capstone",
    cover: "/images/wischeduler-cover.png", // add this image
    role: "Lead engineer (AI + systems)",
    stack: ["React/Vite", "LLM", "Optimization", "ICS"],
    highlights: [
      "Reduced conflicts ~20% vs baseline (capstone benchmark)",
      "Human-in-the-loop overrides + clear conflict reasons",
      "Exports schedules to .ics; clean UX for students",
    ],
    links: { github: "", live: "" },
  }, 
  {
    id: "wildfire-ops",
    title: "Wildfire Shutoff Optimization (ML Research)",
    tagline: "SVM/Random Forest on risk + line loading",
    cover: "/images/wildfire-cover.png", // add this image
    role: "Research developer",
    stack: ["Python", "SVM", "Random Forest", "Pandas/NumPy"],
    highlights: [
      "Trained classifiers on wildfire risk & line loading features",
      "Compared threshold vs. optimization-based shutoff methods",
      "Visualized decision boundaries; poster + analysis",
    ],
    links: { github: "", live: "" },
  },
  {
    id: "gradey",
    title: "Gradey — AI Chatbot (Scheduling + Q&A)",
    tagline: "Generative AI assistant with .ics export",
    cover: "/images/gradey-cover.png", // add this image
    role: "Creator",
    stack: ["React", "LLM", "OCR (optional)", "RAG (planned)"],
    highlights: [
      "Parses schedules from text/images → builds visual calendar",
      "Generates downloadable .ics files",
      "Docked chat UI with typing indicator + uploads",
    ],
    links: { github: "", live: "" },
  },
  {
    id: "cloud-ai",
    title: "Cloud AI Experiments (Azure OpenAI + AWS Lambda)",
    tagline: "LLM utilities & serverless APIs",
    cover: "/images/cloudai-cover.png", // add this image
    role: "Builder",
    stack: ["Azure OpenAI", "AWS Lambda", "APIs"],
    highlights: [
      "Deployed LLM endpoints and small tools for text tasks",
      "Focused on reliability, guardrails, prompt hygiene",
      "Explored evals + latency tradeoffs",
    ],
    links: { github: "", live: "" },
  },
  {
    id: "frontend-systems",
    title: "Frontend Systems & UI Engineering",
    tagline: "Modern React/Vite/Bootstrap component systems",
    cover: "/images/frontend-cover.png", // add this image
    role: "Frontend engineer",
    stack: ["React", "Vite", "Tailwind/Bootstrap"],
    highlights: [
      "Clean, responsive components with accessibility in mind",
      "Reusable patterns for forms, lists, and modals",
      "Focus on performance + DX",
    ],
    links: { github: "", live: "" },
  },
];