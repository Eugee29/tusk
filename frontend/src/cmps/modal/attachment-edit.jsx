import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setModal } from '../../store/app/app.actions'

export const AttachmentEdit = ({ editAttachment, attachment }) => {
  const [fileName, setFileName] = useState(attachment.fileName)
  const inputRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => inputRef.current.select(), [])

  const handleChange = ({ target }) => {
    setFileName(target.value)
  }

  const onEditAttachment = (ev) => {
    ev.preventDefault()
    dispatch(setModal(null))
    editAttachment(fileName)
  }

  return (
    <section className="attachment-edit">
      <form onSubmit={onEditAttachment}>
        <label htmlFor="linkInput" className="input-label">
          Link name
        </label>
        <input
          id="linkInput"
          className="link-input"
          type="text"
          ref={inputRef}
          value={fileName}
          placeholder="Paste any link here..."
          onChange={handleChange}
          autoFocus
        />
        <button className="attach-btn">Update</button>
      </form>
    </section>
  )
}
