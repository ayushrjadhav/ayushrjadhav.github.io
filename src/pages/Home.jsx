import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        document.title = "Home — Ayush Jadhav | AI Engineer Portfolio";

        // Update meta description
        let metaDesc = document.querySelector("meta[name='description']");
        if (!metaDesc) {
            metaDesc = document.createElement("meta");
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute(
            "content",
            "AI engineer portfolio featuring applied ML systems, optimization, wildfire risk modeling, and intelligent scheduling tools."
        );
    }, []);
    // Simple container wrapper for consistent width
    const Wrapper = ({ children, className = "" }) => (
        <section className={"max-w-6xl mx-auto px-6 " + className}>{children}</section>
    );

    return (
        <>
            {/* HERO — Apple-style */}
            <Wrapper className="py-20 md:py-28 scroll-mt-24">
                <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight">
                    Building AI systems that make tough decisions simple.
                </h1>

                <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
                    Precision data systems designed for clarity, not complexity.
                </p>

                <div className="mt-10 flex gap-4">
                    <Link
                        to="/case-studies"
                        className="px-6 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90"
                    >
                        See Case Studies
                    </Link>
                    <a
                        href="/resume.pdf"
                        className="px-6 py-3 rounded-xl border border-black/15 hover:bg-black/5"
                    >
                        Download Resume
                    </a>
                </div>
            </Wrapper>

            {/* FEATURED AI SECTION */}
            <section className="w-full py-16 md:py-20 bg-[#0b0b0c] text-white">
                <Wrapper>
                    <h2 className="text-4xl md:text-5xl font-semibold">
                        Applied AI & Intelligent Systems
                    </h2>

                    <p className="mt-4 text-neutral-300 text-lg md:max-w-3xl">
                        A focused set of real-world AI + ML projects demonstrating LLM reasoning,
                        optimization, intelligent scheduling, and actionable decision support.
                    </p>

                    {/* 3 Project Cards */}
                    <div className="mt-10 grid md:grid-cols-3 gap-6">
                        {/* Wischeduler */}
                        <div className="border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
                            <h3 className="text-xl font-semibold">Wischeduler</h3>
                            <p className="text-neutral-400 mt-2">
                                LLM-powered scheduling assistant that reduces conflicts and exports clean .ics calendars.
                            </p>
                            <a href="/projects" className="text-blue-400 mt-3 inline-block hover:underline">
                                View Project →
                            </a>
                        </div>

                        {/* Wildfire ML */}
                        <div className="border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
                            <h3 className="text-xl font-semibold">Wildfire ML Research</h3>
                            <p className="text-neutral-400 mt-2">
                                SVM + Random Forest classifiers trained on wildfire risk and line loading for shutoff analysis.
                            </p>
                            <a href="/projects" className="text-blue-400 mt-3 inline-block hover:underline">
                                View Project →
                            </a>
                        </div>

                        {/* Tally AI */}
                        <div className="border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
                            <h3 className="text-xl font-semibold">Tally AI</h3>
                            <p className="text-neutral-400 mt-2">
                                Agentic AI budgeting system that analyzes spending behavior, loans, and recurring expenses to generate adaptive financial recommendations.
                            </p>
                            <a href="/projects" className="text-blue-400 mt-3 inline-block hover:underline">
                                View Project →
                            </a>
                        </div>
                    </div>
                </Wrapper>
            </section>

            {/* CASE STUDY SHOWCASE */}
            <Wrapper
                className="py-20 md:py-24 grid md:grid-cols-2 gap-12 items-start"
                id="case-studies"
            >
                {/* Sticky Image Placeholder */}
                <div className="sticky top-24">
                    <img
                        src="/Homepage.jpg"
                        alt="Homepage showcase"
                        className="rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] w-full aspect-[4/3] object-cover"
                    />
                </div>

                {/* Featured Case Studies */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-semibold tracking-tight">Featured case studies</h2>
                    <p className="mt-3 text-neutral-600 max-w-xl">
                      Short, scannable deep-dives into applied systems: constraints, models, and outcomes.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <Link
                      to="/case/wischeduler"
                      className="group rounded-2xl border border-black/10 hover:border-black/20 bg-white p-5 transition"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-xl font-semibold">Wischeduler — LLM + Optimization</h3>
                        <span className="text-neutral-500 group-hover:text-neutral-900 transition">Read →</span>
                      </div>
                      <p className="mt-2 text-neutral-600">
                        Natural-language constraints → solver-ready schedules → .ics export.
                      </p>
                    </Link>

                    <Link
                      to="/case/wildfire-ml"
                      className="group rounded-2xl border border-black/10 hover:border-black/20 bg-white p-5 transition"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-xl font-semibold">Wildfire ML — Risk & Line Loading</h3>
                        <span className="text-neutral-500 group-hover:text-neutral-900 transition">Read →</span>
                      </div>
                      <p className="mt-2 text-neutral-600">
                        Interpretable SVM/RF boundaries for shutoff analysis and policy discussion.
                      </p>
                    </Link>

                    <Link
                      to="/case/tally-ai"
                      className="group rounded-2xl border border-black/10 hover:border-black/20 bg-white p-5 transition"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-xl font-semibold">Tally AI — Agentic Budgeting System</h3>
                        <span className="text-neutral-500 group-hover:text-neutral-900 transition">Read →</span>
                      </div>
                      <p className="mt-2 text-neutral-600">
                        Cloud-native AI agent that monitors spending patterns and produces adaptive, explainable budget recommendations.
                      </p>
                    </Link>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/case-studies"
                      className="inline-flex items-center gap-2 text-neutral-900 font-medium hover:opacity-70"
                    >
                      See all case studies <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
            </Wrapper>
        </>
    );
}