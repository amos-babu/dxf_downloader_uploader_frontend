import axios from "axios";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

type FormDataProps = {
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
};

type ErrorProps = {
  name?: string[];
  email?: string[];
  username?: string[];
  password?: string[];
};

type RegisterProps = {
  logoutNotification: (message: string) => void;
};
const Register = ({ logoutNotification }: RegisterProps) => {
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState<ErrorProps>({});
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const submitRegisterForm = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}register`, formData)
      .then((res) => {
        const token = res.data.token;
        const tokenExpiryDate = res.data.token_expires_at;
        localStorage.setItem("token", token);
        localStorage.setItem("token_expiry_date", tokenExpiryDate);
        logoutNotification("Registration Successfull");
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          setError(err.response.data.errors);
        }
      });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <Card className="shadow mt-1">
          <Card.Body>
            <Card.Title className="text-center mb-4">REGISTER</Card.Title>
            <form onSubmit={submitRegisterForm}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`form-control bg-white ${
                    error.name ? "is-invalid" : ""
                  }`}
                  id="name"
                  placeholder="name"
                  autoComplete="name"
                />
                <label htmlFor="floatingInput">Name</label>
                {error.name && (
                  <div className="text-danger">{error.name[0]}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`form-control bg-white ${
                    error.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  placeholder="email"
                  autoComplete="email"
                />
                <label htmlFor="floatingInput">Email</label>
                {error.email && (
                  <div className="text-danger">{error.email[0]}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className={`form-control bg-white ${
                    error.username ? "is-invalid" : ""
                  }`}
                  id="username"
                  placeholder="username"
                  autoComplete="username"
                />
                <label htmlFor="floatingInput">Username</label>
                {error.username && (
                  <div className="text-danger">{error.username[0]}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`form-control bg-white ${
                    error.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="password"
                  autoComplete="password"
                />
                <label htmlFor="floatingInput">Password</label>
                {error.password && (
                  <div className="text-danger">{error.password[0]}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password_confirmation: e.target.value,
                    })
                  }
                  className={"form-control bg-white"}
                  id="password_confirmation"
                  placeholder="password_confirmation"
                  autoComplete="password_confirmation"
                />
                <label htmlFor="floatingInput">Confirm Password</label>
              </div>
              <div>
                <h6>
                  Have an account ?
                  <span className="ms-2">
                    <Link
                      className="text-decoration-none text-dark"
                      to={`/login`}
                    >
                      Sign In
                    </Link>
                  </span>
                </h6>
              </div>
              <br />
              <button type="submit" className="btn btn-outline-dark">
                Register
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Register;
