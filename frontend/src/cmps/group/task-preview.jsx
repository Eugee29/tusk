import React, { useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useNavigate } from 'react-router-dom'

import { utilService } from '../../services/util.service'

import { RiPencilLine } from 'react-icons/ri'

import { LabelList } from './label-list'
import { QuickEdit } from '../quick-edit'
import { TaskPreviewIcons } from './task-preview-icons'

export const TaskPreview = ({ task, group, index, board, toggleLabels, isLabelsOpen, onUpdateBoard }) => {
  const navigate = useNavigate()
  const [isQuickEditOpen, setIsQuickEditOpen] = useState(false)
  const taskRef = useRef()

  const onOpenDetails = (ev) => {
    ev.stopPropagation()
    navigate(`${group.id}/${task.id}`)
  }

  const onToggleQuickEdit = (ev) => {
    ev.stopPropagation()
    toggleQuickEdit()
  }

  const toggleQuickEdit = () => {
    setIsQuickEditOpen(!isQuickEditOpen)
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

  const isIconsShown = () => {
    if (
      task.description ||
      (task.checklists && !!task.checklists.length) ||
      (task.attachments && !!task.attachments.length) ||
      (task.members && !!task.members.length)
    ) {
      return true
    } else return false
  }

  return (
    <Draggable draggableId={task.id} index={index} type="TASK">
      {(provided, snapshot) => (
        <div className="task-preview-handle" {...provided.draggableProps} {...provided.dragHandleProps}>
          <div ref={taskRef}>
            <section
              className={`${getTaskClass()} ${snapshot.isDragging && !snapshot.isDropAnimating ? 'tilted' : ''}`}
              onClick={onOpenDetails}
              ref={provided.innerRef}
              style={getTaskStyle()}
            >
              {!task.style.isCover && task.style.imgURL && utilService.getExtension(task.style.imgURL) === 'image' && (
                <img className="task-img-container" src={task.style.imgURL} alt="..." />
              )}

              {!task.style.isCover && task.style.imgURL && utilService.getExtension(task.style.imgURL) === 'video' && (
                <video muted controls>
                  <source src={task.style.imgURL} type="video/mp4"></source>
                </video>
              )}

              <div className="task-info">
                {!!task.labelIds.length && !task.style.isCover && (
                  <LabelList
                    board={board}
                    labelIds={task.labelIds}
                    toggleLabels={toggleLabels}
                    isLabelsOpen={isLabelsOpen}
                  />
                )}

                <div className="task-title-container">
                  <h2 className="task-title"> {task.title} </h2>
                </div>

                {isIconsShown() && (
                  <TaskPreviewIcons
                    task={task}
                    board={board}
                    getTimeStyle={getTimeStyle}
                    getChecklistLength={getChecklistLength}
                    onUpdateBoard={onUpdateBoard}
                  />
                )}
              </div>
              <button className="edit-btn" onClick={onToggleQuickEdit}>
                {' '}
                <RiPencilLine className="btn-icon" />{' '}
              </button>

              {isQuickEditOpen && (
                <QuickEdit
                  toggleQuickEdit={toggleQuickEdit}
                  task={task}
                  group={group}
                  board={board}
                  getTimeStyle={getTimeStyle}
                  getChecklistLength={getChecklistLength}
                  onUpdateBoard={onUpdateBoard}
                  toggleLabels={toggleLabels}
                  isLabelsOpen={isLabelsOpen}
                  element={taskRef.current}
                  getTaskStyle={getTaskStyle}
                  getTaskClass={getTaskClass}
                />
              )}
            </section>
          </div>
        </div>
      )}
    </Draggable>
  )
}
