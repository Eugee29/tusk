import { userService } from '../../services/user.service.js'

const guestUser = {
  _id: '1',
  fullname: 'Guest',
  username: 'guest@gmail.com',
  imgURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
}

const initialState = {
  user: userService.getLoggedinUser() || guestUser,
  users: [],
}
export function userReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case 'SET_USER':
      newState = { ...state, user: action.user ? action.user : guestUser }
      break
    case 'SET_USERS':
      newState = { ...state, users: action.users }
      break
    default:
  }
  return newState
}
