import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export const Create = () => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    dxf: File | null;
    dxfImage: File | null;
  }>({
    title: "",
    description: "",
    dxf: null,
    dxfImage: null,
  });
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);

    if (formData.dxf) {
      data.append("dxf_path", formData.dxf);
    }

    if (formData.dxfImage) {
      data.append("picture_path", formData.dxfImage);
    }

    axios
      .post("http://127.0.0.1:8000/api/upload_file", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("File Uploaded Successfully", response.data);
        setFormData({ title: "", description: "", dxf: null, dxfImage: null });
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });
  };
  return (
    <div className="row justify-content-center">
      {success && (
        <div className="d-flex z-1 position-fixed justify-content-end">
          <div className="alert alert-success" role="alert">
            File Uploaded Successfully!
          </div>
        </div>
      )}
      <div className="col-md-8">
        <span className="fw-bold fs-4">Create New Dxf</span>
        <form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3 mt-3"
          >
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Flowers"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              className="mb-3"
              as="textarea"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="fw-semibold">Choose a dxf file</Form.Label>
            <Form.Control
              accept=".dxf"
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dxf: (e.target as HTMLInputElement).files![0],
                })
              }
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="fw-semibold">
              Choose a picture of the selected dxf file
            </Form.Label>
            <Form.Control
              accept="image/*"
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dxfImage: (e.target as HTMLInputElement).files![0],
                })
              }
            />
          </Form.Group>

          <Button type="submit">Save File</Button>
        </form>
      </div>
    </div>
  );
};
