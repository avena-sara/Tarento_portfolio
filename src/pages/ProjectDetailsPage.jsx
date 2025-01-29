import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/ProjectDetailsPage.css";

const ProjectDetailsPage = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams(); // Get the project UUID from the URL

  useEffect(() => {
    // Fetch the project details from the backend API
    axios
      .get(`http://localhost:8080/api/projects/${id}`) // Ensure this endpoint is correct
      .then(response => {
        console.log("Project fetched: ", response.data);  // Debugging log to check fetched data
        setProject(response.data);
        console.log(project);
      })
      .catch(error => console.error('Error fetching project details:', error));
  }, [id]);

  if (!project) return <div>Loading...</div>;

  // Destructure description and proimages from the project
  const { description, proimages } = project;

  return (
    <div className="projectdet-container">
      <header className="projects-header">
        <h1>{project.projectName}</h1>
      </header>
      <div className="project-details">
        <div className="project-info">
          <p>{description}</p>
        </div>
        <div className="project-image">
          {/* Display the image using proimages URL */}
          <img src={`http://localhost:8080/${proimages}`} alt={project.projectName} />

        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
