import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap"; // No need to import Card here
import axios from "axios";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "../styles/PanelPage.css"; // Import the CSS file for custom styling

const PanelPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Users");
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedSection]);

  const fetchData = async () => {
    try {
      if (selectedSection === "Skills") {
        const response = await axios.get("http://localhost:8080/api/skills");
        setSkills(response.data);
      } else if (selectedSection === "Projects") {
        const response = await axios.get("http://localhost:8080/api/projects");
        setProjects(response.data);
      } else if (selectedSection === "Education") {
        const response = await axios.get("http://localhost:8080/api/education");
        setEducation(response.data);
      } else if (selectedSection === "Users") {
        const response = await axios.get("http://localhost:8080/admin/app_users");
        setAdmins(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleAdd = async () => {
    const projectName = prompt(`Enter the new ${selectedSection} name:`);
    const description = prompt(`Enter the description for the ${selectedSection}:`);
    const proimages = prompt(`Enter the image URL for the ${selectedSection}:`);
  
    if (!projectName || !description || !proimages) return;
  
    const payload = { projectName, description, proimages };
  
    try {
      const response = await axios.post("http://localhost:8080/api/projects", payload);
      if (response.status === 201) {
        const newData = response.data;
        setProjects([...projects, newData]);
      }
    } catch (error) {
      console.error(`Error adding ${selectedSection}:`, error);
    }
  };
  
  const handleEdit = async (uuid, currentName) => {
    const updatedName = prompt(`Edit ${selectedSection}:`, currentName);
    const updatedDescription = prompt(`Edit description for ${updatedName}:`);
    const updatedImage = prompt(`Edit image URL for ${updatedName}:`);
  
    if (!updatedName || !updatedDescription || !updatedImage) return;
  
    const payload = { projectName: updatedName, description: updatedDescription, proimages: updatedImage };
  
    try {
      await axios.put(`http://localhost:8080/api/projects/${uuid}`, payload);
  
      setProjects(projects.map(project => 
        project.uuid === uuid ? { ...project, projectName: updatedName, description: updatedDescription, proimages: updatedImage } : project
      ));
    } catch (error) {
      console.error(`Error updating ${selectedSection}:`, error);
    }
  };

  const sections = ["Users", "Education", "Skills", "Projects"];

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light vh-100 p-3">
          <h4>Admin Panel</h4>
          <ListGroup>
            {sections.map((section) => (
              <ListGroup.Item 
                key={section} 
                action 
                active={selectedSection === section} 
                onClick={() => setSelectedSection(section)}
              >
                {section}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="danger" className=" logout-btn mt-3" onClick={handleLogout}>
            Logout
          </Button>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <h2>{selectedSection}</h2>
          <Button variant="success" className=" add-btn mb-3" onClick={handleAdd}>Add {selectedSection}</Button>
          <Row>
            {/* Display custom styled cards for Users, Skills, Education, Projects */}
            {selectedSection === "Users" && admins.map((admin) => (
              <Col md={4} key={admin.uuid || admin.username} className="mb-3">
                <div className="custom-card">
                  <div className="custom-card-body">
                    <h5>{admin.username}</h5>
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(admin.uuid, admin.username)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(admin.uuid)}>Delete</Button>
                  </div>
                </div>
              </Col>
            ))}

            {selectedSection === "Skills" && skills.map((skill) => (
              <Col md={4} key={skill.uuid || skill.skills} className="mb-3">
                <div className="custom-card">
                  <div className="custom-card-body">
                    <h5>{skill.skills}</h5>
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(skill.uuid, skill.skills)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(skill.uuid)}>Delete</Button>
                  </div>
                </div>
              </Col>
            ))}

            {selectedSection === "Projects" && projects.map((project) => (
              <Col md={6} key={project.uuid} className="mb-3">
                <div className="custom-card">
                  <div className="custom-card-body">
                    <h5>{project.projectName}</h5>
                    <p>{project.description}</p>
                    <img src={project.proimages} alt={project.projectName} className="custom-card-img" />
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(project.uuid, project.projectName)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(project.uuid)}>Delete</Button>
                  </div>
                </div>
              </Col>
            ))}

            {selectedSection === "Education" && education.map((edu) => (
              <Col md={4} key={edu.uuid || edu.institution} className="mb-3">
                <div className="custom-card">
                  <div className="custom-card-body">
                    <h5>{edu.institution} - {edu.degree}</h5>
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(edu.uuid, edu.institution)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(edu.uuid)}>Delete</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PanelPage;
