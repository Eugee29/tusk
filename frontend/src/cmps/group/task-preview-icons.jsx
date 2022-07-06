import { utilService } from '../../services/util.service'

import { FiClock } from 'react-icons/fi'
import { MdOutlineSubject } from 'react-icons/md'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { ImAttachment } from 'react-icons/im'

import { MemberPreview } from '../task-details/member-preview'

export function TaskPreviewIcons({ task, board, getTimeStyle, getChecklistLength, onUpdateBoard }) {
  return (
    <div className="task-icon-container">
      <div className="icon-container">
        {task.dueDate && !task.style.isCover && (
          <div className="icon-time-container" style={getTimeStyle()}>
            <FiClock /> <span> {utilService.formatTimeToDM(task.dueDate)} </span>
          </div>
        )}
        {task.description && !task.style.bgColor && !task.style.imgURL && <MdOutlineSubject />}
        {task.checklists && !!task.checklists.length && !task.style.isCover && (
          <div className="icon-num-container">
            {' '}
            <IoMdCheckboxOutline /> <span> {getChecklistLength()} </span>{' '}
          </div>
        )}
        {task.attachments && !!task.attachments.length && !task.style.isCover && (
          <div className="icon-num-container">
            <ImAttachment className="attachment-icon" /> <span> {task.attachments.length} </span>{' '}
          </div>
        )}
      </div>
      {task.members && !!task.members.length && !task.style.isCover && (
        <div className="member-img-container">
          {task.members.map((member) => (
            <MemberPreview
              key={member._id}
              member={member}
              isInTaskDetails={false}
              task={task}
              onUpdateBoard={onUpdateBoard}
              board={board}
            />
          ))}
        </div>
      )}
    </div>
  )
}
