import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'

import { RiLayoutBottom2Fill } from 'react-icons/ri'

export const AttachmentPreview = ({ attachment, task, updateTask }) => {
  const dispatch = useDispatch()
  const deleteRef = useRef()
  const editRef = useRef()

  const onOpenModal = (ev, modal) => {
    ev.stopPropagation()
    dispatch(setModal(modal))
  }

  const timeAgo = (timestamp, locale = 'en') => {
    let value
    const diff = Math.floor((Date.now() - timestamp) / 1000)
    const minutes = Math.floor(diff / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

    if (years > 0) {
      value = rtf.format(0 - years, 'year')
    } else if (months > 0) {
      value = rtf.format(0 - months, 'month')
    } else if (days > 0) {
      value = rtf.format(0 - days, 'day')
    } else if (hours > 0) {
      value = rtf.format(0 - hours, 'hour')
    } else if (minutes > 0) {
      value = rtf.format(0 - minutes, 'minute')
    } else {
      value = rtf.format(0 - diff, 'second')
    }
    if (minutes < 1) value = 'just now'
    return value
  }

  const deleteAttachment = () => {
    const updatedAttachments = task.attachments.filter((currAtt) => currAtt.id !== attachment.id)
    const activity = {
      actionType: 'delete attachment',
      file: { fileName: attachment.fileName },
    }
    updateTask({ ...task, attachments: updatedAttachments }, activity)
  }

  const editAttachment = (fileName) => {
    const attIdx = task.attachments.findIndex((currAtt) => currAtt.id === attachment.id)
    task.attachments[attIdx].fileName = fileName
    updateTask(task)
  }

  const setCover = (ev) => {
    ev.stopPropagation()
    task.style = { imgURL: attachment.fileUrl, isCover: task.style.isCover }
    updateTask({ ...task })
  }

  if (!attachment.fileName) attachment.fileName = 'Attachment'
  return (
    <div
      key={attachment.id}
      className="attachments-section-container"
      onClick={() => window.open(attachment.fileUrl, '_blank')}
    >
      {/* eslint-disable-next-line */}
      <a className="thumbnail-img" target="_blank" style={{ backgroundImage: `url('${attachment.fileUrl}')` }}></a>
      <div className="thumbnail-info">
        <span className="thumbnail-name">{attachment.fileName}</span>
        <div className="thumbnail-details">
          <span className="thumbnail-date">
            Added <span className="date">{timeAgo(attachment.createdAt)}</span>
          </span>
          <span className="att-control">
            {/* eslint-disable-next-line */}
            <a
              className="thumbnail-date"
              ref={deleteRef}
              onClick={(ev) =>
                onOpenModal(ev, {
                  element: deleteRef.current,
                  category: 'attachment-delete',
                  title: 'Delete attachment?',
                  props: { deleteAttachment },
                })
              }
            >
              <span className="button-att">Delete</span>
            </a>
          </span>
          <span className="att-control">
            {/* eslint-disable-next-line */}
            <a
              className="thumbnail-date"
              ref={editRef}
              onClick={(ev) =>
                onOpenModal(ev, {
                  element: editRef.current,
                  category: 'attachment-edit',
                  title: 'Edit attachment',
                  props: { editAttachment, attachment },
                })
              }
            >
              <span className="button-att">Edit</span>
            </a>
          </span>
        </div>
        <div className="thumbnail-cover">
          <span className="icon-make-cover">
            <RiLayoutBottom2Fill />
          </span>
          <span className="button-att" onClick={setCover}>
            Make cover
          </span>
        </div>
      </div>
    </div>
  )
}
