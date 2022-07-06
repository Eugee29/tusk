import { Droppable } from 'react-beautiful-dnd'
import { TaskPreview } from './task-preview'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

import { boardService } from '../../services/board.service'
import { useSelector } from 'react-redux'

export const TaskList = ({
  group,
  board,
  isLabelsOpen,
  toggleLabels,
  isAddCardOpen,
  toggleAddCard,
  onUpdateGroup,
  onUpdateBoard,
}) => {
  const [cardText, setCardText] = useState('')
  const { filterBy } = useSelector(({ boardModule }) => boardModule)

  const handleChange = ({ target }) => {
    setCardText(target.value)
  }

  const handleKeyDown = (ev) => {
    if (ev.code === 'Enter') {
      ev.preventDefault()
      onAddCard()
    }
  }

  const filter = (tasks) => {
    return tasks.filter(
      (task) =>
        !task.archivedAt &&
        (!filterBy.labelIds.length || task.labelIds.some((label) => filterBy.labelIds.includes(label))) &&
        (!filterBy.memberIds.length || task.members.some((member) => filterBy.memberIds.includes(member._id))) &&
        task.title.toLowerCase().includes(filterBy.keyword.toLowerCase())
    )
  }

  const onAddCard = () => {
    toggleAddCard()
    if (!cardText) return
    const taskToAdd = boardService.getEmptyTask(cardText)
    addCard(taskToAdd)
    setCardText('')
  }

  const addCard = (taskToAdd) => {
    const updatedTasks = [...group.tasks, taskToAdd]
    const updatedGroup = { ...group, tasks: updatedTasks }
    const activity = {
      actionType: 'add task',
      task: {
        id: taskToAdd.id,
        title: taskToAdd.title,
      },
      group: {
        id: group.id,
        title: group.title,
      },
    }
    onUpdateGroup(updatedGroup, activity)
  }

  const filteredTasks = filter(group.tasks)

  return (
    // Setting each task list to be a droppable area only for other tasks
    <Droppable droppableId={group.id} type="TASK">
      {(provided) => (
        <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
          {filteredTasks.map((task, index) => (
            <TaskPreview
              key={task.id}
              board={board}
              group={group}
              task={task}
              index={index}
              toggleLabels={toggleLabels}
              isLabelsOpen={isLabelsOpen}
              onUpdateBoard={onUpdateBoard}
            />
          ))}
          {provided.placeholder}
          {isAddCardOpen && (
            <div className="add-card-container">
              <textarea
                autoFocus
                onBlur={onAddCard}
                placeholder="Enter a title for this card..."
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={cardText}
              ></textarea>
              <div className="btn-container">
                <button className="add-btn" onClick={onAddCard}>
                  Add card
                </button>
                <button className="x-btn" onClick={toggleAddCard}>
                  <IoMdClose className="x-icon" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Droppable>
  )
}
