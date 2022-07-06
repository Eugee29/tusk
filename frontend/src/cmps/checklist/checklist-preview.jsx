import { useRef, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { boardService } from '../../services/board.service'
import { utilService } from '../../services/util.service'

import { setModal } from '../../store/app/app.actions'

import { FiCheckSquare } from 'react-icons/fi'
import { VscClose } from 'react-icons/vsc'

import { TodoList } from './todo-list'

export const ChecklistPreview = ({ checklist, updateChecklist, checklists, updateTask, task }) => {
  const [hideChecked, setHideChecked] = useState(false)
  const [todoTxt, setTodoTxt] = useState('')
  const [checklistTitle, setChecklistTitle] = useState(checklist.title)
  const [isAdding, setIsAdding] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()
  const deleteRef = useRef()

  const numOfDone = checklist.todos.reduce((count, todo) => (todo.isDone ? count + 1 : count), 0)
  let progress = parseInt((numOfDone / checklist.todos.length) * 100)
  if (!checklist.todos.length) progress = 0

  const todosToShow = hideChecked ? checklist.todos.filter((todo) => !todo.isDone) : [...checklist.todos]
  const numOfChecked = checklist.todos.length - todosToShow.length
  const filteredChecklist = { ...checklist, todos: todosToShow }

  const handleChange = ({ target }) => {
    setTodoTxt(target.value)
  }

  const handleKeyDown = (ev) => {
    if (ev.code === 'Enter') {
      ev.preventDefault()
      if (!todoTxt) return
      onAddTodo()
    }
  }

  const onAddTodo = (ev) => {
    if (ev) ev.preventDefault()
    const todoToAdd = boardService.getEmptyTodo()
    todoToAdd.title = todoTxt
    const newChecklist = { ...checklist, todos: [...checklist.todos, todoToAdd] }
    updateChecklist(newChecklist)
    setTodoTxt('')
  }

  const onSaveTitle = (e) => {
    setIsEdit(false)
    const updatedChecklist = { ...checklist, title: checklistTitle }
    updateChecklist(updatedChecklist)
  }

  const onDiscardChanges = (e) => {
    setIsEdit(false)
    setChecklistTitle(checklist.title)
  }

  const openDeleteModal = (e) => {
    e.stopPropagation()
    dispatch(
      setModal({
        element: deleteRef.current,
        category: 'checklist-delete',
        title: `Delete ${checklist.title}?`,
        props: { deleteChecklist },
      })
    )
  }

  const handleTitleChange = (e) => {
    setChecklistTitle(e.target.value)
  }

  const deleteChecklist = () => {
    const updatedChecklists = checklists.filter((currChecklist) => checklist.id !== currChecklist.id)
    const activity = {
      actionType: 'delete checklist',
      checklist: { title: checklist.title },
    }
    updateTask({ ...task, checklists: updatedChecklists }, activity)
  }

  return (
    <li className="checklist-preview">
      <header>
        <div className="icon-container">
          <FiCheckSquare className="icon" />
        </div>
        <div className="inner-container">
          {isEdit ? (
            <div className="title-editor">
              <textarea value={checklistTitle} onChange={handleTitleChange} onBlur={() => setIsEdit(false)} autoFocus />
              <div className="controls">
                <div className="btn-container" onMouseDown={(e) => e.preventDefault()}>
                  <button className="save" onClick={onSaveTitle}>
                    Save
                  </button>
                  <button className="discard-container" onClick={onDiscardChanges}>
                    <VscClose className="discard" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <h3 className="title" onClick={() => setIsEdit(true)}>
              {checklist.title}
            </h3>
          )}
          <div className="header-btn-container">
            {!isEdit && (
              <div className="inner-btn-container">
                {!!progress && (
                  <button onClick={() => setHideChecked(!hideChecked)} className="btn-secondary">
                    {hideChecked ? `Show checked items (${numOfChecked})` : 'Hide checked items'}
                  </button>
                )}
                <button onClick={openDeleteModal} ref={deleteRef} className="btn-secondary">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="progress-bar-container">
        <h4 className="progress">{progress}%</h4>
        <ProgressBar
          now={progress}
          variant={progress === 100 ? 'green' : 'blue'}
          className="progress-bar"
        ></ProgressBar>
      </div>
      {!!filteredChecklist.todos?.length && (
        <TodoList filteredChecklist={filteredChecklist} checklist={checklist} updateChecklist={updateChecklist} />
      )}
      <div className="add-container">
        {!isAdding ? (
          <button className="open-add btn-secondary" onClick={() => setIsAdding(true)}>
            Add an item
          </button>
        ) : (
          <form onSubmit={onAddTodo}>
            <textarea
              className="todo-content"
              placeholder="Add an item"
              style={{ height: utilService.calcTextareaHeight(todoTxt, 56, 20) }}
              value={todoTxt}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={() => setIsAdding(false)}
              autoFocus
            ></textarea>
            <div className="add-controls">
              <button className="add-btn" onMouseDown={(e) => e.preventDefault()}>
                Add
              </button>
              <button className="cancel-btn" type="button">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </li>
  )
}
