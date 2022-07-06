import { userService } from '../../services/user.service.js'

export function loadUsers() {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      throw err
    }
  }
}

export function onLogin(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.login(credentials)
      dispatch({
        type: 'SET_USER',
        user,
      })
    } catch (err) {
      throw err
    }
  }
}

export function onSignup(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(credentials)
      dispatch({
        type: 'SET_USER',
        user,
      })
      return user
    } catch (err) {
      throw err
    }
  }
}

export function onLogout() {
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({
        type: 'SET_USER',
        user: null,
      })
    } catch (err) {
      throw err
    }
  }
}
