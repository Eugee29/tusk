import React, { useState } from 'react'

export const SignupForm = ({ onSignup }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })

  const handleChange = (ev) => {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  const signup = (ev = null) => {
    if (!credentials.username || !credentials.password || !credentials.fullname) return
    if (ev) {
      ev.preventDefault()
      ev.stopPropagation()
    }
    onSignup(credentials)
    clearState()
  }

  const clearState = () => {
    setCredentials({
      username: '',
      password: '',
      fullname: '',
    })
  }

  return (
    <form className="user-signup" onSubmit={signup}>
      <h1>Sign up for your account</h1>
      <input
        type="email"
        name="username"
        placeholder="Enter email"
        value={credentials.username}
        onChange={handleChange}
        required
        autoFocus
      />
      <input
        type="text"
        name="fullname"
        placeholder="Enter full name"
        value={credentials.fullname}
        autoComplete="username"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={credentials.password}
        autoComplete="current-password"
        onChange={handleChange}
        required
      />
      <button className="signup-btn">Sign up</button>
    </form>
  )
}
