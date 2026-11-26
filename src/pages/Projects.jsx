import { Link, useParams } from "react-router-dom";
import { ProjectGrid } from "../core/ProjectGrid";
import { projects } from "../data/projectdata";
import Wischeduler from "./case/Wischeduler";
import WildfireML from "./case/WildfireML";
import Gradey from "./case/Gradey";
import TripRescue from "./case/TripRescue";

const caseStudies = { wischeduler: Wischeduler, "wildfire-ml": WildfireML, gradey: Gradey, "trip-rescue": TripRescue };

export function Projects() {
  return (
    <section className="shell page-section">
      <h1 className="page-title">Projects</h1>
      <p className="lede">Explore the problems, engineering decisions, and results behind my AI and software work.</p>
      <ProjectGrid items={projects} />
    </section>
  );
}

export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(({ id }) => id === slug);
  const CaseStudy = project && caseStudies[project.id];

  if (!CaseStudy) return <section className="shell page-section"><h1 className="page-title">Project not found</h1><Link to="/projects">Browse projects</Link></section>;

  return (
    <>
      <div className="shell project-back"><Link to="/projects">All projects</Link></div>
      <div className="case-study"><CaseStudy project={project} /></div>
    </>
  );
}
