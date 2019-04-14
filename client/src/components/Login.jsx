import React from 'react'
import { FormControl, Form, Button, Alert } from 'react-bootstrap';

const Login = (props) => {
  console.log(props.errorMessage)
  return (
    <Form
      className="login-form"
      onSubmit={props.handleLogin}>
      {
        props.errorMessage &&
        <Alert variant="danger">{props.errorMessage}</Alert>
      }
      <FormControl
        onChange={props.handleChange}
        type="email"
        name="email"
        placeholder="Email"
        value={props.email}
        autoComplete="off"
        required />
      <FormControl
        onChange={props.handleChange}
        type="password"
        name="password"
        placeholder="Password"
        value={props.password}
        autoComplete="off"
        required />
      <Button onClick={props.handleLogin} variant="dark">Login</Button>
    </Form>
  )
}

export default Login;