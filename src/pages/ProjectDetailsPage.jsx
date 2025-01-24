import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProjectDetailsPage = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams(); // Get the project ID from the URL

  useEffect(() => {
    // Fetch the project details from the backend API
    axios.get(`/api/projects/${id}`)
      .then(response => setProject(response.data))
      .catch(error => console.error('Error fetching project details:', error));
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <header className="projects-header">
        <h1>{project.projectName}</h1>
      </header>
      <div className="project-details">
        <p>{project.description}</p>
        <Link to="/projects">
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;  // Ensure this line is present
