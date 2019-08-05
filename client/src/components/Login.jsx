import React from 'react';
import { FormControl, Form, Button, Alert } from 'react-bootstrap';

const Login = ({
  handleLogin,
  errorMessage,
  handleChange,
  email,
  password
}) => {
  return (
    <Form className='login-form' onSubmit={handleLogin}>
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
      <FormControl
        onChange={handleChange}
        type='email'
        name='email'
        placeholder='Email'
        value={email}
        autoComplete='off'
        required
      />
      <FormControl
        onChange={handleChange}
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        autoComplete='off'
        required
      />
      <Button onClick={handleLogin} variant='dark'>
        Login
      </Button>
    </Form>
  );
};

export default Login;
