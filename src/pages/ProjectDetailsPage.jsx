import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/ProjectDetailsPage.css";

const ProjectDetailsPage = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams(); // Get the project ID from the URL

  useEffect(() => {
    // Fetch the project details from the backend API
    axios
      .get(`http://localhost:8080/api/projects/${id}`) // Ensure this endpoint is correct
      .then(response => {
        console.log("Project fetched: ", response.data);  // Debugging log to check fetched data
        setProject(response.data);
      })
      .catch(error => console.error('Error fetching project details:', error));
  }, [id]);

  if (!project) return <div>Loading...</div>;

  // Manually set the image based on project ID or project name (here assuming `project1` and `project2`)
  const imageUrl = id === "3" ? "/images/project1.jpg" : id === "4" ? "/images/project2.jpg" : "/images/default.jpg";

  return (
    <div>
      <header className="projects-header">
        <h1>{project.projectName}</h1>
        <Link to="/projects">
          <button className="back-button">Back</button>
        </Link>
      </header>
      <div className="project-details">
        <div className="project-info">
          <p>{project.description}</p>
        </div>
        <div className="project-image">
          <img src={imageUrl} alt={project.projectName} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;

