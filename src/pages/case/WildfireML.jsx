export default function WildfireMLCase() {
  const Wrapper = ({ children, className = "" }) => (
    <section className={"max-w-6xl mx-auto px-6 " + className}>{children}</section>
  );
  return (
    <>
      <Wrapper className="pt-16 md:pt-24">
        <div className="text-xs uppercase tracking-wide text-neutral-500">Case Study</div>
        <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
          Wildfire ML — Risk & Line Loading
        </h1>
        <p className="mt-4 text-neutral-600 max-w-3xl">
          SVM / Random Forest models to analyze shutoff decisions using wildfire risk and
          line-loading features; interpretable boundaries and tradeoffs.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/resume.pdf" className="px-5 py-2.5 rounded-xl bg-black text-white font-medium hover:opacity-90">Résumé</a>
          <a href="/case-studies" className="px-5 py-2.5 rounded-xl border border-black/15 hover:bg-black/5">All Case Studies</a>
        </div>
      </Wrapper>
    </>
  );
}