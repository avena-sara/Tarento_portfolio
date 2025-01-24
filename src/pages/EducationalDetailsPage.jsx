import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/EducationalDetailsPage.css"; // Import the CSS file

const EducationalDetailsPage = () => {
  const [educationDetails, setEducationDetails] = useState([]);

  // Fetch education details from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/education")
      .then((response) => {
        console.log("Data fetched:", response.data);
        setEducationDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching education details:", error);
      });
  }, []);

  return (
    <div className="education-container">
      <div className="education-header"> {/* Updated class name */}
        <h1>Educational Details</h1>
      </div>
      <div className="education-content">
        {educationDetails.length > 0 ? (
          educationDetails.map((education, index) => (
            <div key={index} className="education-section">
              <h2>{education.degree}</h2>
              <p><strong>{education.institution}</strong>, {education.year}</p>
              <p>{education.boardOrUniversity}</p>
              <p>{education.cgpaOrPercentage}</p>
            </div>
          ))
        ) : (
          <p>Loading educational details...</p>
        )}
      </div>
      <button className="back-button" onClick={() => window.history.back()}>
        Back
      </button>
    </div>
  );
};

export default EducationalDetailsPage;
