import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'

export const AttachmentDelete = ({ deleteAttachment }) => {
  const dispatch = useDispatch()

  const onDeleteAttachment = () => {
    dispatch(setModal(null))
    deleteAttachment()
  }

  return (
    <section className="attachment-delete">
      <p className="warning-msg">Deleting an attachment is permanent. There is no undo.</p>
      <button className="delete-btn" onClick={onDeleteAttachment}>
        Delete
      </button>
    </section>
  )
}
