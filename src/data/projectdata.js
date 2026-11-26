// src/data/projects.js
export const projects = [
  {
    id: "wischeduler",
    cardSummary: "First place at the ECE Capstone Showcase.",
    category: "LLMs & optimization",
    title: "Wischeduler",
    tagline: "Turns course requirements and preferences into conflict-free schedules.",
    cover: "/Wischeduler.jpg", // add this image
    role: "Lead engineer (AI + systems)",
    stack: ["React/Vite", "LLM", "Optimization", "ICS"],
    highlights: [
      "Reduced conflicts ~20% vs baseline (capstone benchmark)",
      "Validates constraints extracted from natural-language input, then uses a solver to generate conflict-free schedules.",
      "Supports manual overrides and explains conflicts.",
      "Exports schedules to .ics; clean UX for students",
    ],
    links: { github: "", live: "" },
  }, 
  {
    id: "wildfire-ml",
    cardSummary: "Modeling when to shut off power during wildfire risk.",
    category: "Applied ML research",
    title: "Wildfire Shutoff Modeling",
    tagline: "Models power shutoff decisions using wildfire risk and transmission line loading.",
    cover: "/wildfireAI.jpg", // add this image
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
    cardSummary: "Choose courses around your GPA goals.",
    category: "Conversational AI",
    title: "Gradey",
    tagline: "Helps students explore courses and export schedules to their calendars.",
    cover: "/Gradey.png", // add this image
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
    id: "trip-rescue",
    cardSummary: "Find a way there after a cancellation.",
    title: "TripRescue",
    category: "AI & travel planning",
    tagline: "Finds replacement flights that fit your budget and arrival deadline.",
    cover: "/trip-rescue.jpg",
    role: "Creator",
    stack: ["Python", "FastAPI", "OpenAI", "SerpApi", "Vercel"],
    highlights: [
      "Capture trip details through chat or a manual form, then rank flight options by total cost, arrival time, or stops.",
      "Use a bounded route planner to check nearby airports or next-day departures when the deadline allows.",
      "Factor in estimated transfers and checked bags, and surface alternatives when no option meets the original limits.",
      "Compare live flights or run a simulator. Eligible New York–Washington, DC searches can also show scheduled Amtrak services.",
    ],
    links: { live: "https://triprescue.ayushjadhav.com" },
  },
];
export const featuredProjects = ["trip-rescue", "wischeduler", "wildfire-ml"].map((id) => projects.find((project) => project.id === id));
