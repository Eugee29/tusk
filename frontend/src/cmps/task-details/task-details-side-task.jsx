import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../store/app/app.actions'

import { AiOutlineUser } from 'react-icons/ai'
import { BiLabel } from 'react-icons/bi'
import { BsCheck2Square } from 'react-icons/bs'
import { FiClock } from 'react-icons/fi'
import { GrAttachment } from 'react-icons/gr'
import { IoMdBrowsers } from 'react-icons/io'
import { RiArchiveLine } from 'react-icons/ri'
import { CgUndo } from 'react-icons/cg'
import { HiOutlineMinus } from 'react-icons/hi'

export function TaskDetailsSideTask({ task, board, group, updateTask, onUpdateBoard, deleteTask }) {
  const membersRef = useRef()
  const labelsRef = useRef()
  const checklistRef = useRef()
  const datesRef = useRef()
  const attachmentRef = useRef()
  const coverRef = useRef()
  const deleteRef = useRef()

  const dispatch = useDispatch()
  const { user } = useSelector(({ userModule }) => userModule)

  const [isUserMember, setIsUserMember] = useState(false)

  useEffect(() => {
    onIsUserMember()
    // eslint-disable-next-line
  }, [task])

  const onIsUserMember = () => {
    const isTaskMember = task.members.some((member) => member._id === user._id)
    setIsUserMember(isTaskMember)
  }

  const onJoinMember = () => {
    const isTaskMember = task.members.some((member) => member._id === user._id)
    if (isTaskMember) return

    const newTaskMembers = [...task.members]
    newTaskMembers.push({
      _id: user._id,
      fullname: user.fullname,
      imgURL: user.imgURL,
      username: user.username,
    })

    const activity = {
      actionType: 'join',
      join: { title: task.title },
    }

    updateTask({ ...task, members: newTaskMembers }, activity)
  }

  const onOpenModal = (ev, modal) => {
    ev.stopPropagation()
    dispatch(setModal(modal))
  }

  const onArchiveTask = () => {
    const activity = {
      actionType: 'archive task',
    }
    updateTask({ ...task, archivedAt: Date.now() }, activity)
  }

  const onRestoreTask = () => {
    const activity = {
      actionType: 'restore task',
    }
    updateTask({ ...task, archivedAt: null }, activity)
  }

  return (
    <section className="side-task">
      {!isUserMember && <h3 className="label-header">Suggested</h3>}
      {!isUserMember && (
        <div className="join-container">
          {/* eslint-disable-next-line */}
          <a className="sidebar-button" onClick={onJoinMember} title="Join">
            <span className="sidebar-icon">
              <AiOutlineUser />
            </span>
            <span>Join</span>
          </a>
        </div>
      )}

      <div>
        <h3 className="label-header">Add to card</h3>
        <div>
          {/* eslint-disable-next-line */}
          <a
            className="sidebar-button"
            ref={membersRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: membersRef.current,
                category: 'Members',
                title: 'Members',
                props: { task, updateTask, board, onUpdateBoard },
              })
            }
            title="Members"
          >
            <span className="sidebar-icon">
              <AiOutlineUser />
            </span>
            <span>Members</span>
          </a>
          {/* eslint-disable-next-line */}
          <a
            className="sidebar-button"
            ref={labelsRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: labelsRef.current,
                category: 'Labels',
                title: 'Labels',
                props: { element: labelsRef.current, task, updateTask, board, onUpdateBoard },
              })
            }
            title="Labels"
          >
            <span className="sidebar-icon">
              <BiLabel />
            </span>
            <span>Labels</span>
          </a>
          {/* eslint-disable-next-line */}
          <a
            className="sidebar-button"
            ref={checklistRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: checklistRef.current,
                title: 'Add checklist',
                category: 'checklist-add',
                props: { updateTask, task },
              })
            }
            title="Checklist"
          >
            <span className="sidebar-icon">
              <BsCheck2Square />
            </span>
            <span>Checklist</span>
          </a>
          {/* eslint-disable-next-line */}
          <a
            className="sidebar-button"
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
            title="Dates"
          >
            <span className="sidebar-icon">
              <FiClock />
            </span>
            <span>Dates</span>
          </a>
          {/* eslint-disable-next-line */}
          <a
            className="sidebar-button"
            ref={attachmentRef}
            onClick={(ev) =>
              onOpenModal(ev, {
                element: attachmentRef.current,
                category: 'attachment-add',
                title: 'Attach from...',
                props: { task, updateTask },
              })
            }
            title="Attachment"
          >
            <span className="sidebar-icon">
              <GrAttachment />
            </span>
            <span>Attachment</span>
          </a>
          {/* eslint-disable-next-line */}
          <a
            className="sidebar-button"
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
            title="Cover"
          >
            <span className="sidebar-icon">
              <IoMdBrowsers />
            </span>
            <span>Cover</span>
          </a>
        </div>

        <h3 className="label-header actions">Actions</h3>

        <div>
          {task.archivedAt ? (
            <div>
              {/* eslint-disable-next-line */}
              <a className="sidebar-button" onClick={onRestoreTask}>
                <span className="sidebar-icon">
                  <CgUndo />
                </span>
                <span>Send to board</span>
              </a>
              {/* eslint-disable-next-line */}
              <a
                className="sidebar-button delete-btn"
                ref={deleteRef}
                onClick={(ev) =>
                  onOpenModal(ev, {
                    element: deleteRef.current,
                    category: 'task-delete',
                    title: 'Delete task?',
                    props: {
                      deleteTask,
                    },
                  })
                }
              >
                <span className="sidebar-icon">
                  <HiOutlineMinus />
                </span>
                <span>Delete</span>
              </a>
            </div>
          ) : (
            // eslint-disable-next-line
            <a className="sidebar-button" onClick={onArchiveTask}>
              <span className="sidebar-icon">
                <RiArchiveLine />
              </span>
              <span>Archive</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
