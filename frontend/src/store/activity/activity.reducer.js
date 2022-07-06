const initialState = {
  activity: null,
}

export function activityReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVITY':
      return { ...state, activity: action.activity }
    default:
      return state
  }
}
