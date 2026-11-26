import { FiGrid } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AllProjectsLink() {
  return (
    <Link className="button secondary all-projects-button" to="/projects">
      <FiGrid aria-hidden="true" focusable="false" /> All projects
    </Link>
  );
}
