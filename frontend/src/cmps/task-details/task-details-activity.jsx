import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { activityService } from '../../services/activity.service'

import { GrList } from 'react-icons/gr'
import { ActivityList } from '../activity-list'
import { utilService } from '../../services/util.service'

export function TaskDetailsActivity({ task, isCloseEdit, board, onUpdateBoard, group }) {
  const activities = activityService.getTaskActivities(task.id, board)
  const { user } = useSelector(({ userModule }) => userModule)

  const [isClickedComment, setIsClickedComment] = useState(null)
  const [isTypeComment, setIsTypeComment] = useState(false)
  const [comment, setComment] = useState('')

  useEffect(() => {
    setIsClickedComment(false)
  }, [isCloseEdit])

  const onChangeComment = (ev) => {
    ev.stopPropagation()
    setIsClickedComment(true)
  }

  const handleChange = (ev) => {
    ev.stopPropagation()
    setComment(ev.target.value)

    if (ev.target.value.length > 0) setIsTypeComment(true)
    if (ev.target.value.length === 0) setIsTypeComment(false)
  }

  const onSubmitComment = () => {
    const activity = {
      actionType: 'comment',
      text: comment,
      task: {
        id: task.id,
        title: task.title,
      },
      group: {
        id: group.id,
        title: group.title,
      },
    }
    onUpdateBoard(board, activity)
    setComment('')
  }

  const enableButton = isTypeComment ? 'enableButton' : ''

  return (
    <section className="task-details-activity">
      {/* Activity */}
      <div className="activity-title-container">
        <span className="">
          <GrList />
        </span>
        <h3>Activity</h3>
      </div>

      <div className="activity-list-container">
        <div className="user-container">
          <div className="member">
            {user.imgURL ? (
              <img src={user.imgURL} alt="user" />
            ) : (
              <div className="user-initials">{utilService.getInitials(user.fullname)}</div>
            )}
          </div>
        </div>

        <div className="comment-frame">
          <div className="comment-container">
            {/* eslint-disable-next-line */}
            {!isClickedComment && <a onClick={onChangeComment}>Write a comment…</a>}
            {isClickedComment && (
              <textarea
                onClick={onChangeComment}
                placeholder="Write a comment…"
                onChange={handleChange}
                value={comment}
              ></textarea>
            )}
            {isClickedComment && (
              <input className={`${enableButton}`} type="submit" value="Save" onClick={onSubmitComment} disabled="" />
            )}
          </div>
        </div>
      </div>

      {activities && <ActivityList board={board} task={task} />}
    </section>
  )
}
