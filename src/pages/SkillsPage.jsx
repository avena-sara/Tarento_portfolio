import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/SkillsPage.css"
const SkillsPage = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/skills'); // Adjust API URL as needed
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  return (
    <div className="skills-container">
      <h1 className="my-text">Skills</h1>
      <div className="row">
        {skills.map((skill) => (
          <div className="col-md-4 mb-4" key={skill.uuid}>
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title font-weight-bold">{skill.skills}</h5>
                <p className="card-text">{skill.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
