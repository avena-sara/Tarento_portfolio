import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaGithub, FaFilePdf, FaPhone } from "react-icons/fa";
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
          {/* Animated Name */}
          <h1 className="animate-name">{personalInfoList[0]?.name}</h1>
          <p>Associate Software Engineer</p>

          {/* Contact Icons */}
          <div className="contact-icons">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfoList[0]?.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaEnvelope size={24} />
            </a>
            <a
              href="https://github.com/avena-sara" /* Replace with your GitHub link */
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="/resume.pdf" /* Replace with the actual resume link */
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaFilePdf size={24} />
            </a>
          </div>

          {/* Phone Number */}
          <div className="phone-info">
            <FaPhone size={20} /> {personalInfoList[0]?.phoneNumber}
          </div>

          {/* Buttons Section */}
          <Row className="mt-4">
            <Col xs="auto">
              <Button variant="success" href="/skills" className="button-pop">
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
