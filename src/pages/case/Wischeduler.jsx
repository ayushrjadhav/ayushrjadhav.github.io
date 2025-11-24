export default function WischedulerCase() {
  const Wrapper = ({ children, className = "" }) => (
    <section className={"max-w-6xl mx-auto px-6 " + className}>{children}</section>
  );

  const Stat = ({ k, v }) => (
    <div className="rounded-2xl bg-white border border-black/10 p-4 shadow-sm">
      <div className="text-sm text-neutral-500">{k}</div>
      <div className="text-2xl font-semibold mt-1">{v}</div>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-b from-neutral-50 to-white">
        <Wrapper className="pt-16 md:pt-24">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-500">Case Study</div>
              <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
                Wischeduler — LLM + Optimization
              </h1>
              <p className="mt-4 text-neutral-600">
                An LLM-assisted scheduling tool that translates natural-language constraints into a
                solvable plan, then exports conflict-free timetables as calendar files (.ics).
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/resume.pdf"
                  className="px-5 py-2.5 rounded-xl bg-black text-white font-medium hover:opacity-90"
                >
                  Resume
                </a>
                <a
                  href="/projects"
                  className="px-5 py-2.5 rounded-xl border border-black/15 hover:bg-black/5"
                >
                  Back to Projects
                </a>
              </div>
            </div>

            {/* Media placeholder (replace with an image or diagram in /public) */}
            <div className="rounded-2xl bg-neutral-100 border border-black/10 aspect-[4/3] w-full flex items-center justify-center">
              <span className="text-neutral-500">Add a product screenshot at /public/wischeduler.png</span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat k="Users" v="200+ students" />
            <Stat k="Conflicts Reduced" v="~20%" />
            <Stat k="Export" v=".ics calendar" />
            <Stat k="Stack" v="React • Python • LLM" />
          </div>
        </Wrapper>
      </div>

      {/* Problem → Approach → Result */}
      <Wrapper className="py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold">Problem</h2>
            <p className="mt-2 text-neutral-600">
              Students juggle prerequisites, time constraints, and preferences. Manual planning is
              slow and error-prone, often leading to missed options or conflicts.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Role</h2>
            <p className="mt-2 text-neutral-600">
              Led AI + optimization design, built the React UI, and implemented the constraints
              engine with clean ICS export.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Outcome</h2>
            <p className="mt-2 text-neutral-600">
              Reduced schedule conflicts ~20% in benchmark scenarios and made planning accessible to
              non-technical users via natural-language inputs.
            </p>
          </div>
        </div>
      </Wrapper>

      {/* Architecture */}
      <Wrapper className="py-6 md:py-10">
        <h2 className="text-2xl font-semibold">Architecture (High Level)</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">LLM Reasoning + Constraint Builder</h3>
            <p className="mt-2 text-neutral-600">
              The LLM maps user statements (e.g., “no classes before 9am; prefer Tue/Thu”) to a
              normalized schema. We validate and compile these into constraints for the solver.
            </p>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>Schema-guided prompts</li>
              <li>Validation & fallbacks for ambiguous inputs</li>
              <li>Safety: guardrails for unsupported requests</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">Optimization & Export</h3>
            <p className="mt-2 text-neutral-600">
              A constraints engine generates conflict-free schedules, then produces an ICS calendar
              file for instant use in Google/Apple/Outlook.
            </p>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>Constraint modeling (+ soft preferences)</li>
              <li>Multi-candidate timetable generation</li>
              <li>ICS export pipeline</li>
            </ul>
          </div>
        </div>
      </Wrapper>

      {/* Results & Learnings */}
      <Wrapper className="py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">Results</h3>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>~20% fewer conflicts vs. manual baseline</li>
              <li>Natural-language inputs broadened adoption</li>
              <li>Clean ICS export drove real-world usage</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">What I Learned</h3>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>Pairing LLMs with deterministic solvers yields reliable outcomes</li>
              <li>Schema + validation is key for safe prompting</li>
              <li>Great UX (export, clarity) matters as much as the model</li>
            </ul>
          </div>
        </div>
      </Wrapper>

      {/* Tech */}
      <Wrapper className="pb-20">
        <h2 className="text-2xl font-semibold">Tech</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "React", "Vite", "Tailwind",
            "LLM Reasoning", "Prompt Schema",
            "Optimization", "ICS Export", "Python",
          ].map((t) => (
            <span
              key={t}
              className="text-sm px-3 py-1.5 rounded-full bg-neutral-100 border border-black/10 text-neutral-700"
            >
              {t}
            </span>
          ))}
        </div>
      </Wrapper>
    </>
  );
}