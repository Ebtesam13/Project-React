import React, { useState } from 'react';
import { Container, Card, Form, Button, FormGroup, FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!input.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    }

    if (!input.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleLogin = (user) => {
    localStorage.setItem('LoggedIn', JSON.stringify(true));
    localStorage.setItem('UserId', JSON.stringify(user.id));
    if (input.rememberMe) {
      localStorage.setItem('RememberMe', JSON.stringify(true));
    } else {
      localStorage.removeItem('RememberMe');
    }
    alert('Login successful');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userEmail = input.email.trim().toLowerCase(); // Ensure lowercase and no spaces
      const userPassword = input.password.trim(); // Ensure no spaces
      console.log('User email:', userEmail);
      console.log('User password:', userPassword);
  
      const usersData = JSON.parse(localStorage.getItem('users')) || []; // Parse the array of objects
      console.log('Stored users data:', usersData);
  
      const foundUser = usersData.find((user) => user.email === userEmail && user.password === userPassword);
      console.log('Found user:', foundUser);
  
      if (foundUser) {
        handleLogin(foundUser); // Pass the foundUser object to handleLogin function
      } else {
        navigate('/SignIn');
        alert('Invalid email or password');
      }
    }
  };
  
  
  return (
    <Container fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'></div>
      <Card className='m-5' style={{ maxWidth: '600px' }}>
        <Card.Body className='px-5'>
          <h2 className="text-center mb-5 gradient-custom-4"> Log in</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-4'>
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                size='lg'
                type='email'
                id='form2'
                name='email'
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                size='lg'
                type='password'
                id='form3'
                name='password'
                value={input.password}
                onChange={(e) => setInput({ ...input, password: e.target.value })}
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </Form.Group>

            <FormGroup className='mb-4'>
              <FormCheck
                type='checkbox'
                label='Remember Me'
                checked={input.rememberMe}
                onChange={(e) => setInput({ ...input, rememberMe: e.target.checked })}
              />
            </FormGroup>

            <Button type='submit' className='mb-4 w-100 gradient-custom-4' size='lg'>
              Log in
            </Button>

            {/* Sign Up link */}
            <p className="text-center mb-0">
              Don't have an account? <a href="./SignUp">Sign Up</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignIn;
