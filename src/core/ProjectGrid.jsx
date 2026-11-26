import { Link } from "react-router-dom";
import ProjectCover from "./ProjectCover";

export function ProjectGrid({ items }) {
  return (
    <div className="project-grid">
      {items.map((project) => (
        <article className="project-card" key={project.id}>
          <ProjectCover id={project.id} />
          <div className="project-copy">
            <p className="eyebrow">{project.category}</p>
            <h3><Link to={`/projects/${project.id}`}>{project.title}</Link></h3>
            <p>{project.cardSummary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
