import React from 'react'
import PropTypes from 'prop-types'

const Login = (props) => {

  Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  return (
    <form onSubmit={props.handleLogin}>
      <h2>Log in to application</h2>
      <div>
            username:
        <input
          id="username"
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)} />
      </div>
      <div>
            password:
        <input
          id="password"
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)} />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default Login