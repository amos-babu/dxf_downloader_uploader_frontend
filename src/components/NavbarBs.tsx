import { Container, Nav, Navbar } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import SearchFile from "./SearchFile";
import { MdLogin } from "react-icons/md";

const NavbarBs = () => {
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
        <Link className="text-decoration-none" to="/login">
          <MdLogin size={24} />
        </Link>
      </Container>
    </Navbar>
  );
};

export default NavbarBs;
