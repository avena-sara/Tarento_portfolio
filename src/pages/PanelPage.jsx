import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import EditModal from "../components/EditModal";  // Import the modal for editing
import "../styles/PanelPage.css";

const PanelPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Users");
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);  // To control modal visibility
  const [modalData, setModalData] = useState(null);  // To store the data for editing
  const [modalAction, setModalAction] = useState("add"); // To track whether it's Add or Edit

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

  // Function to handle Add for any section
  const handleAdd = () => {
    setModalAction("add");  // Set action to "add"
    setModalData({});  // Reset modal data for adding
    setShowModal(true);  // Show the modal
  };

  // Function to handle Edit for any section
  const handleEdit = (data) => {
    setModalAction("edit");  // Set action to "edit"
    setModalData(data);  // Pass existing data to modal for editing
    setShowModal(true);   // Show the modal
  };

  // Add or Update the data based on the modal content
  const handleSave = async (data) => {
    if (selectedSection === "Skills") {
      if (data.uuid) {
        await axios.put(`http://localhost:8080/api/skills/${data.uuid}`, data);
        setSkills(skills.map(skill => skill.uuid === data.uuid ? data : skill));
      } else {
        const response = await axios.post("http://localhost:8080/api/skills", data);
        setSkills([...skills, response.data]);
      }
    }
    else if (selectedSection === "Projects") {
      if (data.uuid) {
        await axios.put(`http://localhost:8080/api/projects/${data.uuid}`, data);
        setProjects(projects.map(project => project.uuid === data.uuid ? data : project));
      } else {
        const response = await axios.post("http://localhost:8080/api/projects", data);
        setProjects([...projects, response.data]);
      }
    }
    else if (selectedSection === "Education") {
      if (data.uuid) {
        await axios.put(`http://localhost:8080/api/education/${data.uuid}`, data);
        setEducation(education.map(edu => edu.uuid === data.uuid ? data : edu));
      } else {
        const response = await axios.post("http://localhost:8080/api/education", data);
        setEducation([...education, response.data]);
      }
    }
    else if (selectedSection === "Users") {
      if (data.id) {
        await axios.put(`http://localhost:8080/admin/app_users/${data.id}`, data);
        setAdmins(admins.map(admin => admin.id === data.id ? data : admin));
      } else {
        const response = await axios.post("http://localhost:8080/admin/app_users", data);
        setAdmins([...admins, response.data]);
      }
    }
    setShowModal(false);  // Close the modal after saving
  };

  // Render each section's content with its corresponding fields
  const renderSectionContent = () => {
    if (selectedSection === "Users") {
      return admins.map((admin) => (
        <Col md={4} key={admin.id || admin.username} className="mb-3">
          <div className="custom-card">
            <div className="custom-card-body">
              <h5>{admin.username}</h5>
              <Button variant="warning" className="me-2" onClick={() => handleEdit(admin)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDeleteUser(admin.id)}>Delete</Button>
            </div>
          </div>
        </Col>
      ));
    }

    if (selectedSection === "Skills") {
      return skills.map((skill) => (
        <Col md={4} key={skill.uuid} className="mb-3">
          <div className="custom-card">
            <div className="custom-card-body">
              <h5>{skill.skills}</h5>
              <Button variant="warning" className="me-2" onClick={() => handleEdit(skill)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDeleteSkill(skill.uuid)}>Delete</Button>
            </div>
          </div>
        </Col>
      ));
    }

    if (selectedSection === "Projects") {
      return projects.map((project) => (
        <Col md={6} key={project.uuid} className="mb-3">
          <div className="custom-card">
            <div className="custom-card-body">
              <h5>{project.projectName}</h5>
              <p>{project.description}</p>
              <Button variant="warning" className="me-2" onClick={() => handleEdit(project)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDeleteProject(project.uuid)}>Delete</Button>
            </div>
          </div>
        </Col>
      ));
    }

    if (selectedSection === "Education") {
      return education.map((edu) => (
        <Col md={6} key={edu.uuid} className="mb-3">
          <div className="custom-card">
            <div className="custom-card-body">
              <h5>{edu.degree}</h5>
              <p>{edu.institution}</p>
              <Button variant="warning" className="me-2" onClick={() => handleEdit(edu)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDeleteEducation(edu.uuid)}>Delete</Button>
            </div>
          </div>
        </Col>
      ));
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light vh-100 p-3">
          <h4>Admin Panel</h4>
          <ListGroup>
            {["Users", "Education", "Skills", "Projects"].map((section) => (
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
          <Button variant="danger" className="logout-btn mt-3" onClick={handleLogout}>Logout</Button>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <h2>{selectedSection}</h2>
          <Button variant="success" className="add-btn mb-3" onClick={handleAdd}>Add {selectedSection}</Button>
          <Row>
            {renderSectionContent()}
          </Row>
        </Col>
      </Row>

      {/* Edit Modal */}
      <EditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        data={modalData}
        section={selectedSection}
        action={modalAction}  // Pass action type (add or edit) to the modal
      />
    </Container>
  );
};

export default PanelPage;
