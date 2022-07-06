import React, { useState } from 'react'

export const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleChange = (ev) => {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  const login = (ev) => {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password) return
    onLogin(credentials)
    clearState()
  }

  const clearState = () => {
    setCredentials({
      username: '',
      password: '',
    })
  }
  return (
    <form className="user-login" onSubmit={login}>
      <h1>Log in to Tusk</h1>
      <input
        type="email"
        placeholder="Enter email"
        name="username"
        value={credentials.username}
        autoComplete="username"
        onChange={handleChange}
        required
        autoFocus
      />
      <input
        type="password"
        placeholder="Enter password"
        name="password"
        value={credentials.password}
        autoComplete="password"
        onChange={handleChange}
        required
      />
      <button className="login-btn">Log in</button>
    </form>
  )
}
