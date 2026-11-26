import { Link } from "react-router-dom";

export function ProjectGrid({ items }) {
  return (
    <div className="project-grid">
      {items.map((project) => (
        <article className="project-card" key={project.id}>
          {project.cover && <img className="project-cover" src={project.cover} alt="" loading="lazy" />}
          <div className="project-copy">
            <p className="eyebrow">{project.category}</p>
            <h3><Link to={`/projects/${project.id}`}>{project.title}</Link></h3>
            <p>{project.tagline}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
