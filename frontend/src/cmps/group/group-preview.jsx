import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd'

import { setModal } from '../../store/app/app.actions'

import { BsThreeDots } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'

import { TaskList } from './task-list'

export const GroupPreview = ({ group, index, toggleLabels, board, isLabelsOpen, onUpdateGroup, onUpdateBoard }) => {
  const dispatch = useDispatch()
  const buttonRef = useRef()
  const titleRef = useRef()
  const { boardId } = useParams()

  const [titleText, setTitleText] = useState(group.title)
  const [isAddCardOpen, setIsAddCardOpen] = useState(false)

  const handleChange = ({ target }) => {
    setTitleText(target.value)
  }

  const handleKeyDown = (ev) => {
    if (ev.code === 'Enter') {
      ev.preventDefault()
      if (!titleText) return
      updateTitle()
    }
  }

  const toggleAddCard = () => {
    setIsAddCardOpen(!isAddCardOpen)
  }

  const updateTitle = async () => {
    const updatedGroup = { ...group, title: titleText }
    titleRef.current.blur()
    if (!titleText) return setTitleText(group.title)
    onUpdateGroup(updatedGroup)
  }

  const onOpenModal = (ev) => {
    ev.stopPropagation()
    dispatch(
      setModal({
        element: buttonRef.current,
        category: 'Group actions',
        title: 'List actions',
        props: {
          onUpdateBoard,
          boardId,
          group,
        },
      })
    )
  }

  return (
    // Setting each group to be draggable with the Draggable component
    <Draggable draggableId={group.id} index={index} type="GROUP">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <section className={`group-preview ${snapshot.isDragging && !snapshot.isDropAnimating ? 'tilted' : ''}`}>
            <div className="group-title-container" {...provided.dragHandleProps}>
              <textarea
                className="group-title"
                ref={titleRef}
                value={titleText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={updateTitle}
                onFocus={() => titleRef.current.select()}
                spellCheck="false"
              ></textarea>
              <button ref={buttonRef} onClick={onOpenModal} className="group-btn">
                <BsThreeDots className="dots-icon" />
              </button>
            </div>

            <TaskList
              key={group.id}
              group={group}
              board={board}
              toggleLabels={toggleLabels}
              isLabelsOpen={isLabelsOpen}
              isAddCardOpen={isAddCardOpen}
              toggleAddCard={toggleAddCard}
              onUpdateGroup={onUpdateGroup}
              onUpdateBoard={onUpdateBoard}
            />

            {!isAddCardOpen && (
              <div className="add-btn-container">
                <button className="add-btn" onClick={toggleAddCard}>
                  <AiOutlinePlus /> Add a card
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </Draggable>
  )
}
