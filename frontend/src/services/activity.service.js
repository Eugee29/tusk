import { Link } from 'react-router-dom'
import { utilService } from './util.service'

export const activityService = {
  getActivityUpdatedBoard,
  getTaskActivities,
  getActivityText,
}

function getActivityUpdatedBoard(board, activity, byMember) {
  let isComment,
    text,
    dueDate = false
  if (activity.actionType === 'comment') isComment = true
  if (activity.text) text = activity.text
  if (activity.dueDate) dueDate = activity.dueDate

  const newActivity = {
    byMember,
    dueDate,
    createdAt: Date.now(),
    id: utilService.makeId(),
    task: activity.task,
    group: activity.group,
    actionType: activity.actionType,
    isComment,
    text,
    file: activity.file,
    checklist: activity.checklist,
    join: activity.join,
  }

  const newActivities = [newActivity, ...board.activities]
  const newBoard = { ...board, activities: newActivities }
  return newBoard
}

function getActivityText(activity, board, diff) {
  let onToggleMenu, task

  if (typeof diff === 'function') {
    onToggleMenu = diff
    task = false
  } else {
    task = diff
    onToggleMenu = false
  }

  const linkPath = activity.task ? `/board/${board._id}/${activity.group.id}/${activity.task.id}` : null
  let boardText, taskText

  switch (activity.actionType) {
    case 'delete task':
      boardText = [
        'deleted',
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
      ]
      break

    case 'add task':
      boardText = [
        'added',
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
        `to ${activity.group.title}`,
      ]
      taskText = [`added this task to ${activity.group.title}`]
      break
    case 'change date':
      boardText = [
        'changed the due date of',
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
        `to ${utilService.getDateTimeFormat(activity.dueDate).displayDate}`,
      ]
      taskText = [`changed the due date of this task to ${utilService.getDateTimeFormat(activity.dueDate).displayDate}`]
      break
    case 'move':
      boardText = [
        'moved',
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
        `to ${activity.group.title}`,
      ]
      taskText = [`moved this task from ${activity.group.sourceTitle} to ${activity.group.title}`]
      break
    case 'comment':
      boardText = [
        'on',
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
      ]
      taskText = [`${activity.task.title}`]
      break
    case 'delete group':
      boardText = [`deleted list ${activity.group.title}`]
      break
    case 'add group':
      boardText = [`added ${activity.group.title} to this board`]
      break
    case 'add attachment':
      boardText = [
        'attached',
        <a href={activity.file.fileUrl} target="_blank" rel="noopener noreferrer">
          {activity.file.fileName}
        </a>,
        'to',
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
        <div className="img-container">
          {' '}
          <img src={activity.file.fileUrl} alt={activity.file.fileName} />
        </div>,
      ]
      taskText = [
        'attached',
        <a href={activity.file.fileUrl} target="_blank" rel="noopener noreferrer">
          {activity.file.fileName}
        </a>,
        'to this task',
        <div className="img-container">
          {' '}
          <img src={activity.file.fileUrl} alt={activity.file.fileName} />
        </div>,
      ]
      break
    case 'delete attachment':
      boardText = [
        `deleted the ${activity.file.fileName} attachment from`,
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
      ]
      taskText = [`deleted the ${activity.file.fileName} attachment from this task`]
      break
    case 'add checklist':
      boardText = [
        `added ${activity.checklist.title} to`,
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
      ]
      taskText = [`added ${activity.checklist.title} to this task`]
      break
    case 'join':
      boardText = [
        `joined to`,
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.join.title}
        </Link>,
      ]
      taskText = [`joined this task`]
      break
    case 'delete checklist':
      boardText = [
        `removed ${activity.checklist.title} from`,
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
      ]
      taskText = [`removed ${activity.checklist.title} from this task`]
      break
    case 'archive task':
      boardText = [
        `archived`,
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
      ]
      taskText = [`archived this task`]
      break
    case 'restore task':
      boardText = [
        `sent`,
        <Link to={linkPath} onClick={onToggleMenu}>
          {activity.task.title}
        </Link>,
        'to the board',
      ]
      taskText = [`sent this card to the board`]
      break
    default:
      boardText = [null]
  }
  if (task) return taskText
  else return boardText
}

function getTaskActivities(taskId, board) {
  const taskActivities = board.activities.filter((activity) => {
    if (!activity.task) return false
    else return activity.task.id === taskId
  })
  return taskActivities
}
