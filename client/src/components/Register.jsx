import React from 'react'
import { FormControl, Form, Button } from 'react-bootstrap';

const Register = (props) => {
  return (
    <Form onSubmit={props.handleRegister}>
      <FormControl
        onChange={props.handleChange}
        type="text"
        name="name"
        placeholder="Name"
        required
        value={props.name}
      />
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
      <Button onClick={props.handleRegister} variant="dark">Create User</Button>
    </Form>
  )
}

export default Register;