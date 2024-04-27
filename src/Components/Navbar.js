import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavbarComponent = (props) => {
  const LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));

  const handleLogout = () => {
    localStorage.removeItem('LoggedIn');
    localStorage.removeItem('UserId');
  };

  return (
    <Navbar style={{ backgroundColor: 'skyblue', color: 'white', fontSize: '20px' }} variant="dark" expand="lg">
      <Navbar.Brand href="" className='p-2' style={{ fontSize: '30px' }}> Shopping</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-center" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/Cart">
            <div className="d-flex flex-column align-items-center">
              <span>{props.size}</span>
              <span>
                <i className='fas fa-cart-plus' style={{ color: 'white', fontSize: '24px' }}></i>
              </span>
            </div>
          </Nav.Link>
          <Nav.Link href="/Favorite">
            <i className='fas fa-heart' style={{ color: 'white', fontSize: '24px', marginLeft: '10px' }}></i>
          </Nav.Link>
          {LoggedIn ? (
            <Nav.Link onClick={handleLogout} href='/SignIn'>Log out</Nav.Link>
          ) : (
            <Nav.Link href='/SignIn'>Sign In/Sign Up</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
