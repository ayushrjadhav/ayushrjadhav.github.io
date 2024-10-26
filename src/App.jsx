import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';           // Home page component with all sections
import ProjectPage from './components/ProjectPage'; // Separate Projects page component
import AboutPage from './components/AboutPage';

function App() {
  return (
    <Router basename="/ayushrjadhav.github.io">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />         {/* Home page with button linking to projects */}
        <Route path="/projects" element={<ProjectPage />} /> {/* Separate Projects page */}
        <Route path="/About" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
