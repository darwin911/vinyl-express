import React from 'react'

const Login = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
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
      <button>Login</button>
    </form>
  )
}

export default Login;