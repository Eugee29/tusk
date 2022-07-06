import { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setModal } from '../store/app/app.actions'
import { utilService } from '../services/util.service'

import logoLight from '../assets/imgs/logo-horizontal-white.png'
import logoDark from '../assets/imgs/logo-horizontal-dark.png'

export const AppHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useSelector(({ userModule }) => userModule)
  const { pathname } = useLocation()
  const profileRef = useRef()
  const createRef = useRef()
  const dispatch = useDispatch()

  const isHome = pathname === '/'

  useEffect(() => {
    if (isHome) window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [isHome])

  const checkScroll = () => {
    if (window.pageYOffset > 0) return setIsScrolled(true)
    setIsScrolled(false)
  }

  if (pathname === '/login' || pathname === '/signup') return

  const isBoard = pathname.includes('/board')

  const getClassName = () => {
    let className
    if (isHome) {
      className = 'home'
      if (window.pageYOffset > 0) className += ' scrolled'
      return className
    }
    if (isBoard) className = 'board'
    else className = 'general'
    return className
  }

  const onOpenModal = (ev, modal) => {
    ev.preventDefault()
    dispatch(setModal(modal))
  }

  const onModal = (category) => {
    dispatch(
      setModal({
        element: createRef.current,
        category,
        title: category,
        position: utilService.getPosition(createRef.current),
      })
    )
  }

  return (
    <header className={`app-header ${getClassName()} ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="link-container">
        <div className="logo-container">
          <Link to="/">
            {isHome ? (
              <img src={logoDark} alt="tusk-logo" className="logo" />
            ) : (
              <img src={logoLight} alt="tusk-logo" className="logo smaller" />
            )}
          </Link>
        </div>
        {!isHome && (
          <Link className="workspace-link" to="/workspace">
            Workspaces
          </Link>
        )}
        {!isHome && (
          <div
            className="workspace-create"
            ref={createRef}
            onClick={(ev) => {
              ev.stopPropagation()
              onModal('Create board')
            }}
          >
            Create
          </div>
        )}
      </nav>
      {isHome && (
        <nav className="login-signup-container">
          <Link to="/login" className="login">
            Log in
          </Link>
          <Link to="/signup" className="signup">
            Sign up
          </Link>
        </nav>
      )}
      {!isHome && (
        <div
          className="user-img-container"
          ref={profileRef}
          onClick={(ev) =>
            onOpenModal(ev, {
              category: 'account-actions',
              title: 'Account',
              element: profileRef.current,
              props: { user },
            })
          }
        >
          {user &&
            (user?.imgURL ? (
              <span className="user-img" style={{ backgroundImage: `url('${user.imgURL}')` }}></span>
            ) : (
              <span className="user-initial">{utilService.getInitials(user.fullname)}</span>
            ))}
          {!user && <span className="user-initial"></span>}
        </div>
      )}
    </header>
  )
}
