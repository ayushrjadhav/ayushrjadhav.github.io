export default function WildfireMLCase() {
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
              <div className="text-xs uppercase tracking-wide text-neutral-500">Project</div>
              <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
                Wildfire ML — Risk & Line Loading
              </h1>
              <p className="mt-4 text-neutral-600">
                I engineered features, tuned the classifiers, and plotted their shutoff decisions. Wildfire risk showed a stronger separation than line loading, and Random Forest captured a more granular boundary than the linear SVM.
              </p>
            </div>
            <figure className="wildfire-chart">
              <div className="wildfire-chart-plot">
                <img src="/wildfire-decision-boundary.webp" alt="Random Forest decision boundary for wildfire risk versus line loading. Most low-risk observations are classified as operational; the high-risk region contains more predicted shutoffs." />
                <span className="chart-marker chart-marker-risk" aria-hidden="true">1</span>
                <span className="chart-marker chart-marker-boundary" aria-hidden="true">2</span>
              </div>
              <figcaption>
                <p><strong>1. Risk drives separation.</strong> Predicted shutoffs cluster toward the higher-risk side of the chart.</p>
                <p><strong>2. Random Forest adds detail.</strong> The stepped boundary captures local pockets that a smoother SVM boundary misses.</p>
                <p><a className="underline" href="/Wildfire.jpg" target="_blank" rel="noopener">View the full research poster</a></p>
              </figcaption>
            </figure>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat k="Samples" v="8,700+ hourly records" />
            <Stat k="Models" v="Linear SVM / RF" />
            <Stat k="Goal" v="Reduce false shutoffs" />
            <Stat k="Stack" v="Python • sklearn" />
          </div>
        </Wrapper>
      </div>

      {/* Problem → Approach → Outcome */}
      <Wrapper className="py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold">Problem</h2>
            <p className="mt-2 text-neutral-600">
              Threshold rules for shutoffs are simple but blunt—they can over‑shut (hurting
              customers) or under‑shut (hurting safety). We needed clearer, explainable
              boundaries using just wildfire risk and line loading.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Role</h2>
            <p className="mt-2 text-neutral-600">
              Led modeling & visualization: feature engineering, class‑weight tuning, decision
              boundary plots, and evaluation (ROC/PR, calibration) to support policy discussion.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Outcome</h2>
            <p className="mt-2 text-neutral-600">
              Linear SVM matched optimization decisions in most regimes while reducing false
              shutoffs; Random Forest captured non‑linear edge cases with better recall on true
              shutoffs.
            </p>
          </div>
        </div>
      </Wrapper>

      {/* Architecture */}
      <Wrapper className="py-6 md:py-10">
        <h2 className="text-2xl font-semibold">Modeling Flow (High Level)</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">Features & Labels</h3>
            <p className="mt-2 text-neutral-600">
              Normalize risk & loading; add interaction (risk×loading). Labels derived from
              optimization‑based shutoff outcomes (OPS) vs baseline.
            </p>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>WFPI risk layers mapped to lines</li>
              <li>Utilization / capacity margin</li>
              <li>Stratified splits & calibration checks</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">Models & Tuning</h3>
            <p className="mt-2 text-neutral-600">
              Train Linear SVM & Random Forest; apply class weights to bias toward
              Operational, minimizing unnecessary shutoffs.
            </p>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>ROC/PR, confusion matrices</li>
              <li>Decision boundary visualization</li>
              <li>Feature importances (RF)</li>
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
              <li>Linear SVM: clean plane, fewer false shutoffs after class‑weight tuning</li>
              <li>Random Forest: captures non‑linear pockets; improves recall on true shutoffs</li>
              <li>Boundaries are human‑readable and support threshold policy debates</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
            <h3 className="font-semibold">What I Learned</h3>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              <li>Simple features can approximate complex shutoff logic</li>
              <li>Class weighting balances safety vs. customer impact</li>
              <li>Visualization turns models into operator tools</li>
            </ul>
          </div>
        </div>
      </Wrapper>

      {/* Tech */}
      <Wrapper className="pb-20">
        <h2 className="text-2xl font-semibold">Tech</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Python", "NumPy", "Pandas", "scikit‑learn",
            "SVM", "Random Forest",
            "ROC/PR", "Calibration", "Matplotlib",
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