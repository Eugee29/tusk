import { useDispatch } from 'react-redux'
import { setModal } from '../../store/app/app.actions'

export const TaskDelete = ({ deleteTask }) => {
  const dispatch = useDispatch()

  const onDeleteTask = () => {
    dispatch(setModal(null))
    deleteTask()
  }

  return (
    <section className="task-delete">
      <p className="warning-msg">
        All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.
      </p>
      <button className="delete-btn" onClick={onDeleteTask}>
        Delete
      </button>
    </section>
  )
}
