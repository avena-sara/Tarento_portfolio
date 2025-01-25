import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import "../styles/HomePage.css";

const HomePage = () => {
  const [personalInfoList, setPersonalInfoList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/personal-info")
      .then((response) => {
        setPersonalInfoList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching personal info:", error);
      });
  }, []);

  return (
    <Container fluid>
      {/* Profile Section */}
      <Row className="profile-section">
        <Col md={6} className="description-text">
          <h1>{personalInfoList[0]?.name}</h1>
          <p>
            I am a passionate software developer with experience in full-stack development. I love learning new technologies.
          </p>

          {/* Contact Info (Bottom-Left) */}
          <div className="contact-info">
            <p>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfoList[0]?.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="email-link"
              >
                {personalInfoList[0]?.email}
              </a>
            </p>
            <p>{personalInfoList[0]?.phoneNumber}</p>
          </div>

          {/* Buttons Section */}
          <Row className="mt-4">
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
              <Button variant="success" href="/projects" className="button-pop">
                My Projects
              </Button>
            </Col>
          </Row>
        </Col>

        {/* Profile Image Section */}
        <Col md={6} className="profile-photo-container">
          <img
            src={`http://localhost:8080/${personalInfoList[0]?.photoUrl}`}
            alt="Profile"
            className="profile-photo"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
