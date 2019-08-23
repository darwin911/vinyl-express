import React from 'react';
import { FormControl, Form, Alert } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';

const Login = ({
  handleLogin,
  errorMessage,
  handleChange,
  email,
  password,
  isLoading
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
      <Button onClick={handleLogin} variant='dark' loading={isLoading}>
        Login
      </Button>
    </Form>
  );
};

export default Login;
