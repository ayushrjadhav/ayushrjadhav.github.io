import { useEffect } from "react";

export default function CaseStudies() {
  useEffect(() => {
    document.title = "Case Studies — Ayush Jadhav | AI Engineer Portfolio";

    // Ensure meta description exists and update it
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }

    metaDesc.setAttribute(
      "content",
      "In‑depth AI engineering case studies by Ayush Jadhav — covering Wischeduler (LLM + optimization), Wildfire ML (SVM/RF), and Gradey (AI assistant with .ics generation)."
    );
  }, []);
  const Wrapper = ({ children, className = "" }) => (
    <section className={"max-w-6xl mx-auto px-6 " + className}>{children}</section>
  );

  const cards = [
    {
      slug: "wischeduler",
      tag: "LLM + Optimization",
      title: "Wischeduler",
      blurb:
        "LLM-assisted course planning with a constraints engine that generates conflict-free schedules and exports clean .ics files.",
    },
    {
      slug: "wildfire-ml",
      tag: "SVM / Random Forest",
      title: "Wildfire ML – Risk & Line Loading",
      blurb:
        "Models wildfire risk vs. line loading to study shutoff decisions; interpretable boundaries and feature impacts.",
    },
    {
      slug: "gradey",
      tag: "Realtime Assistant",
      title: "Gradey – AI Chatbot",
      blurb:
        "Parses text/images of schedules and generates downloadable .ics. Built with React + Vite, focused on DX and UX.",
    },
  ];

  return (
    <>
      <Wrapper className="pt-16 md:pt-24">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Case Studies</h1>
        <p className="mt-4 text-neutral-600 max-w-2xl">
          A focused set of projects demonstrating applied AI/ML and product thinking. Each story
          follows a consistent problem → approach → result flow for quick recruiter review.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => (
            <a
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="group rounded-2xl bg-white border border-black/10 p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              <div className="text-xs uppercase tracking-wide text-neutral-500">{c.tag}</div>
              <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-neutral-600">{c.blurb}</p>
              <span className="mt-3 inline-block text-blue-600">Read the case →</span>
            </a>
          ))}
        </div>
      </Wrapper>
    </>
  );
}