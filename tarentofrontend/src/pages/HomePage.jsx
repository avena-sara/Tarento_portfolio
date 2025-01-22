import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import "../styles/HomePage.css";

const HomePage = () => {
  const [personalInfoList, setPersonalInfoList] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/personal-info") // Ensure backend is running
      .then((response) => {
        setPersonalInfoList(response.data); // Store the list of records
      })
      .catch((error) => {
        console.error("Error fetching personal info:", error);
      });
  }, []);

  return (
    <Container fluid>
      {/* Header section */}
      <Row className="header">
        <Col md={4} className="text-left">
          <p>{personalInfoList[0]?.email}</p>
          <p>{personalInfoList[0]?.phoneNumber}</p>
        </Col>
        <Col md={4} className="text-center">
          <h1>{personalInfoList[0]?.name}</h1>
        </Col>
        <Col md={4}></Col>
      </Row>

      {/* Image and description */}
      <Row>
        <Col>
          <div className="image-section">
            <img
              src={`http://localhost:8080/${personalInfoList[0]?.photoUrl}`}
              alt="Profile"
              className="profile-photo"
            />
            <div className="description-overlay">
              <p>
                I am a passionate software developer with experience in full-stack development. I love learning new technologies.
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Buttons section */}
      <Row className="mt-4 justify-content-center">
        <Col xs="auto">
          <Button variant="success" href="/about-me" className="button-pop">
            About Me
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="success" href="/educational-details" className="button-pop">
            Educational Details
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="success" href="/my-projects" className="button-pop">
            My Projects
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
