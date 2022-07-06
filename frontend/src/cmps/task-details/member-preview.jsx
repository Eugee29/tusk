import { Fragment, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { utilService } from '../../services/util.service'

import { setModal } from '../../store/app/app.actions'

export const MemberPreview = ({ member, task, board, onUpdateBoard }) => {
  const dispatch = useDispatch()
  const memberRef = useRef()

  const onOpenModal = (ev, modal) => {
    ev.stopPropagation()
    dispatch(setModal(modal))
  }

  return (
    <Fragment>
      {member?.imgURL ? (
        // eslint-disable-next-line
        <a
          key={member._id}
          className="member-img"
          onClick={(ev) =>
            onOpenModal(ev, {
              category: 'member-actions',
              element: memberRef.current,
              props: { member, task, board, onUpdateBoard },
            })
          }
        >
          <img src={member.imgURL} ref={memberRef} alt={member.fullName} />
        </a>
      ) : (
        // eslint-disable-next-line
        <a
          className="member"
          ref={memberRef}
          onClick={(ev) =>
            onOpenModal(ev, {
              category: 'member-actions',
              element: memberRef.current,
              props: { member, task, board, onUpdateBoard },
            })
          }
        >
          {utilService.getInitials(member.fullname)}
        </a>
      )}
    </Fragment>
  )
}
