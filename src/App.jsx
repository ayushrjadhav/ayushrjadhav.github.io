import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Layout from "./core/Layout";
import Home from "./pages/Home";
import { ProjectDetail, Projects } from "./pages/Projects";
import About from "./pages/About";
import AyushAI from "./pages/AyushAI";
import { projects } from "./data/projectdata";

function LegacyProject() {
  const { slug } = useParams();
  const { search, hash } = useLocation();
  return <Navigate to={`/projects/${slug}${search}${hash}`} replace />;
}

function LegacyResume() {
  const { search } = useLocation();
  return <Navigate to={{ pathname: "/about", search, hash: "#experience" }} replace />;
}

function SiteRoutes() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pathname.toLowerCase().split("/")[1];
    const project = projects.find(({ id }) => pathname.replace(/\/$/, "") === `/projects/${id}`);
    const title = project?.title ?? { projects: "Projects", about: "About", ayushai: "AyushAI" }[page];
    document.title = title ? `${title} | Ayush Jadhav` : "Ayush Jadhav | Applied AI Engineer";
  }, [pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/cloud-ai" element={<Navigate to="/projects" replace />} />
        <Route path="/projects/frontend-systems" element={<Navigate to="/projects" replace />} />
        <Route path="/projects/tally-ai" element={<Navigate to="/projects" replace />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/case-studies" element={<Navigate to="/projects" replace />} />
        <Route path="/case-studies/:slug" element={<LegacyProject />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<LegacyResume />} />
        <Route path="/AyushAI" element={<AyushAI />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return <BrowserRouter><SiteRoutes /></BrowserRouter>;
}
