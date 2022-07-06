import React from 'react'

import { useState } from 'react'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { GroupPreview } from './group-preview'

import { IoMdClose } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { boardService } from '../../services/board.service'

export const GroupList = ({ board, onUpdateBoard }) => {
  const [isLabelsOpen, setIsLabelsOpen] = useState('initial')
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
  const [newGroupTitle, setNewGroupTitle] = useState('')

  const handleChange = (ev) => {
    setNewGroupTitle(ev.target.value)
  }

  const toggleLabels = () => {
    if (isLabelsOpen === 'initial') setIsLabelsOpen(true)
    else setIsLabelsOpen(!isLabelsOpen)
  }

  const onAddGroup = async (ev) => {
    if (ev) ev.preventDefault()
    if (!newGroupTitle) return
    toggleIsAddGroupOpen()
    const groupToAdd = await boardService.getEmptyGroup(newGroupTitle)
    addGroup(groupToAdd)
  }

  const addGroup = (groupToAdd) => {
    const newBoard = { ...board, groups: [...board.groups, groupToAdd] }
    const activity = {
      actionType: 'add group',
      group: {
        id: groupToAdd.id,
        title: groupToAdd.title,
      },
    }
    onUpdateBoard(newBoard, activity)
  }

  const toggleIsAddGroupOpen = () => {
    setIsAddGroupOpen(!isAddGroupOpen)
  }

  const getAddGroupClass = () => {
    const className = isAddGroupOpen ? 'add-group open' : 'add-group'
    return className
  }

  const handleOnDragEnd = ({ destination, source, type }) => {
    if (!destination) return
    let activity
    const groupsCopy = [...board.groups]
    if (type === 'TASK') {
      const destinationGroup = groupsCopy.find((group) => group.id === destination.droppableId)
      const sourceGroup = groupsCopy.find((group) => group.id === source.droppableId)
      const task = sourceGroup.tasks.splice(source.index, 1)[0]
      destinationGroup.tasks.splice(destination.index, 0, task)

      if (destinationGroup !== sourceGroup) {
        activity = {
          actionType: 'move',
          task: {
            id: task.id,
            title: task.title,
          },
          group: {
            title: destinationGroup.title,
            id: destinationGroup.id,
            sourceTitle: sourceGroup.title,
          },
        }
      }
    }

    if (type === 'GROUP') {
      const group = groupsCopy.splice(source.index, 1)[0]
      groupsCopy.splice(destination.index, 0, group)
    }
    onUpdateBoard({ ...board, groups: groupsCopy }, activity)
  }

  const onUpdateGroup = (groupToUpdate, activity) => {
    const updatedGroups = board.groups.map((group) => (group.id === groupToUpdate.id ? groupToUpdate : group))
    onUpdateBoard({ ...board, groups: updatedGroups }, activity)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {/* Setting each group to be a droppable area, only for groups, by wrapping is with the Droppable CMP */}
      <Droppable droppableId="groups" type="GROUP" direction="horizontal">
        {(provided) => (
          <section className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
            {board.groups.map((group, index) => (
              <GroupPreview
                key={group.id}
                group={group}
                index={index}
                board={board}
                toggleLabels={toggleLabels}
                isLabelsOpen={isLabelsOpen}
                onUpdateGroup={onUpdateGroup}
                onUpdateBoard={onUpdateBoard}
              />
            ))}

            {provided.placeholder}

            <div className={getAddGroupClass()}>
              {!isAddGroupOpen && (
                <button className="add-group-btn" onClick={toggleIsAddGroupOpen}>
                  <AiOutlinePlus /> Add another list{' '}
                </button>
              )}
              {isAddGroupOpen && (
                <React.Fragment>
                  <form onSubmit={onAddGroup}>
                    <input
                      type="text"
                      autoFocus
                      placeholder="Enter list title..."
                      onChange={handleChange}
                      onBlur={onAddGroup}
                    />
                  </form>
                  <div className="btn-container">
                    <button onClick={onAddGroup} className="add-list-btn">
                      Add list
                    </button>
                    <button className="x-btn" onClick={toggleIsAddGroupOpen}>
                      <IoMdClose className="x-icon" />
                    </button>
                  </div>
                </React.Fragment>
              )}
            </div>
          </section>
        )}
      </Droppable>
    </DragDropContext>
  )
}
