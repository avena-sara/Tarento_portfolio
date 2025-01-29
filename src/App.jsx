import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SkillsPage from './pages/SkillsPage';
import EducationalDetailsPage from './pages/EducationalDetailsPage';
import MyProjectsPage from './pages/MyProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import MyNavbar from './components/Navbar'; // ✅ Import Navbar

const App = () => {
  return (
    <Router>
      <MyNavbar /> {/* ✅ Navbar appears on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/educational-details" element={<EducationalDetailsPage />} />
        <Route path="/projects" element={<MyProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
