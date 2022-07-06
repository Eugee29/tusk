import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { utilService } from '../services/util.service'

import { TaskPreviewIcons } from './group/task-preview-icons'

export const ArchivedPreview = ({ task, groupId, index, board, onUpdateBoard }) => {
  const navigate = useNavigate()
  const [updatedTask, setUpdatedTask] = useState(task)
  const taskRef = useRef()

  const onOpenDetails = (ev) => {
    ev.stopPropagation()
    navigate(`${groupId}/${task.id}`)
  }

  const getTaskStyle = (isQuick) => {
    if (task.style) {
      if (task.style.imgURL && task.style.isCover) {
        return { backgroundImage: `url(${task.style.imgURL})` }
      }
      if (task.style.bgColor) {
        if (isQuick) return { borderTop: `32px solid ${task.style.bgColor}` }

        if (!task.style.isCover) {
          return { borderTop: `32px solid ${task.style.bgColor}` }
        } else {
          return { backgroundColor: `${task.style.bgColor}` }
        }
      }
    } else return ''
  }

  const getTaskClass = (isQuick) => {
    if (task.style) {
      if (task.style.bgColor && task.style.isCover) {
        if (!isQuick) return 'task-preview styled'
        else return 'task-preview color-header'
      } else if (task.style.bgColor && !task.style.isCover) {
        return 'task-preview color-header'
      } else if (task.style.imgURL && task.style.isCover) {
        return 'task-preview styled img'
      } else if (task.style.imgURL && !task.style.isCover) {
        return 'task-preview img-header'
      }
      return 'task-preview'
    }
  }

  const getChecklistLength = () => {
    const todosLength = task.checklists.reduce((acc1, checklist) => (acc1 += checklist.todos.length), 0)
    const doneLength = task.checklists.reduce((acc2, checklist) => (acc2 += getDoneTodos(checklist)), 0)
    const activeCount = doneLength + '/' + todosLength
    return activeCount
  }

  const getDoneTodos = (checklist) => {
    let doneTodos = checklist.todos.filter((todo) => todo.isDone)
    return doneTodos.length
  }

  const getTimeStyle = () => {
    var dateFormat = utilService.getDateTimeFormat(task.dueDate)
    if (task?.isComplete && task.isComplete) {
      dateFormat.statusDate = 'complete'
    }

    if (dateFormat.statusDate === '') return { backgroundColor: '', color: '#505f79' }
    if (dateFormat.statusDate === 'overdue') return { backgroundColor: '#EB5A46', color: '#ffff' }
    if (dateFormat.statusDate === 'duesoon') return { backgroundColor: '#F2D600', color: '#ffff' }
    if (dateFormat.statusDate === 'complete') return { backgroundColor: '#61BD4F', color: '#ffff' }
  }

  const OnSentToBoard = () => {
    const newTask = { ...updatedTask }
    newTask.archivedAt = null

    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex((groupTask) => groupTask.id === task.id)
    board.groups[groupIdx].tasks[taskIdx] = newTask

    setUpdatedTask(newTask)
    onUpdateBoard({ ...board })
  }

  const OnDelete = () => {
    let newTask = { ...updatedTask }
    newTask = null

    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex((groupTask) => groupTask.id === task.id)
    board.groups[groupIdx].tasks.splice(taskIdx, 1)

    setUpdatedTask(newTask)
    onUpdateBoard(board)
  }

  return (
    <div className="task-preview-handle">
      <div ref={taskRef}>
        <section className={`${getTaskClass()}`} onClick={onOpenDetails} style={getTaskStyle()}>
          {!task.style.isCover && task.style.imgURL && (
            <img className="task-img-container" src={task.style.imgURL} alt="..." />
          )}
          <div className="task-info">
            <div className="task-title-container">
              <h2 className="task-title"> {task.title} </h2>
            </div>

            <TaskPreviewIcons
              task={task}
              board={board}
              getTimeStyle={getTimeStyle}
              getChecklistLength={getChecklistLength}
              onUpdateBoard={onUpdateBoard}
            />
          </div>
        </section>
      </div>

      <div className="edit">
        <span className="button-att" onClick={OnSentToBoard}>
          Send to board
        </span>
        <span>
          {/* eslint-disable-next-line */}
          <a className="button-att" onClick={OnDelete}>
            <span className="button-att">Delete</span>
          </a>
        </span>
      </div>
    </div>
  )
}
