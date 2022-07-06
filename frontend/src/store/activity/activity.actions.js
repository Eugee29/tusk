export const setAction = () => {
  return (dispatch) => {
    dispatch({ type: 'SET_ACTIVITY', activity })
  }
}
