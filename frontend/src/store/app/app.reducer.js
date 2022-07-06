const initialState = {
  modal: null,
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return { ...state, modal: action.modal }
    default:
      return state
  }
}
