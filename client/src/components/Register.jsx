import React from 'react'

const Register = (props) => {
  return (
    <form onSubmit={props.handleRegister}>
      <input
        onChange={props.handleChange}
        type="text"
        name="name"
        placeholder="Name"
        required
        value={props.name}
      />
      <input
        onChange={props.handleChange}
        type="email"
        name="email"
        placeholder="Email"
        value={props.email}
        required />
      <input
        onChange={props.handleChange}
        type="password"
        name="password"
        value={props.password}
        required />
      <button>Create User</button>
    </form>
  )
}

export default Register;