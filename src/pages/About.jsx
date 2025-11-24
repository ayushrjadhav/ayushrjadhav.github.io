import { useEffect, useRef, useState } from "react";

function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}

export default function About() {
  const Wrapper = ({ children, className = "" }) => (
    <section className={"max-w-5xl mx-auto px-6 " + className}>{children}</section>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <Wrapper className="pt-16 md:pt-24">
        <FadeIn className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Optional headshot placeholder */}
          <div className="p-1.5 rounded-2xl bg-gradient-to-br from-white/40 to-white/10 shadow-2xl">
            <img
              src="/headshot.jpg"
              alt="Ayush Jadhav"
              loading="lazy"
              className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover ring-2 ring-white/40"
            />
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-neutral-900">
              Hi, I’m Ayush.
            </h1>
            <p className="mt-3 text-lg text-neutral-700 max-w-2xl">
              I’m an applied AI engineer who builds scalable, production-ready AI agents and
              operational ML systems. I like turning complex ideas—LLMs, optimization, predictive
              modeling—into clear, reliable tools that solve real problems.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                className="px-5 py-2.5 rounded-xl bg-black text-white font-medium hover:opacity-90"
              >
                Download Resume
              </a>
              <a
                href="/projects"
                className="px-5 py-2.5 rounded-xl border border-black/20 text-black hover:bg-black/5"
              >
                View Projects
              </a>
            </div>
          </div>
        </FadeIn>
      </Wrapper>

      {/* HIGHLIGHTS */}
      <Wrapper className="pt-12 md:pt-16">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <FadeIn delay={0}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm h-full">
              <div className="text-2xl">🤖</div>
              <h3 className="mt-2 font-semibold">Applied AI</h3>
              <p className="mt-2 text-neutral-600 text-sm">
                LLM agents, reasoning, retrieval, and safe deployment patterns.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm h-full">
              <div className="text-2xl">📈</div>
              <h3 className="mt-2 font-semibold">ML & Optimization</h3>
              <p className="mt-2 text-neutral-600 text-sm">
                SVM / RF, evaluation, feature engineering; schedule & decision optimization.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm h-full">
              <div className="text-2xl">☁️</div>
              <h3 className="mt-2 font-semibold">Cloud & Product</h3>
              <p className="mt-2 text-neutral-600 text-sm">
                Azure/AWS, .NET/SQL APIs, React + Vite UIs with clean UX.
              </p>
            </div>
          </FadeIn>
        </div>
      </Wrapper>

      {/* SKILLS */}
      <Wrapper className="pt-12 md:pt-16">
        <FadeIn>
          <h2 className="text-2xl font-semibold text-neutral-900">Core Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "LLMs", "Agents", "Prompting",
              "SVM", "Random Forest", "Evaluation",
              "Optimization", "Python",
              "Azure", "AWS", ".NET", "SQL",
              "React", "Vite", "Tailwind",
            ].map((t) => (
              <span key={t} className="text-sm px-3 py-1.5 rounded-full bg-neutral-100 border border-black/10 text-neutral-700">
                {t}
              </span>
            ))}
          </div>
        </FadeIn>
      </Wrapper>

      {/* EXPERIENCE SNAPSHOTS (no internal code details) */}
      <Wrapper className="pt-12 md:pt-16">
        <h2 className="text-2xl font-semibold text-neutral-900">Experience Snapshots</h2>
        <div className="mt-6 space-y-6">
          <FadeIn delay={0}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold">AI / Software — WEC Energy Group</h3>
                <span className="text-sm text-neutral-500">Milwaukee, WI</span>
              </div>
              <ul className="mt-3 text-neutral-700 list-disc pl-5 space-y-1">
                <li>Developed features across .NET / SQL services with an emphasis on reliability.</li>
                <li>Partnered with ops teams to translate business needs into robust software.</li>
                <li>Built internal tooling and clean UIs to streamline workflows.</li>
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Wischeduler — LLM + Optimization</h3>
              <ul className="mt-3 text-neutral-700 list-disc pl-5 space-y-1">
                <li>LLM-assisted scheduling with conflict resolution and .ics export.</li>
                <li>Combines heuristic optimization with natural-language inputs.</li>
                <li>Used by hundreds of students; Apple-style clean UI.</li>
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Wildfire ML — Risk & Line Loading</h3>
              <ul className="mt-3 text-neutral-700 list-disc pl-5 space-y-1">
                <li>SVM / Random Forest modeling on wildfire risk + line loading features.</li>
                <li>Explains decision boundaries and tradeoffs for shutoff analysis.</li>
                <li>Focus on interpretability and actionable insight.</li>
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Gradey — AI Chatbot</h3>
              <ul className="mt-3 text-neutral-700 list-disc pl-5 space-y-1">
                <li>Parses schedules (text/images) and generates downloadable .ics.</li>
                <li>Built with React + Vite; clean, fast UI with strong DX.</li>
                <li>Good example of applied LLM UX and integrations.</li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </Wrapper>

      {/* EDUCATION / CONTACT */}
      <Wrapper className="pt-12 md:pt-16 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={0}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-neutral-900">Education</h3>
              <p className="mt-2 text-neutral-700">
                B.S. Computer Engineering & Computer Sciences — University of Wisconsin–Madison
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-neutral-900">Contact</h3>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <a className="underline" href="mailto:ayush@ayushjadhav.com">Email</a>
                <a className="underline" href="https://www.linkedin.com/in/ayushrjadhav" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="underline" href="https://github.com/ayushrjadhav" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </Wrapper>
    </div>
  );
}