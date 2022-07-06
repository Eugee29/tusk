import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'

import { BsCheck2 } from 'react-icons/bs'
import { BsPencil } from 'react-icons/bs'

export const ModalLabel = ({ task, board, onUpdateBoard, changeEditLabel, updateTask, element }) => {
  const [searchLabel, setSearchLabel] = useState('')
  const [taskLabels, setTaskLabels] = useState(task.labelIds)

  useEffect(() => {
    let taskByFilter = ''
    board.groups.map((group) =>
      group.tasks.map((taskFromBoard) => (taskFromBoard.id === task.id ? (taskByFilter = taskFromBoard) : ''))
    )
    setTaskLabels(taskByFilter.labelIds)
    // eslint-disable-next-line
  }, [])

  const modalRef = useRef()
  const searchInput = useRef(null)

  const dispatch = useDispatch()

  if (!task) return
  if (!board) return

  const onToggle = (id) => {
    const updatedLabelList = [...taskLabels]
    const taskLabelIdx = updatedLabelList.findIndex((taskLabel) => taskLabel === id)
    const boardLabelIdx = board.labels.findIndex((boardLabel) => boardLabel.id === id)
    taskLabelIdx >= 0 ? updatedLabelList.splice(taskLabelIdx, 1) : updatedLabelList.push(board.labels[boardLabelIdx].id)

    setTaskLabels(updatedLabelList)
    updateTask({ ...task, labelIds: updatedLabelList })
  }

  const handleChange = ({ target }) => {
    setSearchLabel(target.value)
  }

  const onOpenModal = (category) => {
    dispatch(
      setModal({
        element,
        category,
        title: category,
        props: {
          task,
          updateTask,
          board,
          onUpdateBoard,
          element,
        },
      })
    )
  }

  return (
    <div className="label-section" ref={modalRef}>
      <div className="search-box">
        <input
          ref={searchInput}
          type="text"
          name="search"
          placeholder="Search label..."
          value={searchLabel}
          onChange={handleChange}
        />
      </div>

      <div className="label-box">
        <h3 className="label">Labels</h3>

        <ul>
          {board.labels.map((label) => (
            <li key={label.id}>
              <span onClick={() => onToggle(label.id)} className="label-color" style={{ backgroundColor: label.color }}>
                <span className="label-txt">{`${label.title}`}</span>
                {taskLabels && taskLabels.some((taskLabel) => taskLabel === label.id) && (
                  <span className="label-icon">
                    <BsCheck2 />{' '}
                  </span>
                )}
              </span>
              <span
                className="label-icon pencil"
                onClick={(ev) => {
                  ev.stopPropagation()
                  onOpenModal('Change label')
                  changeEditLabel(label)
                }}
              >
                <BsPencil />{' '}
              </span>
            </li>
          ))}
        </ul>

        <span
          className="btn"
          ref={modalRef}
          onClick={(ev) => {
            ev.stopPropagation()
            onOpenModal('Create label')
          }}
        >
          Create a new label
        </span>
        <div className="hr"></div>
      </div>
    </div>
  )
}
