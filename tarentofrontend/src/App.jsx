import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';  // This now imports HomePage.jsx
import AboutMePage from './pages/AboutMePage';  // You should also rename this one to AboutMePage.jsx
import EducationalDetailsPage from './pages/EducationalDetailsPage';  // Same here
import MyProjectsPage from './pages/MyProjectsPage';  // And here

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/educational-details" element={<EducationalDetailsPage />} />
        <Route path="/my-projects" element={<MyProjectsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
