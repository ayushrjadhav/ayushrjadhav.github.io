export default function TallyAICase() {
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
                Tally AI — Agentic Budgeting & Financial Tracking
              </h1>
              <p className="mt-4 text-neutral-600">
                A cloud-native AI agent that analyzes spending patterns, loans, and recurring expenses
                to generate adaptive budget recommendations—built for clarity, reliability, and real usage.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/resume.pdf"
                  className="px-5 py-2.5 rounded-xl bg-black text-white font-medium hover:opacity-90"
                >
                  Resume
                </a>
                <a
                  href="/case-studies"
                  className="px-5 py-2.5 rounded-xl border border-black/15 hover:bg-black/5"
                >
                  Back to Case Studies
                </a>
              </div>
            </div>

            {/* Media (put Tally.jpg/png in /public) */}
            <div className="rounded-2xl overflow-hidden border border-black/10 aspect-[4/3] w-full">
              <img
                src="/Tally.jpg"
                alt="Tally AI Screenshot"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // graceful fallback if you haven't added the image yet
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.classList.add(
                    "bg-neutral-100",
                    "flex",
                    "items-center",
                    "justify-center"
                  );
                  e.currentTarget.parentElement.innerHTML =
                    '<span class="text-neutral-500">Add a screenshot at /public/Tally.jpg</span>';
                }}
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat k="Type" v="Agentic AI" />
            <Stat k="Cloud" v="AWS + Azure" />
            <Stat k="Focus" v="Budgeting" />
            <Stat k="Output" v="Recommendations" />
          </div>
        </Wrapper>
      </div>

      {/* Problem → Role → Outcome */}
      <Wrapper className="py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold">Problem</h2>
            <p className="mt-2 text-neutral-600">
              Most budgeting tools are static. People need a system that detects recurring patterns,
              adapts to changing expenses, and produces actionable recommendations—not spreadsheets.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Role</h2>
            <p className="mt-2 text-neutral-600">
              Designed the agent workflow, built the data + inference pipeline, and implemented the
              UI and cloud scaffolding for a production-friendly demo.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Outcome</h2>
            <p className="mt-2 text-neutral-600">
              Delivered a clean end-to-end prototype that ingests transactions, categorizes spend,
              and generates adaptive, explainable budget suggestions.
            </p>
          </div>
        </div>
      </Wrapper>

      {/* Architecture */}
      <Wrapper className="py-6 md:py-10">
        <h2 className="text-2xl font-semibold">Architecture (High Level)</h2>

        <div className="mt-4 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">Ingestion + Categorization</h3>
            <p className="mt-2 text-neutral-600">
              Transaction events are normalized, enriched, and categorized to create a stable view
              of spending behavior over time.
            </p>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>Recurring expense detection</li>
              <li>Category mapping + corrections</li>
              <li>Clean schema for downstream reasoning</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">Agent Reasoning + Recommendations</h3>
            <p className="mt-2 text-neutral-600">
              An agent layer generates recommendations and explanations (what changed, why it matters,
              and what to do next), designed to be readable and easy to act on.
            </p>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>Budget suggestion generation</li>
              <li>Explainable rationales</li>
              <li>Guardrails for safe outputs</li>
            </ul>
          </div>
        </div>
      </Wrapper>

      {/* Results & Learnings */}
      <Wrapper className="py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">What this demonstrates</h3>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>Agentic workflows that produce structured, useful outputs</li>
              <li>Cloud-friendly design with scalable components</li>
              <li>Product-first UX: recommendations that don’t feel “AI-ish”</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">What I learned</h3>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>Users trust suggestions more when rationales are short and specific</li>
              <li>Schema + validation reduces hallucinations dramatically</li>
              <li>Clean UI matters as much as the model</li>
            </ul>
          </div>
        </div>
      </Wrapper>

      {/* Tech */}
      <Wrapper className="pb-20">
        <h2 className="text-2xl font-semibold">Tech</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "React",
            "Vite",
            "Tailwind",
            "AWS Lambda",
            "API Gateway",
            "S3",
            "Azure AI",
            "Agentic Workflows",
            "Observability-ready",
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