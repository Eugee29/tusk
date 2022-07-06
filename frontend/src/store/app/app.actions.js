export const setModal = (modal) => {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_MODAL', modal })
  }
}
