export default function Home() {
  // Simple container wrapper to keep consistent width
  const Wrapper = ({ children, className = "" }) => (
    <section className={"max-w-6xl mx-auto px-6 " + className}>{children}</section>
  );

  return (
    <>
      {/* HERO */}
      <Wrapper className="py-20 md:py-28 scroll-mt-24">
        <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight">
          Building AI systems that make tough decisions simple.
        </h1>
        <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
          Wildfire shutoff optimization. AI scheduling. Embedded telemetry.
          Case studies with measurable outcomes, not fluff.
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="#case-studies"
            className="px-6 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90"
          >
            See Case Studies
          </a>
          <a
            href="/resume.pdf"
            className="px-6 py-3 rounded-xl border border-black/15 hover:bg-black/5"
          >
            Download Resume
          </a>
        </div>
      </Wrapper>

      {/* FEATURED AI */}
      <section className="w-full py-16 md:py-20 bg-[#0b0b0c] text-white">
        <Wrapper>
          <h2 className="text-4xl md:text-5xl font-semibold">Applied AI & Intelligent Systems</h2>
          <p className="mt-4 text-neutral-300 text-lg md:max-w-3xl">
            A focused set of real-world AI + ML projects demonstrating LLM reasoning, optimization,
            intelligent scheduling, and data-driven decision support. Built with careful engineering,
            strong problem framing, and enterprise-ready design.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="h-full border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <h3 className="text-xl font-semibold">Wischeduler</h3>
              <p className="text-neutral-400 mt-2">
                LLM-powered scheduling assistant that reduces conflicts and exports clean ICS schedules.
              </p>
              <a href="/projects" className="text-blue-400 mt-3 inline-block hover:underline">
                View Project →
              </a>
            </div>

            <div className="h-full border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <h3 className="text-xl font-semibold">Wildfire ML Research</h3>
              <p className="text-neutral-400 mt-2">
                SVM + Random Forest classifiers trained on wildfire risk and line loading features for shutoff analysis.
              </p>
              <a href="/projects" className="text-blue-400 mt-3 inline-block hover:underline">
                View Project →
              </a>
            </div>

            <div className="h-full border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <h3 className="text-xl font-semibold">Gradey – AI Chatbot</h3>
              <p className="text-neutral-400 mt-2">
                LLM assistant that parses schedules, reads images, and generates downloadable ICS files.
              </p>
              <a href="/projects" className="text-blue-400 mt-3 inline-block hover:underline">
                View Project →
              </a>
            </div>
          </div>
        </Wrapper>
      </section>

      {/* SHOWCASE (sticky media + bullets) */}
      <Wrapper className="py-20 md:py-24 grid md:grid-cols-2 gap-12 items-start" id="case-studies">
        <div className="sticky top-24">
          <div className="rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,.12)] bg-gradient-to-br from-neutral-100 to-neutral-200 aspect-[4/3] w-full flex items-center justify-center">
            <span className="text-neutral-500">Project media placeholder</span>
          </div>
        </div>

        <ul className="space-y-10">
          <li>
            <h3 className="text-3xl font-semibold">Optimized decision engine</h3>
            <p className="mt-2 text-neutral-600">
              Balances constraints, wildfire risk, and grid reliability using ML + optimization.
            </p>
          </li>
          <li>
            <h3 className="text-3xl font-semibold">Human-in-the-loop clarity</h3>
            <p className="mt-2 text-neutral-600">
              Transparent rationales and overrides help operators trust the model.
            </p>
          </li>
          <li>
            <h3 className="text-3xl font-semibold">Real results</h3>
            <p className="mt-2 text-neutral-600">Wischeduler reduced conflicts by ~20% in capstone benchmarks.</p>
          </li>
        </ul>
      </Wrapper>
    </>
  );
}