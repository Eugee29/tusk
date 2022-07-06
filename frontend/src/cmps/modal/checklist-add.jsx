import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { boardService } from '../../services/board.service'

import { setModal } from '../../store/app/app.actions'

export const ChecklistAdd = ({ updateTask, task }) => {
  const [title, setTitle] = useState('Checklist')
  const dispatch = useDispatch()
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.select()
  }, [])

  const handleChange = ({ target }) => {
    setTitle(target.value)
  }

  const onAddChecklist = (e) => {
    if (!task.checklists) task.checklists = []
    e.preventDefault()
    dispatch(setModal(null))
    const newChecklist = boardService.getEmptyChecklist()
    newChecklist.title = title
    const updatedTask = { ...task, checklists: [newChecklist, ...task.checklists] }
    const activity = {
      actionType: 'add checklist',
      checklist: { title: newChecklist.title },
    }
    updateTask(updatedTask, activity)
  }

  return (
    <form className="checklist-add" onSubmit={onAddChecklist}>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" ref={inputRef} value={title} onChange={handleChange} autoFocus />
      <button className="btn-primary" onClick={onAddChecklist}>
        Add
      </button>
    </form>
  )
}
