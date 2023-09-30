import { Navbar, Nav } from 'react-bootstrap';
import logo from './images/new_logo.png';
import React, { useState, useEffect } from 'react';






const ValidateToken = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 


    useEffect(() => {
      let ignore = false;

      async function checkAuth() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/home/validate_token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!ignore) {
          if (response.status === 200) {
            setIsAuthenticated(true);
          }
          setIsLoading(false);
          console.log(response);
        }
      }

      checkAuth();
      return () => { ignore = true; };
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }
    else if (isAuthenticated) {
      return true;
    }
    else {
      return false;
    }
  }



function NavigationBar(props) {
  const handleLogout = async () => {

    localStorage.removeItem('token');
    window.location.href = "/poster";
 
  };
  return (
    <Navbar bg="light" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            width="100%"
            height="75"
            className="d-inline-block align-text-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
        {ValidateToken()? (
          <Nav className="me-auto">
          <Nav.Link href="/">Student Research Poster Competition - 2023</Nav.Link>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/">Rubric</Nav.Link>
          <Nav.Link href="/poster">Score Entry Page</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
  ) : (
       <Nav className="me-auto">
            <Nav.Link href="/">Student Research Poster Competition - 2023</Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>
          </Nav>
          )}
        
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavigationBar;
