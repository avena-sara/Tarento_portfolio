import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditModal = ({ editModalData, setEditModalData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editModalData.action === "edit") {
      setFormData(editModalData);
    } else {
      setFormData({});
    }
  }, [editModalData]);

  const handleClose = () => setEditModalData(null);

  const handleSave = async () => {
    try {
      if (editModalData.type === "Skill") {
        if (editModalData.action === "edit") {
          await axios.put(`http://localhost:8080/api/skills/${editModalData.uuid}`, formData);
        } else {
          await axios.post("http://localhost:8080/api/skills", formData);
        }
      } else if (editModalData.type === "Project") {
        // Handle Project editing
      } else if (editModalData.type === "Education") {
        // Handle Education editing
      } else if (editModalData.type === "User") {
        // Handle User editing
      }
      handleClose(); // Close modal after save
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editModalData.action === "edit" ? `Edit ${editModalData.type}` : `Add ${editModalData.type}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {editModalData.type === "Skill" && (
            <>
              <Form.Group controlId="formSkill">
                <Form.Label>Skill</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.skills || ""}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>
            </>
          )}
          {/* Implement similar fields for Project, Education, and User editing */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
