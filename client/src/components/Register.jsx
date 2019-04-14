import React from 'react'
import { FormControl, Form, Button, Alert } from 'react-bootstrap';

const Register = (props) => {
  return (
    <Form
      className="register-form"
      onSubmit={props.handleRegister}>
      {
        props.errorMessage &&
        <Alert variant="danger">{props.errorMessage}</Alert>
      }
      <FormControl
        onChange={props.handleChange}
        type="text"
        name="name"
        placeholder="Name"
        required
        autoComplete="off"
        value={props.name}
      />
      <FormControl
        onChange={props.handleChange}
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="off"
        value={props.email}
        required />
      <FormControl
        onChange={props.handleChange}
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="off"
        value={props.password}
        required />
      <Button onClick={props.handleRegister} variant="dark">Create User</Button>
    </Form>
  )
}

export default Register;