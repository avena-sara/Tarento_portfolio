import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import "../styles/MyProjectsPage.css"; 

const MyProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the backend API
    axios
      .get("http://localhost:8080/api/projects") 
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div>
      <header className="projects-header">
        <h1>MY PROJECTS</h1>
      </header>

      <Link to="/">
        <button className="back-button">Back</button>
      </Link>

      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-item">
            <h2>{project.projectName}</h2>
            <Link to={`/projects/${project.id}`}>
              <button>Learn More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjectsPage;
