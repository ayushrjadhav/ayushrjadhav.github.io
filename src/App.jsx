import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Chatbot from "./components/Chatbot";
import Layout from './core/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import CaseStudies from "./pages/CaseStudies";
import WischedulerCase from "./pages/case/Wischeduler";
import WildfireMLCase from "./pages/case/WildfireML";
import GradeyCase from "./pages/case/Gradey";
import AyushAI from "./pages/AyushAI";
import TallyAICase from "./pages/case/TallyAI";


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/wischeduler" element={<WischedulerCase />} />
          <Route path="/case-studies/wildfire-ml" element={<WildfireMLCase />} />
          <Route path="/case-studies/gradey" element={<GradeyCase />} />
          <Route path="/AyushAI" element={<AyushAI />} />
          <Route path="/case-studies/tally-ai" element={<TallyAICase />} />
        </Routes>
      </Layout>
      <Chatbot />
    </Router>
  );
}