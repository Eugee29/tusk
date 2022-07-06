const initialState = {
  filterBy: { keyword: '', memberIds: [], labelIds: [] },
}
export function boardReducer(state = initialState, action) {
  var newState = state

  switch (action.type) {
    case 'SET_FILTER_BY':
      newState = { ...state, filterBy: action.filterBy }
      break
    default:
  }
  return newState
}
