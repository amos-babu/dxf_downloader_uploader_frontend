import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

type FormDataProps = {
  title: string;
  description: string;
  dxf: File | null;
  dxfImage: File | null;
};

type ErrorProps = {
  title?: string[];
  dxf_path?: string[];
  picture_path?: string[];
};

type AuthError = {
  message?: string;
};

export const Create = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
    description: "",
    dxf: null,
    dxfImage: null,
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<ErrorProps>({});
  const [authError, setAuthError] = useState<AuthError>({});
  const [authErrorDisplay, setAuthErrorDisplay] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
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
      .post(`${apiUrl}upload_file`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("File Uploaded Successfully", response.data);
        setFormData({ title: "", description: "", dxf: null, dxfImage: null });
        setSuccess(true);
      })
      .catch((error) => {
        if (error.status === 422) {
          // console.log(error);
          setError(error.response.data.errors);
        } else {
          setAuthErrorDisplay(true);
          setAuthError(error.response.data);
        }
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
        <div className="card shadow-lg">
          <div className="card-body">
            <h5 className="card-title">Create New Dxf</h5>
            {authErrorDisplay && (
              <div className="justify-content-center">
                <div className="alert alert-danger" role="alert">
                  {authError.message}
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
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
                  className={`${error.title ? "is-invalid" : ""} bg-light`}
                />
                {error && error.title && (
                  <Form.Control.Feedback type="invalid">
                    {error.title[0]}
                  </Form.Control.Feedback>
                )}
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  className="mb-3 bg-light"
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
                <Form.Label className="fw-semibold">
                  Choose a dxf file
                </Form.Label>
                <Form.Control
                  className={`${error.dxf_path ? "is-invalid" : ""} bg-light`}
                  accept=".dxf"
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dxf: (e.target as HTMLInputElement).files![0],
                    })
                  }
                />
                {error && error.dxf_path && (
                  <Form.Control.Feedback type="invalid">
                    {error.dxf_path[0]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="fw-semibold">
                  Choose a picture of the selected dxf file
                </Form.Label>
                <Form.Control
                  className={`${
                    error.picture_path ? "is-invalid" : ""
                  } bg-light`}
                  accept="image/*"
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dxfImage: (e.target as HTMLInputElement).files![0],
                    })
                  }
                />
                {error && error.picture_path && (
                  <Form.Control.Feedback type="invalid">
                    {error.picture_path[0]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Button className="btn btn-dark" type="submit">
                Save File
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
