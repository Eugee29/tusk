import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'

import { ImAttachment } from 'react-icons/im'

import { AttachmentPreview } from './attachment-preview'

export const TaskDetailsAttachments = ({ task, updateTask }) => {
  const dispatch = useDispatch()
  const addRef = useRef()

  const onOpenModal = (ev, modal) => {
    ev.stopPropagation()
    dispatch(setModal(modal))
  }

  return (
    <section className="task-details-attachments">
      {/* Attachments */}
      <div className="attachments-title-container">
        <span className="">
          <ImAttachment />
        </span>
        <h3>Attachments</h3>
      </div>

      <div className="attachments-body-container">
        {task.attachments.map((attachment) => (
          <AttachmentPreview key={attachment.id} attachment={attachment} task={task} updateTask={updateTask} />
        ))}
        {/* eslint-disable-next-line */}
        <a
          className="attachments-add"
          ref={addRef}
          onClick={(ev) =>
            onOpenModal(ev, {
              element: addRef.current,
              category: 'attachment-add',
              title: 'Attach from...',
              props: { task, updateTask },
            })
          }
        >
          Add an attachment
        </a>
      </div>
    </section>
  )
}
