import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useDebounce } from '../../hooks/useDebounce'

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

import { setFilterBy } from '../../store/board/board.action'
import { utilService } from '../../services/util.service'

export const TaskFilter = ({ board }) => {
  const { filterBy } = useSelector(({ boardModule }) => boardModule)
  const [filter, setFilter] = useState(filterBy)
  const keyword = useDebounce(filter.keyword, 300)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFilterBy(filter))
    // eslint-disable-next-line
  }, [filter.memberIds, filter.labelIds])

  useEffect(() => {
    dispatch(setFilterBy(filter))
    // eslint-disable-next-line
  }, [keyword])

  const handleChange = ({ target }) => {
    setFilter({ ...filter, [target.name]: target.value })
  }

  const onUncheck = (id, key) => {
    filter[key] = filter[key].filter((currId) => currId !== id)
    setFilter({ ...filter })
  }

  const onCheck = (id, key) => {
    setFilter({ ...filter, [key]: [...filter[key], id] })
  }

  return (
    <section className="task-filter">
      {/* KEYWORD */}
      <section className="by-keyword">
        <label htmlFor="keyword" className="keyword-search-label">
          Keyword
        </label>
        <input
          id="keyword"
          className="keyword-search"
          name="keyword"
          type="text"
          placeholder="Enter a keyword..."
          onChange={handleChange}
          value={filter.keyword}
        />
        <p className="instructions">Look for tasks.</p>
      </section>
      {/* MEMBER */}
      <section className="by-member">
        <h2 className="member-label">Members</h2>
        {board.members.map((member) => (
          <div className="member-preview" key={member._id}>
            <div className="checkbox-container">
              {filter.memberIds.includes(member._id) ? (
                <ImCheckboxChecked className="checkbox checked" onClick={() => onUncheck(member._id, 'memberIds')} />
              ) : (
                <ImCheckboxUnchecked className="checkbox unchecked" onClick={() => onCheck(member._id, 'memberIds')} />
              )}
            </div>
            <div className="member-img-container">
              {member.imgURL ? (
                <img className="member-img" src={member.imgURL} alt={member.username} />
              ) : (
                <div className="user-initials">{utilService.getInitials(member.fullname)}</div>
              )}
            </div>
            <h3 className="member-name">{member.fullname}</h3>
          </div>
        ))}
      </section>

      {/* LABEL */}
      <section className="by-label">
        <h2 className="labels-label">Labels</h2>
        {board.labels.map((label) => (
          <div className="label-preview" key={label.id}>
            <div className="checkbox-container">
              {filter.labelIds.includes(label.id) ? (
                <ImCheckboxChecked className="checkbox checked" onClick={() => onUncheck(label.id, 'labelIds')} />
              ) : (
                <ImCheckboxUnchecked className="checkbox unchecked" onClick={() => onCheck(label.id, 'labelIds')} />
              )}
            </div>
            <div className="label" style={{ backgroundColor: label.color }}>
              {label.title}
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}
