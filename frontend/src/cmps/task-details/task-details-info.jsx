import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'

import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { GrDown } from 'react-icons/gr'

import { utilService } from '../../services/util.service'
import { MemberPreview } from './member-preview'

export const TaskDetailsInfo = ({ task, updateTask, board, onUpdateBoard, group }) => {
  const memberRef = useRef()
  const labelsRef = useRef()
  const datesRef = useRef()
  const dispatch = useDispatch()

  const [isCompleteDate, setIsCompleteDate] = useState(task.isComplete || false)

  useEffect(() => {
    onLabels()
    // eslint-disable-next-line
  }, [])

  const onToggleComplete = (value, ev) => {
    setIsCompleteDate(value)

    const updatedTask = { ...task }
    updatedTask.isComplete = value
    updateTask(updatedTask)
  }

  const onOpenModal = (ev, modal) => {
    ev.stopPropagation()
    dispatch(setModal(modal))
  }

  const onLabels = (label) => {
    return board.labels.filter((boardLabel) => boardLabel.id === label)[0]
  }

  var dateFormat = utilService.getDateTimeFormat(task.dueDate)
  if (task?.isComplete && task.isComplete) {
    dateFormat.statusDate = 'complete'
  }

  return (
    <section className="task-details-info">
      {/* Members */}
      {!!task.members.length && (
        <div className="task-card-info">
          <h3 className="task-member-title">Members</h3>
          {task.members?.map((member) => (
            <MemberPreview
              key={member._id}
              member={member}
              task={task}
              updateTask={updateTask}
              isInTaskDetails={true}
              board={board}
              onUpdateBoard={onUpdateBoard}
            />
          ))}
          {/* eslint-disable-next-line */}
          <a
            className="members-add-button round"
            ref={memberRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: memberRef.current,
                category: 'Members',
                props: { task, updateTask, board, onUpdateBoard, group },
              })
            }
          >
            <span>+</span>
          </a>
        </div>
      )}

      {/* Labels */}
      {!!task.labelIds.length && (
        <div className="task-card-info" ref={labelsRef}>
          <h3 className="task-member-title">Labels</h3>
          {task.labelIds.map((label) => (
            // eslint-disable-next-line
            <a
              key={label}
              className="label"
              onClick={(ev) =>
                onOpenModal(ev, {
                  element: labelsRef.current,
                  category: 'Labels',
                  props: { task, updateTask, board, onUpdateBoard, element: labelsRef.current },
                })
              }
              style={{ backgroundColor: `${onLabels(label).color}` }}
            >
              <span>{onLabels(label).title}</span>
            </a>
          ))}
          {/* eslint-disable-next-line */}
          <a
            className="members-add-button "
            onClick={(ev) =>
              onOpenModal(ev, {
                element: labelsRef.current,
                category: 'Labels',
                props: { task, updateTask, board, onUpdateBoard, element: labelsRef.current },
              })
            }
          >
            <span>+</span>
          </a>
        </div>
      )}

      {/* Due date */}
      {task.dueDate && (
        <div className="task-card-info">
          <h3 className="task-member-title">Due date</h3>
          <div className="date-container">
            <div className="date-complete-button">
              {isCompleteDate ? (
                <ImCheckboxChecked onClick={() => onToggleComplete(false)} className="checkbox checked" />
              ) : (
                <ImCheckboxUnchecked onClick={() => onToggleComplete(true)} className="checkbox unchecked" />
              )}
            </div>
            <div className="date" ref={datesRef}>
              <button
                className="button-date"
                type="button"
                onClick={(ev) =>
                  onOpenModal(ev, {
                    element: datesRef.current,
                    category: 'Dates',
                    props: { task, updateTask, board, onUpdateBoard, group },
                  })
                }
              >
                <span className="dispaly-date">{dateFormat.displayDate}</span>
                <span className={`status-date ${dateFormat.statusDate}`}>{dateFormat.statusDate}</span>
                <span className="arrow-date">
                  <GrDown />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
