import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      bg="white"
      expand="sm"
      className="flex-shrink-0 navbar-light"
    >
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Shop
          </Nav.Link>
        </Nav>
        <Nav className="ml-100">
          <Nav.Link as={Link} to="/cart">
            Shopping Cart
          </Nav.Link>
        </Nav>
        <Nav className="ml-100">
          <Nav.Link as={Link} to="/history">
            History
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
