import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../helpers/AuthContext";
import styles from "../styles/app.module.css";

const AppNavbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false);
    navigate("/login"); 
  };

  return (
    <Navbar variant="dark" expand="lg" className="p-3" style={{ backgroundColor: '#121212' }}>
      <Navbar.Brand as={Link} to="/">Apply Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>

          {!isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          )}

          {isAuthenticated && (
            <>
            <Nav.Link as={Link} to="/applications">My Applications</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={handleLogout}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
