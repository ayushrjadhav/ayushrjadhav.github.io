export default function GradeyCase() {
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
                Gradey — AI Chatbot
              </h1>
              <p className="mt-4 text-neutral-600">
                A personalized academic assistant that recommends courses based on GPA goals, professor history, 
                grade distributions, and student outcomes — with optional schedule parsing and .ics export. 
                Designed to help students choose classes intelligently, not blindly.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/resume.pdf"
                  className="px-5 py-2.5 rounded-xl bg-black text-white font-medium hover:opacity-90"
                >
                  Résumé
                </a>
                <a
                  href="/case-studies"
                  className="px-5 py-2.5 rounded-xl border border-black/15 hover:bg-black/5"
                >
                  All Case Studies
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-black/10 aspect-[4/3] w-full">
              <img
                src="/Gradey.png"
                alt="Gradey UI Screenshot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat k="Students Helped" v="500+ users" />
            <Stat k="Recommendation Engine" v="GPA‑aware" />
            <Stat k="Professor Insights" v="Rating + Grade Data" />
            <Stat k="Extras" v="Schedule → .ics" />
          </div>
        </Wrapper>
      </div>

      {/* Problem → Role → Outcome */}
      <Wrapper className="py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold">Problem</h2>
            <p className="mt-2 text-neutral-600">
              Students often pick classes without knowing grade distributions, past professor outcomes, or 
              how choices affect GPA targets. Guidance is scattered across Reddit, RateMyProfessors, 
              and anecdotal advice — inconsistent and unreliable.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Role</h2>
            <p className="mt-2 text-neutral-600">
              Built the recommendation engine, professor‑quality logic, GPA‑impact model, and UI. 
              Added schedule parsing and .ics export as a secondary workflow for students who wanted a 
              complete planning experience.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Outcome</h2>
            <p className="mt-2 text-neutral-600">
              Students receive tailored class and professor recommendations aligned with GPA goals. 
              Reduced course‑planning uncertainty and offered structured guidance beyond subjective reviews.
            </p>
          </div>
        </div>
      </Wrapper>

      {/* Architecture */}
      <Wrapper className="py-6 md:py-10">
        <h2 className="text-2xl font-semibold">Architecture (High Level)</h2>

        <div className="mt-4 grid md:grid-cols-2 gap-8">
          {/* LLM Extraction */}
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">Recommendation Engine</h3>
            <p className="mt-2 text-neutral-600">
              Gradey evaluates grade distributions, professor history, and course difficulty to generate 
              personalized recommendations. The model blends LLM reasoning with structured datasets.
            </p>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>GPA‑aware ranking model</li>
              <li>Professor quality scoring</li>
              <li>Difficulty + grade‑distribution weighting</li>
            </ul>
          </div>

          {/* ICS Export */}
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">Schedule Parser (Optional)</h3>
            <p className="mt-2 text-neutral-600">
              For students who want a complete planning flow, Gradey extracts times from text or images 
              and generates .ics calendars — but this is an auxiliary feature.
            </p>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>OCR + LLM time extraction</li>
              <li>Conflict checking</li>
              <li>.ics export for Apple/Google/Outlook</li>
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
              <li>Provided accurate, GPA‑aligned recommendations</li>
              <li>Helped students pick professors backed by data</li>
              <li>Reduced uncertainty in course selection</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">What I Learned</h3>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>Recommendation systems must balance data and intuition</li>
              <li>Students value professor insights even more than difficulty scores</li>
              <li>LLMs shine when paired with structured academic data</li>
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
            "Recommendation Systems", "GPA Modeling",
            "Professor Scoring", "OpenAI", "OCR (optional)", ".ics Export"
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