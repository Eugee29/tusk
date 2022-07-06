import { useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { LabelList } from './group/label-list'
import { TaskPreviewIcons } from './group/task-preview-icons'
import { setModal } from '../store/app/app.actions.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { FiClock } from 'react-icons/fi'
import { BiLabel } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import { IoMdBrowsers } from 'react-icons/io'
import { RiArchiveLine } from 'react-icons/ri'
import { CgCreditCard } from 'react-icons/cg'

export function QuickEdit({
  toggleQuickEdit,
  task,
  group,
  board,
  getTimeStyle,
  getChecklistLength,
  onUpdateBoard,
  toggleLabels,
  isLabelsOpen,
  element,
  getTaskStyle,
  getTaskClass,
}) {
  const labelsRef = useRef()
  const membersRef = useRef()
  const coverRef = useRef()
  const datesRef = useRef()

  const [taskText, setTaskText] = useState(task.title)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFocus = (event) => {
    event.target.select()
  }

  const handleChange = ({ target }) => {
    setTaskText(target.value)
  }

  const onCloseModal = () => {
    dispatch(setModal(null))
  }

  const onOpenModal = (ev, modal) => {
    dispatch(setModal(modal))
  }

  const updateTask = (updatedTask, activity) => {
    if (!activity) activity = null
    const taskIdx = group.tasks.findIndex((task) => task.id === updatedTask.id)
    group.tasks[taskIdx] = updatedTask
    onUpdateBoard(board, activity)
  }

  const openCard = () => {
    toggleQuickEdit()
    navigate(`/board/${board._id}/${group.id}/${task.id}`)
  }

  const onToggleQuickEdit = (ev) => {
    ev.stopPropagation()
    onCloseModal()
    toggleQuickEdit()
  }

  const onArchiveTask = () => {
    updateTask({ ...task, archivedAt: Date.now() })
  }

  const onSave = () => {
    updateTask({ ...task, title: taskText })
    toggleQuickEdit()
  }

  return (
    <section className="quick-edit-container" onClick={onToggleQuickEdit}>
      <div className="quick-edit" onClick={(ev) => ev.stopPropagation()} style={utilService.getPosition(element)}>
        <section className="quick-edit-body" style={{ width: element.offsetWidth }} onClick={onToggleQuickEdit}>
          <div className={getTaskClass(true)} style={getTaskStyle(true)} onClick={(ev) => ev.stopPropagation()}>
            {task.style.imgURL && task.style.isCover && (
              <img style={{ height: element.offsetHeight }} src={task.style.imgURL} alt="..." />
            )}

            {task.style.imgURL && !task.style.isCover && <img src={task.style.imgURL} alt="..." />}

            <div className="task-info">
              {!!task.labelIds.length && (
                <LabelList
                  board={board}
                  labelIds={task.labelIds}
                  toggleLabels={toggleLabels}
                  isLabelsOpen={isLabelsOpen}
                />
              )}

              <textarea autoFocus onChange={handleChange} defaultValue={taskText} onFocus={handleFocus}></textarea>
              <TaskPreviewIcons
                task={task}
                board={board}
                getTimeStyle={getTimeStyle}
                getChecklistLength={getChecklistLength}
                onUpdateBoard={onUpdateBoard}
              />
            </div>
          </div>
          <button className="save-btn" onClick={onSave}>
            {' '}
            Save{' '}
          </button>
        </section>
        <section className="quick-edit-actions">
          <button className="quick-edit-btn" onClick={openCard}>
            {' '}
            <CgCreditCard /> Open card{' '}
          </button>
          <button
            className="quick-edit-btn"
            ref={labelsRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: labelsRef.current,
                category: 'Labels',
                title: 'Labels',
                props: {
                  element: labelsRef.current,
                  task,
                  updateTask,
                  board,
                  onUpdateBoard,
                },
              })
            }
          >
            {' '}
            <BiLabel /> Edit labels{' '}
          </button>

          <button
            className="quick-edit-btn"
            ref={membersRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: membersRef.current,
                category: 'Members',
                title: 'Members',
                props: {
                  task,
                  updateTask,
                  board,
                  onUpdateBoard,
                },
              })
            }
          >
            {' '}
            <AiOutlineUser /> Change members{' '}
          </button>

          <button
            className="quick-edit-btn"
            ref={coverRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: coverRef.current,
                category: 'Cover',
                title: 'Cover',
                props: {
                  task,
                  updateTask,
                  board,
                  onUpdateBoard,
                },
              })
            }
          >
            {' '}
            <IoMdBrowsers /> Change cover{' '}
          </button>

          <button
            className="quick-edit-btn"
            ref={datesRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: datesRef.current,
                category: 'Dates',
                title: 'Dates',
                props: {
                  task,
                  updateTask,
                  board,
                  onUpdateBoard,
                  group,
                },
              })
            }
          >
            {' '}
            <FiClock /> Edit dates{' '}
          </button>

          <button className="quick-edit-btn" onClick={onArchiveTask}>
            {' '}
            <RiArchiveLine /> Archive{' '}
          </button>

          <div className="blank-space" onClick={onToggleQuickEdit}></div>
        </section>
      </div>
    </section>
  )
}
