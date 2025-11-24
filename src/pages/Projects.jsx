// src/pages/Projects.jsx
import { useState, useEffect } from "react";
import Section from "../core/Section";
import ProjectCard from "../core/ProjectCard";
import Modal from "../core/Modal";
import { projects } from "../data/projectdata";

export default function Projects() {
  useEffect(() => {
    document.title = "Projects — Ayush Jadhav | AI Engineer Portfolio";

    // Ensure meta description exists and update it
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }

    metaDesc.setAttribute(
      "content",
      "Explore applied AI and systems engineering projects by Ayush Jadhav — focusing on LLM agents, optimization, ML modeling, and high-quality product engineering."
    );
  }, []);

  const [active, setActive] = useState(null);

  return (
    <>
      <Section>
        <h1 className="text-4xl md:text-5xl font-semibold">Projects</h1>
        <p className="mt-4 text-neutral-600 max-w-2xl">
          A focused set of applied AI and systems projects. Each one demonstrates end-to-end
          thinking: problem framing, data/ML or LLM approach, product UX, and measurable outcomes.
        </p>

        {/* NEW gradient background wrapper for glass cards */}
        <div className="mt-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} item={p} onOpen={setActive} />
            ))}
          </div>
        </div>
      </Section>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div className="p-6">
            <h3 className="text-2xl font-semibold">{active.title}</h3>
            <p className="mt-1 text-sm text-neutral-600">{active.tagline}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {active.stack.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 border border-black/10">
                  {t}
                </span>
              ))}
            </div>

            <ul className="mt-6 space-y-2 text-neutral-700">
              {active.highlights.map((h, i) => (
                <li key={i} className="leading-relaxed">• {h}</li>
              ))}
            </ul>

            {(active.links?.github || active.links?.live) && (
              <div className="mt-6 flex gap-3">
                {active.links.github && (
                  <a
                    href={active.links.github}
                    target="_blank"
                    className="px-4 py-2 rounded-xl border border-black/10 text-sm hover:bg-black/5"
                  >
                    GitHub
                  </a>
                )}
                {active.links.live && (
                  <a
                    href={active.links.live}
                    target="_blank"
                    className="px-4 py-2 rounded-xl bg-black text-white text-sm hover:opacity-90"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 text-sm rounded-xl border border-black/10 hover:bg-black/5"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}