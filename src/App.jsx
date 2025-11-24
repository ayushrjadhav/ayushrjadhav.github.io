import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Chatbot from "./components/Chatbot";
import Layout from './core/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
      <Chatbot />
    </Router>
  );
}