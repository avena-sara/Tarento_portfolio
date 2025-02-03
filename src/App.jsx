import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SkillsPage from './pages/SkillsPage';
import EducationalDetailsPage from './pages/EducationalDetailsPage';
import MyProjectsPage from './pages/MyProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import LoginPage from './pages/LoginPage';
import PanelPage from './pages/PanelPage';
import MyNavbar from './components/Navbar';

const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/educational-details" element={<EducationalDetailsPage />} />
        <Route path="/projects" element={<MyProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/panel" element={<ProtectedRoute element={<PanelPage />} />} />
      </Routes>
    </Router>
  );
};

export default App;
