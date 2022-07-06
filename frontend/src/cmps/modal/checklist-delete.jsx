import { useDispatch } from 'react-redux'
import { setModal } from '../../store/app/app.actions'

export const ChecklistDelete = ({ deleteChecklist }) => {
  const dispatch = useDispatch()

  const onDeleteChecklist = () => {
    dispatch(setModal(null))
    deleteChecklist()
  }

  return (
    <section className="checklist-delete">
      <p className="warning-msg">Deleting a checklist is permanent and there is no way to get it back.</p>
      <button className="delete-btn" onClick={onDeleteChecklist}>
        Delete checklist
      </button>
    </section>
  )
}
