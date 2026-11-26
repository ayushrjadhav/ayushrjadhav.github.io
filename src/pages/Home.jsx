import { Link } from "react-router-dom";
import HeroCharacter from "../core/HeroCharacter";
import { ProjectGrid } from "../core/ProjectGrid";
import { featuredProjects } from "../data/projectdata";

export default function Home() {
  return (
    <>
      <section className="shell hero">
        <div>
          <p className="eyebrow">Applied AI Engineer</p>
          <h1>Ayush Jadhav</h1>
          <p className="lede">I build software for complex decisions, from course scheduling and wildfire risk modeling to utility operations.</p>
          <div className="actions">
            <Link className="button" to="/projects">View projects</Link>
            <Link className="button secondary" to="/about#experience">View experience</Link>
          </div>
        </div>
        <HeroCharacter />
      </section>
      <section className="work-band">
        <div className="shell page-section">
          <div className="section-heading"><h2>Selected projects</h2><Link to="/projects">All projects</Link></div>
          <ProjectGrid items={featuredProjects} />
        </div>
      </section>
    </>
  );
}
