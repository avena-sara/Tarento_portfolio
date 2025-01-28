import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  // HomePage.jsx
import SkillsPage from './pages/SkillsPage';  // SkillsPage.jsx
import EducationalDetailsPage from './pages/EducationalDetailsPage';  // EducationalDetailsPage.jsx
import MyProjectsPage from './pages/MyProjectsPage';  // MyProjectsPage.jsx
import ProjectDetailsPage from './pages/ProjectDetailsPage';  // ProjectDetailsPage.jsx

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/educational-details" element={<EducationalDetailsPage />} />
        <Route path="/projects" element={<MyProjectsPage />} /> {/* This is your projects page */}
        <Route path="/projects/:id" element={<ProjectDetailsPage />} /> {/* For individual project details */}
      </Routes>
    </Router>
  );
};

export default App;
