import React from "react";
import { FormControl, Form, Button, Alert } from "react-bootstrap";

const Register = ({
  handleRegister,
  handleChange,
  email,
  name,
  password,
  errorMessage
}) => {
  return (
    <Form className="register-form" onSubmit={handleRegister}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <FormControl
        onChange={handleChange}
        type="text"
        name="name"
        placeholder="Name"
        required
        autoComplete="off"
        value={name}
      />
      <FormControl
        onChange={handleChange}
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="off"
        value={email}
        required
      />
      <FormControl
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="off"
        value={password}
        required
      />
      <Button onClick={handleRegister} variant="dark">
        Register
      </Button>
    </Form>
  );
};

export default Register;
