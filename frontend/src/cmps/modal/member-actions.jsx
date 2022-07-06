import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'

import { CgClose } from 'react-icons/cg'
import { utilService } from '../../services/util.service'

export const MemberActions = ({ member, task, board, onUpdateBoard }) => {
  const dispatch = useDispatch()

  const onRemoveMember = () => {
    dispatch(setModal(null))
    if (!task) board.members = board.members.filter((currMember) => currMember._id !== member._id)
    else {
      const memberIdx = task.members.findIndex((currMember) => currMember._id === member._id)
      task.members.splice(memberIdx, 1)
    }
    onUpdateBoard(board)
  }

  return (
    <div className="member-actions">
      <button className="close-btn" onClick={() => dispatch(setModal(null))}>
        <CgClose className="close-icon" />
      </button>
      <div className="member-info">
        <div className="member-img-container">
          {member?.imgURL ? (
            <img src={member.imgURL} alt={member.fullName} className="member-img" />
          ) : (
            // eslint-disable-next-line
            <a className="member">{utilService.getInitials(member.fullname)}</a>
          )}
        </div>

        <div className="member-name">
          <h1 className="member-fullname">{member.fullname}</h1>
          <h2 className="member-username">{member.username}</h2>
        </div>
      </div>
      <button className="remove-btn" onClick={onRemoveMember}>
        {task ? 'Remove from task' : 'Remove from board...'}
      </button>
    </div>
  )
}
