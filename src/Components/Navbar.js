import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';



const NavbarComponent = (props) => {


const LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));
console.log(LoggedIn);

  const handleLogout = () => {
    localStorage.removeItem('LoggedIn'); 
    localStorage.removeItem('UserId'); 

    Link('/SignIn'); 
  };
  

    return (

        <Navbar style={{ backgroundColor: 'skyblue' , color:'white' , fontSize:'20px' }} variant="dark" expand="lg">
            <Navbar.Brand href="" className='p-2' style={{ fontSize: '30px' }}> Shopping</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"className="text-center"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/Favorite">Favorite</Nav.Link>
                    <Nav.Link href="/Cart" className='text-end'>
                        <div className="d-flex flex-column align-items-center">
                            <span>{props.size}</span>
                            <span>
                                <i className='fas fa-cart-plus' style={{ color: 'white', fontSize: '24px' }}></i>
                            </span>
                        </div>
                    </Nav.Link>
                    
                    {LoggedIn && <Nav.Link onClick={handleLogout} href='/SignIn'>Log out</Nav.Link>}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
