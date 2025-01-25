import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../styles/AboutMe.css"; // Ensure your custom styles are here

const AboutMePage = () => {
  const [aboutMeData, setAboutMeData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/about-me") // Update the API endpoint if needed
      .then((response) => {
        setAboutMeData(response.data[0]); // Assuming you are fetching the first item in the list
      })
      .catch((error) => {
        console.error("Error fetching about me data:", error);
      });
  }, []);

  // Helper function to format the comma-separated data into list items
  const formatList = (data) => {
    return data ? data.split(",").map((item, index) => <li key={index}>{item.trim()}</li>) : [];
  };

  return (
    <div className="Aboutme">
      {/* Black Header with "About Me" centered */}
      <header className="header">
        <h1>About Me</h1>
      </header>

      {/* Main Container */}
      <Container fluid className="mt-1 ">
        <Row className="mb-1 justify-content-center">
          {/* Tech Skills Card */}
          <Col xs={12} md={6} lg={3} className="d-flex justify-content-center mb-1">
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Tech Skills</Card.Title>
                <ul>{formatList(aboutMeData.techSkills)}</ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Non-Tech Skills Card */}
          <Col xs={12} md={6} lg={3} className="d-flex justify-content-center mb-1">
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Non-Tech Skills</Card.Title>
                <ul>{formatList(aboutMeData.nonTechSkills)}</ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-1 justify-content-center">
          {/* Achievements Card */}
          <Col xs={12} md={6} lg={3} className="d-flex justify-content-center mb-1">
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Achievements</Card.Title>
                <ul>{formatList(aboutMeData.achievements)}</ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Interests Card */}
          <Col xs={12} md={6} lg={3} className="d-flex justify-content-center mb-1">
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Interests</Card.Title>
                <ul>{formatList(aboutMeData.interests)}</ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <button className="back-button" onClick={() => window.history.back()}>
        Back
      </button>
    </div>
  );
};

export default AboutMePage;
