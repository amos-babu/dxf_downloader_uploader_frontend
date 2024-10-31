import { Container, Nav, Navbar } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import SearchFile from "./SearchFile";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";

const NavbarBs = () => {
  const { logout, loggedIn } = useAuth();
  const handleLogout = () => {
    axios
      .post(`http://127.0.0.1:8000/api/logout`)
      .then((res) => {
        logout();
      })
      .catch((err) => {
        console.log("Error fetching user data:", err);
      });
  };
  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link className="fw-semibold" to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link className="fw-semibold" to="/create" as={NavLink}>
            Create
          </Nav.Link>
        </Nav>
        <SearchFile />
        <FaBell className="mx-3" size={24} />
        {loggedIn ? (
          <div className="text-decoration-none mx-1" onClick={handleLogout}>
            <div className="btn btn-sm btn-outline-danger">Logout</div>
          </div>
        ) : (
          <>
            <Link className="text-decoration-none mx-1" to="/login">
              <div className="btn btn-sm btn-outline-primary">Login</div>
            </Link>
            <Link className="text-decoration-none mx-1" to="/register">
              <div className="btn btn-sm btn-outline-primary">Register</div>
            </Link>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarBs;
