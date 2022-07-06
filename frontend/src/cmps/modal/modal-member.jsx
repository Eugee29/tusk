import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { BsCheck2 } from 'react-icons/bs'
import { utilService } from '../../services/util.service'

export const ModalMember = ({ task, board, updateTask }) => {
  const [searchMember, setSearchMember] = useState('')
  const [filterMembers, setFilterMembers] = useState(board.members)
  const [taskMembers, setTaskMembers] = useState(task.members)
  const { user } = useSelector(({ userModule }) => userModule)

  if (!task) return
  if (!board) return

  const onToggle = (id) => {
    const taskMemberIdx = taskMembers.findIndex((taskMember) => taskMember._id === id)
    const boardMemberIdx = board.members.findIndex((boardMember) => boardMember._id === id)

    const updatedTaskMembers = [...taskMembers]

    taskMemberIdx >= 0
      ? updatedTaskMembers.splice(taskMemberIdx, 1)
      : updatedTaskMembers.push(board.members[boardMemberIdx])

    setTaskMembers(updatedTaskMembers)

    if (id === user._id && taskMemberIdx === -1) {
      const activity = {
        actionType: 'join',
        join: { title: task.title },
      }
      updateTask({ ...task, members: updatedTaskMembers }, activity)
    }

    updateTask({ ...task, members: updatedTaskMembers })
  }

  const handleChange = ({ target }) => {
    setSearchMember(target.value)
    setFilterMembers(
      board.members.filter((member) => member.fullname.toLowerCase().includes(target.value.toLowerCase()))
    )
  }

  return (
    <div className="member-section">
      <div className="search-box">
        <input className="" type="text" placeholder="Search members" value={searchMember} onChange={handleChange} />
      </div>

      <div className="members-box">
        <h3 className="label">Board members</h3>
        <ul className="">
          {filterMembers &&
            filterMembers?.map((member, idx) =>
              member?.imgURL ? (
                <li key={member._id} onClick={() => onToggle(member._id)}>
                  {/* eslint-disable-next-line */}
                  <a className="member-list">
                    <span className="member-img" style={{ backgroundImage: `url('${member.imgURL}')` }}></span>
                    <span className="member-txt">{`${member.fullname} (${
                      member.username.match(/^([^@]*)@/)[1]
                    })`}</span>
                    {task?.members && taskMembers.some((taskMember) => taskMember._id === member._id) && (
                      <span className="member-icon">
                        <BsCheck2 />
                      </span>
                    )}
                  </a>
                </li>
              ) : (
                <li key={member._id} onClick={() => onToggle(member._id)}>
                  {/* eslint-disable-next-line */}
                  <a className="member-list">
                    <span className="member">{utilService.getInitials(member.fullname)}</span>
                    <span className="member-txt">{`${member.fullname} (${
                      member.username.match(/^([^@]*)@/)[1]
                    })`}</span>
                    {task?.members && taskMembers.some((taskMember) => taskMember._id === member._id) && (
                      <span className="member-icon">
                        <BsCheck2 />
                      </span>
                    )}
                  </a>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  )
}
