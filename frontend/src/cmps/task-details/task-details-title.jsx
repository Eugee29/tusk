import { useRef, useState } from 'react'

import { CgCreditCard } from 'react-icons/cg'

export function TaskDetailsTitle({ task, groupTitle, updateTask }) {
  const [taskTitle, setTaskTitle] = useState(task.title)

  const inputRef = useRef()

  const handleChange = ({ target }) => {
    setTaskTitle(target.value)
  }

  const onSaveTitle = (e) => {
    e.preventDefault()
    inputRef.current.blur()
    updateTask({ ...task, title: taskTitle })
  }

  return (
    <header className="task-details-title">
      <span>
        <CgCreditCard />
      </span>
      <form onSubmit={onSaveTitle}>
        <input
          className="main-title"
          ref={inputRef}
          value={taskTitle}
          onChange={handleChange}
          onBlur={onSaveTitle}
          onFocus={() => inputRef.current.select()}
        />
      </form>
      <div className="sub-title">
        in group<button>{groupTitle}</button>
      </div>
    </header>
  )
}
