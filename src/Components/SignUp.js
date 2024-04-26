import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!input.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!input.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    } else {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = existingUsers.find(user => user.email === input.email);
      if (foundUser) {
        errors.email = 'Email is already taken';
        isValid = false;
      }
    }

    if (!input.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (input.password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser = { id: Date.now(), name: input.name, email: input.email , password:input.password };
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      navigate('/SignIn');
    }
  };

  return (
    <Container fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'></div>
      <Card className='m-5' style={{ maxWidth: '600px' }}>
        <Card.Body className='px-5'>
          <h2 className="text-center mb-5 gradient-custom-4">Create an account</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-4'>
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                size='lg'
                type='text'
                id='form1'
                name='name'
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </Form.Group>
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
            <Button type='submit' className='mb-4 w-100 gradient-custom-4' size='lg'>Register</Button>
            <p className="text-center mb-0">Already have an account? <a href="./SignIn">Sign In</a></p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignUp;
