import { Link } from "react-router-dom";
import { contactEmail, education, experience, leadership } from "../data/profile";

const timeline = [...experience, leadership].sort((a, b) => b.startMonth.localeCompare(a.startMonth));

const snapshots = [
  { title: "Enterprise AI", text: experience[0].bullets[1], detail: "WEC Energy Group", path: "/about#experience" },
  { title: "Utility operations", text: experience[1].bullets[0], detail: "WEC Energy Group", path: "/about#experience" },
  { title: "Wildfire ML research", text: "Used SVM and Random Forest classifiers to study when utilities should shut off power in response to wildfire risk.", detail: "Applied ML", path: "/projects/wildfire-ml" },
  { title: "Wischeduler", text: "Built an AI-assisted course planner that won first place at the ECE Capstone Showcase.", detail: "Optimization", path: "/projects/wischeduler" },
  { title: "Gradey", text: "Built a conversational assistant for course planning and calendar export.", detail: "Conversational AI", path: "/projects/gradey" },
];

export default function About() {
  return (
    <>
      <section className="shell hero about">
        <div>
          <h1 className="page-title">About me</h1>
          <p className="lede">I’m Ayush, a Founding AI Applications Analyst at WEC Energy Group and a UW–Madison computer engineering and computer sciences graduate.</p>
          <div className="actions">
            <a className="button" href="/resume.pdf" target="_blank" rel="noopener">Preview Resume</a>
            <a className="button secondary" href={`mailto:${contactEmail}`}>Get in touch</a>
          </div>
        </div>
        <img className="portrait" src="/headshot.jpg" alt="Ayush Jadhav" />
      </section>
      <section className="shell page-section career" id="experience" aria-labelledby="career-heading">
        <div className="section-heading"><h2 id="career-heading">Experience timeline</h2></div>
        <ol className="career-timeline">
          {timeline.map(({ title, organization, dates, bullets }) => (
            <li key={title}>
              <div className="career-role">
                <h3>{title}</h3>
                <p>{dates}</p>
              </div>
              <p className="career-organization">{organization}</p>
              <p>{bullets[0]}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="work-band">
        <div className="shell page-section">
          <div className="section-heading"><h2>Experience snapshots</h2></div>
          <div className="snapshot-grid">
            {snapshots.map(({ title, text, detail, path }) => (
              <article className="snapshot-card" key={title}>
                <p className="eyebrow">{detail}</p>
                <h3><Link to={path}>{title}</Link></h3>
                <p>{text}</p>
              </article>
            ))}
            <article className="snapshot-card">
              <p className="eyebrow">Education</p>
              <h3>{education.school}</h3>
              <p>{education.degree} · {education.date}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
