import { Container, Nav, Navbar } from "react-bootstrap";
import { FaBell, FaSearch } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

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
          <Nav.Link className="fw-semibold" to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <div className="input-group rounded">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <FaSearch />
          </span>
        </div>
        <FaBell className="mx-3" size={24} />
        <RiLoginBoxFill size={24} />
      </Container>
    </Navbar>
  );
};

export default NavbarBs;
