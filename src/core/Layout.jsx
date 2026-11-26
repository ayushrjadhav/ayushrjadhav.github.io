import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { contactEmail } from "../data/profile";

const links = [["Projects", "/projects"], ["About", "/about"], ["AyushAI", "/AyushAI"]];

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const section = hash && document.getElementById(hash.slice(1));
    if (section) section.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="site">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="shell nav" aria-label="Main navigation">
          <Link className="wordmark" to="/" onClick={() => setMenuOpen(false)}>Ayush Jadhav</Link>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-links" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
          <div className={`site-links ${menuOpen ? "is-open" : ""}`} id="site-links">
            {links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
          </div>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <div className="shell footer-inner">
          <Link className="wordmark" to="/">Ayush Jadhav</Link>
          <div className="actions">
            <a href={`mailto:${contactEmail}`}>Email</a>
            <a href="https://www.linkedin.com/in/ayush-jadhav-227590227/">LinkedIn</a>
            <a href="https://github.com/ayushrjadhav">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
