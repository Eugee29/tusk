import { useDispatch } from 'react-redux'

import { setModal } from '../../store/app/app.actions'

export function MoreMembers({ moreMembers, board, task, onUpdateBoard, element }) {
  const dispatch = useDispatch()

  const initials = (member) => [...member.fullname]

  const onOpenModal = (ev, modal) => {
    ev.stopPropagation()
    dispatch(setModal(modal))
  }

  return (
    <div className="member-section">
      <div className="members-box">
        <h3 className="label">Board members</h3>
        <ul className="">
          {moreMembers.map((member, idx) =>
            member?.imgURL ? (
              <li
                key={member._id}
                onClick={(ev) =>
                  onOpenModal(ev, {
                    category: 'member-actions',
                    element,
                    props: { member, task, board, onUpdateBoard },
                  })
                }
              >
                {/* eslint-disable-next-line */}
                <a className="member-list">
                  <span className="member-img" style={{ backgroundImage: `url('${member.imgURL}')` }}></span>
                  <span className="member-txt">{`${member.fullname} (${member.username.match(/^([^@]*)@/)[1]})`}</span>
                </a>
              </li>
            ) : (
              <li
                key={member._id}
                onClick={(ev) =>
                  onOpenModal(ev, {
                    category: 'member-actions',
                    element,
                    props: { member, task, board, onUpdateBoard },
                  })
                }
              >
                {/* eslint-disable-next-line */}
                <a className="member-list">
                  <span className="member">{`${initials(member)[0]}${initials(member)[1]}`}</span>
                  <span className="member-txt">{`${member.fullname} (${member.username.match(/^([^@]*)@/)[1]})`}</span>
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}
