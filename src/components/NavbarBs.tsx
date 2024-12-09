import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import SearchFile from "./SearchFile";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";
import { IoPersonCircle } from "react-icons/io5";

type NavProps = {
  logoutNotification: (message: string) => void;
};

const NavbarBs = ({ logoutNotification }: NavProps) => {
  const { logout, loggedIn, profileData } = useAuth();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        logoutNotification(res.data.message);
        logout();
      })
      .catch((err) => {
        console.log("Error fetching user data:", err);
      });
  };
  return (
    <Navbar sticky="top" className="bg-white mb-3">
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
          <>
            <Dropdown>
              <Dropdown.Toggle as="span" id="dropdown-custom-components">
                {profileData?.profile_pic_path ? (
                  <img
                    src={profileData?.profile_pic_path}
                    className="rounded-circle"
                    style={{ width: "40px", cursor: "pointer" }}
                    alt="Avatar"
                  />
                ) : (
                  <IoPersonCircle
                    className="rounded-circle"
                    style={{ cursor: "pointer" }}
                    size={40}
                  />
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="shadow"
                style={{ right: 0, left: "auto" }}
              >
                <Dropdown.Item
                  as={Link}
                  className="text-decoration-none"
                  to="/profile"
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Link className="text-decoration-none mx-1" to="/login">
              <div style={{ width: "5rem" }} className="btn btn-sm btn-dark">
                Login
              </div>
            </Link>
            <Link
              className="text-decoration-none mx-1 text-dark"
              to="/register"
            >
              <div style={{ width: "5rem" }}>Register</div>
            </Link>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarBs;
