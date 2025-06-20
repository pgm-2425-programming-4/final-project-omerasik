import { Link, useLocation } from "@tanstack/react-router";

export function Sidebar({ projects, onProjectSelect }) {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <Link
        to="/"
        className={
          "sidebar__item" + (location.pathname === "/" ? " active" : "")
        }
      >
        Home
      </Link>

      <h2 className="sidebar__title">Projects</h2>
      <ul className="sidebar__list">
        {projects.map((project) => {
          const isActive = location.pathname === `/projects/${project}`;
          return (
            <li key={project}>
              <Link
                to={`/projects/${project}`}
                className={
                  "sidebar__item" + (isActive ? " active" : "")
                }
                onClick={() => onProjectSelect(project)}
              >
                {project}
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="sidebar__title">Info</h2>
      <Link
        to="/about"
        className={
          "sidebar__item" +
          (location.pathname === "/about" ? " active" : "")
        }
      >
        About
      </Link>
    </nav>
  );
}
