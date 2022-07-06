import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { onLogin, onSignup } from '../../store/user/user.action.js'

import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'

export const LoginSignup = ({ type }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(false)
  }, [location])

  const signup = async (credentials) => {
    await dispatch(onSignup(credentials))
    navigate('/workspace')
  }

  const login = async (credentials) => {
    try {
      await dispatch(onLogin(credentials))
      navigate('/workspace')
    } catch (err) {
      setIsError(true)
    }
  }

  var cmp

  switch (type) {
    case 'login':
      cmp = <LoginForm onLogin={login} />
      break
    case 'signup':
      cmp = <SignupForm onSignup={signup} />
      break
    default:
      break
  }

  return (
    <div className="login-signup">
      {isError && (
        <div className="error-message">
          <p>Invalid username or password.</p>
        </div>
      )}
      {cmp}
      <div className="login-method">
        <div>OR</div>
        <button onClick={() => navigate('/workspace')}>Continue as Guest</button>
      </div>
      <hr />
      <footer>
        <Link to="/">Back home</Link>
        <Link to={type === 'login' ? '/signup' : '/login'}>{type === 'login' ? 'Sign up' : 'Log in'}</Link>
      </footer>
    </div>
  )
}
