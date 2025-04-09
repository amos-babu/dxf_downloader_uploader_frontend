import axios from "axios";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

type FormDataProps = {
  email: string;
  password: string;
};

type ErrorProps = {
  email?: string[];
  password?: string[];
};

type LoginProps = {
  logoutNotification: (message: string) => void;
};

const Login = ({ logoutNotification }: LoginProps) => {
  const [formData, setFormData] = useState<FormDataProps>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorProps>({});
  const { login } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const submitLoginForm = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}login`, formData)
      .then((res) => {
        const token = res.data.token;
        const tokenExpiryDate = res.data.token_expires_at;
        localStorage.setItem("token_expiry_date", tokenExpiryDate);
        // console.log(res.data);
        login(token, tokenExpiryDate);

        logoutNotification("Login Successfull!");
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          setError(err.response.data.errors);
        }
        // console.log(err.response.data.message);
        // message = {
        //   message: "Pasword does not match email",
        // };
        // setError(message);
      });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <Card className="shadow mt-1">
          <Card.Body>
            <Card.Title className="text-center mb-4">LOGIN</Card.Title>
            <form onSubmit={submitLoginForm}>
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
              <div>
                <h6>
                  Don't have an account?
                  <span className="ms-2">
                    <Link
                      className="text-decoration-none text-dark"
                      to={`/register`}
                    >
                      Register
                    </Link>
                  </span>
                </h6>
              </div>
              <br />
              <button type="submit" className="btn btn-outline-dark">
                Login
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
