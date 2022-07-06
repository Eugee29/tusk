import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { utilService } from '../../services/util.service'

import { setModal } from '../../store/app/app.actions'

import { HiOutlineStar } from 'react-icons/hi'
import { FaRegClock } from 'react-icons/fa'

import { BoardPreview } from './board-preview.jsx'

export const BoardList = ({ boards, onUpdateBoard }) => {
  const buttonRef = useRef()
  const dispatch = useDispatch()

  const onModal = (category) => {
    dispatch(
      setModal({
        element: buttonRef.current,
        category,
        title: category,
        position: utilService.getPosition(buttonRef.current),
      })
    )
  }

  const starredBoards = boards.filter((board) => board.isStarred)
  const unStarredBoards = boards.filter((board) => !board.isStarred)

  return (
    <main>
      {!!starredBoards.length && (
        <div className="board-section-header">
          <div className="board-section-header-icon">
            <span className="workspace-icon">
              <HiOutlineStar />
            </span>
          </div>
          <h3 className="board-section-header-name">Starred boards</h3>
        </div>
      )}

      {!!starredBoards.length && (
        <ul className="board-section-list">
          {starredBoards.map((board) => (
            <BoardPreview board={board} onUpdateBoard={onUpdateBoard} key={board._id} />
          ))}
        </ul>
      )}

      {/* Recently viewed */}
      <div className="board-section-header">
        <div className="board-section-header-icon">
          <span className="workspace-icon">
            <FaRegClock />
          </span>
        </div>
        <h3 className="board-section-header-name">Recently viewed</h3>
      </div>

      <ul className="board-section-list">
        <li
          className="board-section-list-item"
          ref={buttonRef}
          onClick={(ev) => {
            ev.stopPropagation()
            onModal('Create board')
          }}
        >
          <div className="board-tile mod-add">
            <p className="board-tile-details-center">
              <span>Create new board</span>
            </p>
          </div>
        </li>
        {unStarredBoards.map((board) => (
          <BoardPreview board={board} onUpdateBoard={onUpdateBoard} key={board._id} />
        ))}
      </ul>
    </main>
  )
}
