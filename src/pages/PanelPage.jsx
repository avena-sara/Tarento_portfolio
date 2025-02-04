import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "../styles/PanelPage.css";

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

  // Add Education
  const handleAddEducation = async () => {
    const degree = prompt("Enter your degree:");
    const institution = prompt("Enter the institution:");
    const year = prompt("Enter the year of graduation:");
    const cgpaOrPercentage = prompt("Enter your CGPA or Percentage:");
    const boardOrUniversity = prompt("Enter your board/university:");

    if (!degree || !institution || !year || !cgpaOrPercentage || !boardOrUniversity) return;

    const payload = { degree, institution, year, cgpaOrPercentage, boardOrUniversity };

    try {
      const response = await axios.post("http://localhost:8080/api/education", payload);
      if (response.status === 201) {
        const newData = response.data;
        setEducation([...education, newData]);
      }
    } catch (error) {
      console.error("Error adding Education:", error);
    }
  };

  // Edit Education
  const handleEditEducation = async (uuid, currentDegree) => {
    const updatedDegree = prompt("Edit Degree:", currentDegree);
    const updatedInstitution = prompt("Edit Institution:");
    const updatedYear = prompt("Edit Year:");
    const updatedCgpaOrPercentage = prompt("Edit CGPA or Percentage:");
    const updatedBoardOrUniversity = prompt("Edit Board/University:");

    if (!updatedDegree || !updatedInstitution || !updatedYear || !updatedCgpaOrPercentage || !updatedBoardOrUniversity) return;

    const payload = { degree: updatedDegree, institution: updatedInstitution, year: updatedYear, cgpaOrPercentage: updatedCgpaOrPercentage, boardOrUniversity: updatedBoardOrUniversity };

    try {
      await axios.put(`http://localhost:8080/api/education/${uuid}`, payload);

      setEducation(education.map(edu =>
        edu.uuid === uuid ? { ...edu, degree: updatedDegree, institution: updatedInstitution, year: updatedYear, cgpaOrPercentage: updatedCgpaOrPercentage, boardOrUniversity: updatedBoardOrUniversity } : edu
      ));
    } catch (error) {
      console.error("Error updating Education:", error);
    }
  };

  // Delete Education
  const handleDeleteEducation = async (uuid) => {
    try {
      await axios.delete(`http://localhost:8080/api/education/${uuid}`);
      setEducation(education.filter((edu) => edu.uuid !== uuid));
    } catch (error) {
      console.error("Error deleting Education:", error);
    }
  };

  // Add Project
  const handleAddProject = async () => {
    const projectName = prompt("Enter the new project name:");
    const description = prompt("Enter the description for the project:");
    const proimages = prompt("Enter the image URL for the project:");

    if (!projectName || !description || !proimages) return;

    const payload = { projectName, description, proimages };

    try {
      const response = await axios.post("http://localhost:8080/api/projects", payload);
      if (response.status === 201) {
        const newData = response.data;
        setProjects([...projects, newData]);
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // Edit Project
  const handleEditProject = async (uuid, currentName, currentDescription, currentImage) => {
    const updatedName = prompt("Edit Project Name:", currentName);
    const updatedDescription = prompt("Edit Project Description:", currentDescription);
    const updatedImage = prompt("Edit Project Image URL:", currentImage);
  
    if (!updatedName || !updatedDescription || !updatedImage) return;
  
    const payload = { 
      projectName: updatedName,
      description: updatedDescription,
      proimages: updatedImage
    };
  
    try {
      const response = await axios.put(`http://localhost:8080/api/projects/${uuid}`, payload);
  
      if (response.status === 200) {
        setProjects(projects.map(project => 
          project.uuid === uuid ? { ...project, projectName: updatedName, description: updatedDescription, proimages: updatedImage } : project
        ));
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };
  
  // Delete Project
  const handleDeleteProject = async (uuid) => {
    console.log("Attempting to delete project with UUID:", uuid); // Debugging

    try {
        const response = await axios.delete(`http://localhost:8080/api/projects/${uuid}`);

        if (response.status === 200) {
            setProjects(projects.filter((project) => project.uuid !== uuid));
            console.log("Project deleted successfully!");
        } else {
            console.error("Failed to delete project. Status:", response.status);
        }
    } catch (error) {
        console.error("Error deleting project:", error.response ? error.response.data : error.message);
    }
};


  // Add Skill
  const handleAddSkill = async () => {
    const skillName = prompt("Enter the new skill:");
    const description = prompt("Enter the description for the skill:");

    if (!skillName || !description) return;

    const payload = { skills: skillName, description };

    try {
      const response = await axios.post("http://localhost:8080/api/skills", payload);
      if (response.status === 201) {
        const newData = response.data;
        setSkills([...skills, newData]);
      }
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  // Edit Skill
  const handleEditSkill = async (uuid, currentSkill) => {
    const updatedSkill = prompt("Edit Skill:", currentSkill);
    const updatedDescription = prompt("Edit description for the skill:");

    if (!updatedSkill || !updatedDescription) return;

    const payload = { skills: updatedSkill, description: updatedDescription };

    try {
      await axios.put(`http://localhost:8080/api/skills/${uuid}`, payload);

      setSkills(skills.map(skill =>
        skill.uuid === uuid ? { ...skill, skills: updatedSkill, description: updatedDescription } : skill
      ));
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  // Delete Skill
  const handleDeleteSkill = async (uuid) => {
    try {
      await axios.delete(`http://localhost:8080/api/skills/${uuid}`);
      setSkills(skills.filter((skill) => skill.uuid !== uuid));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // Add User
  const handleAddUser = async () => {
    const username = prompt("Enter the username:");
    const password = prompt("Enter the password:");
    const role = prompt("Enter the role (optional):");

    if (!username || !password) return;

    const payload = { username, password, role };

    try {
      const response = await axios.post("http://localhost:8080/admin/app_users", payload);
      if (response.status === 201) {
        const newData = response.data;
        setAdmins([...admins, newData]);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

// Edit User
const handleEditUser = async (id, currentUsername, currentRole) => {
    const updatedUsername = prompt("Edit Username:", currentUsername);
    const updatedPassword = prompt("Edit Password:"); // Prompt for new password
    const updatedRole = prompt("Edit Role (optional):", currentRole);

    if (!updatedUsername || !updatedPassword) {
        alert("Username and Password are required!");
        return;
    }

    const payload = {
        username: updatedUsername,
        password: updatedPassword, // Plain password (backend will hash it)
        role: updatedRole || currentRole
    };

    try {
        console.log("Sending PUT request with payload:", payload);

        const response = await axios.put(`http://localhost:8080/admin/app_users/${id}`, payload);

        console.log("Response from backend:", response.data);

        if (response.status === 200) {
            // Instead of manually updating, fetch updated users
            fetchUsers();
            alert("User updated successfully!");
        } else {
            console.error("User update failed:", response);
            alert("Failed to update user.");
        }
    } catch (error) {
        console.error("Error updating user:", error.response ? error.response.data : error.message);
        alert("Failed to update user. Check console for details.");
    }
};

// Fetch users to refresh state after update
const fetchUsers = async () => {
    try {
        const response = await axios.get("http://localhost:8080/admin/app_users");
        setAdmins(response.data);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

const handleDeleteUser = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/admin/app_users/${id}`);
        
        // Update the state to remove the deleted user
        setAdmins(admins.filter((admin) => admin.id !== id));

        alert("User deleted successfully!");
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
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
          <Button variant="danger" className="logout-btn mt-3" onClick={handleLogout}>
            Logout
          </Button>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <h2>{selectedSection}</h2>
          <Button variant="success" className="add-btn mb-3" onClick={() => {
            if (selectedSection === "Users") handleAddUser();
            if (selectedSection === "Education") handleAddEducation();
            if (selectedSection === "Skills") handleAddSkill();
            if (selectedSection === "Projects") handleAddProject();
          }}>Add {selectedSection}</Button>
          <Row>
            {/* Display custom styled cards for Users, Skills, Education, Projects */}
            {selectedSection === "Users" && admins.map((admin) => (
              <Col md={4} key={admin.id || admin.username} className="mb-3">
                <div className="custom-card">
                  <div className="custom-card-body">
                    <h5>{admin.username}</h5>
                    <Button variant="warning" className="me-2" onClick={() => handleEditUser(admin.id, admin.username)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteUser(admin.id)}>Delete</Button>
                  </div>
                </div>
              </Col>
            ))}

            {selectedSection === "Skills" && skills.map((skill) => (
              <Col md={4} key={skill.uuid || skill.skills} className="mb-3">
                <div className="custom-card">
                  <div className="custom-card-body">
                    <h5>{skill.skills}</h5>
                    <Button variant="warning" className="me-2" onClick={() => handleEditSkill(skill.uuid, skill.skills)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteSkill(skill.uuid)}>Delete</Button>
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
                    <Button variant="warning" className="me-2" onClick={() => handleEditProject(project.uuid, project.projectName)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteProject(project.uuid)}>Delete</Button>
                  </div>
                </div>
              </Col>
            ))}

            {selectedSection === "Education" && education.map((edu) => (
              <Col md={6} key={edu.uuid} className="mb-3">
                <div className="custom-card">
                  <div className="custom-card-body">
                    <h5>{edu.degree}</h5>
                    <p>{edu.institution}</p>
                    <Button variant="warning" className="me-2" onClick={() => handleEditEducation(edu.uuid, edu.degree)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteEducation(edu.uuid)}>Delete</Button>
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
