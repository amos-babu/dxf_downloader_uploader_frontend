import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../utils/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

type UpdateProfileProps = {
  name: string;
  username: string;
  bio: string;
  profile_image: File | null;
};

function UpdateProfile() {
  const { userData, show, handleClose } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateProfileProps>({
    name: userData?.name || "",
    username: userData?.username || "",
    bio: userData?.bio || "",
    profile_image: null,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        username: userData.username || "",
        bio: userData.bio || "",
        profile_image: null,
      });
    }
  }, [userData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("username", formData.username);
    data.append("bio", formData.bio);

    if (formData.profile_image) {
      data.append("profile_pic_path", formData.profile_image);
    }

    // for (let [key, value] of data.entries()) {
    //   console.log(key, value);
    // }

    axios
      .put(`${apiUrl}update_user`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setFormData({ name: "", username: "", bio: "", profile_image: null });
        handleClose();
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          const errors = error.response.data.errors;
          console.log(errors);
          setError("There were validation issues. Please check the form.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <div className="mx-3 mt-3">
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="name"
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              type="username"
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              as="textarea"
              rows={3}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({
                  ...formData,
                  profile_image: (e.target as HTMLInputElement).files![0],
                })
              }
              type="file"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdateProfile;
