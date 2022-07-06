import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { onLogout } from '../../store/user/user.action'
import { setModal } from '../../store/app/app.actions'
import { Fragment } from 'react'
import { utilService } from '../../services/util.service'

export const AccountActions = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    dispatch(onLogout())
    dispatch(setModal(null))
    navigate('/')
  }

  const sendToLoginSignup = (path) => {
    dispatch(setModal(null))
    navigate(path)
  }

  return (
    <section className="account-actions">
      <div className="account-info">
        <div className="account-img-container">
          {user?.imgURL ? (
            <img src={user.imgURL} alt={user.fullName} className="account-img" />
          ) : (
            // eslint-disable-next-line
            <a className="account">{utilService.getInitials(user.fullname)}</a>
          )}
        </div>
        <div className="credentials">
          <h2 className="fullname">{user.fullname}</h2>
          <h3 className="username">{user.username}</h3>
        </div>
      </div>
      <hr />
      {user._id === '1' ? (
        <Fragment>
          <button className="login-btn" onClick={() => sendToLoginSignup('/login')}>
            Log in
          </button>
          <button className="signup-btn" onClick={() => sendToLoginSignup('/signup')}>
            Sign up
          </button>
        </Fragment>
      ) : (
        <button className="logout-btn" onClick={logoutUser}>
          Log out
        </button>
      )}
    </section>
  )
}
