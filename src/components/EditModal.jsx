import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const EditModal = ({ show, onClose, onSave, data, section, action }) => {
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    setEditedData(data || {}); // Initialize with provided data
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(editedData); // Save edited data
  };

  const renderFields = () => {
    switch (section) {
      case "Skills":
        return (
          <>
            <Form.Group controlId="skills">
              <Form.Label>Skill</Form.Label>
              <Form.Control
                type="text"
                name="skills"
                value={editedData.skills || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editedData.description || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        );
      case "Projects":
        return (
          <>
            <Form.Group controlId="projectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="projectName"
                value={editedData.projectName || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editedData.description || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="proimages">
              <Form.Label>Project Images URL</Form.Label>
              <Form.Control
                type="text"
                name="proimages"
                value={editedData.proimages || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        );
      case "Education":
        return (
          <>
            <Form.Group controlId="degree">
              <Form.Label>Degree</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                value={editedData.degree || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="institution">
              <Form.Label>Institution</Form.Label>
              <Form.Control
                type="text"
                name="institution"
                value={editedData.institution || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="year"
                value={editedData.year || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="cgpaOrPercentage">
              <Form.Label>CGPA/Percentage</Form.Label>
              <Form.Control
                type="text"
                name="cgpaOrPercentage"
                value={editedData.cgpaOrPercentage || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="boardOrUniversity">
              <Form.Label>Board/University</Form.Label>
              <Form.Control
                type="text"
                name="boardOrUniversity"
                value={editedData.boardOrUniversity || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        );
      case "Users":
        return (
          <>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editedData.username || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={editedData.password || ""}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Role can be optional, so it can be left out if not needed for now */}
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={editedData.role || ""}
                onChange={handleChange}
                placeholder="Leave blank if not needed"
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{action === "add" ? `Add ${section}` : `Edit ${section}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>{renderFields()}</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {action === "add" ? "Add" : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
