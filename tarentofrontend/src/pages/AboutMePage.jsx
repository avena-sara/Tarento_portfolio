import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/AboutMe.css";

const AboutMe = () => {
  const [aboutMeData, setAboutMeData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/about-me/1") // Assuming ID is 1, update as needed
      .then((response) => {
        setAboutMeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching About Me details:", error);
      });
  }, []);

  const formatList = (data) => {
    return data ? data.split(",").map((item, index) => <li key={index}>{item.trim()}</li>) : [];
  };

  return (
    <Container fluid>
      {/* Header */}
      <Row className="about-header">
        <Col>
          <h1>ABOUT ME</h1>
        </Col>
      </Row>

      {/* Content Section */}
      <Row className="about-content">
        <Col md={6} className="about-text">
          <h2>Tech Skills</h2>
          <ul>{formatList(aboutMeData?.techSkills)}</ul>
          
          <h2>Soft Skills</h2>
          <ul>{formatList(aboutMeData?.nonTechSkills)}</ul>
          
          <h2>Achievements</h2>
          <ul>{formatList(aboutMeData?.achievements)}</ul>
          
          <h2>Interests</h2>
          <ul>{formatList(aboutMeData?.interests)}</ul>
        </Col>

        {/* Image Section */}
        <Col md={6} className="about-image">
          <img src="/images/profile.jpg" alt="Profile" className="profile-img" />
        </Col>
      </Row>

      {/* Back Button */}
      <Row>
        <Col className="text-center mt-4">
          <Button href="/" className="back-button">Back</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMe;
