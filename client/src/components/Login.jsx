import React from 'react'
import { FormControl, Form, Button } from 'react-bootstrap';

const Login = (props) => {
  return (
    <Form onSubmit={props.handleLogin}>
      <FormControl
        onChange={props.handleChange}
        type="email"
        name="email"
        placeholder="Email"
        value={props.email}
        required />
      <FormControl
        onChange={props.handleChange}
        type="password"
        name="password"
        value={props.password}
        required />
      <Button onClick={props.handleLogin} variant="dark">Login</Button>
    </Form>
  )
}

export default Login;