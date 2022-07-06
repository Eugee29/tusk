import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { boardService } from '../services/board.service.js'
import { activityService } from '../services/activity.service.js'
import { socketService } from '../services/socket.service.js'

import { loadUsers } from '../store/user/user.action.js'

import { BoardHeader } from '../cmps/board/board-header.jsx'
import { GroupList } from '../cmps/group/group-list.jsx'

export const BoardDetails = () => {
  const [board, setBoard] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector(({ userModule }) => userModule)

  useEffect(() => {
    loadBoard()
    dispatch(loadUsers())
    socketService.emit('listen-to-board', params.boardId)
    socketService.on('board-activity', loadBoard)
    return () => {
      socketService.off('board-activity', loadBoard)
    }
    // eslint-disable-next-line
  }, [params.boardId])

  const loadBoard = async (updatedBoard) => {
    if (!updatedBoard) updatedBoard = await boardService.getById(params.boardId)
    setBoard(updatedBoard)
  }

  const onUpdateBoard = async (updatedBoard, activity) => {
    if (activity) updatedBoard = addActivity(updatedBoard, activity)
    setBoard({ ...updatedBoard })
    try {
      await boardService.save(updatedBoard)
    } catch (err) {
      console.error(err)
    }
  }

  const addActivity = (board, activity) => {
    const newBoard = activityService.getActivityUpdatedBoard(board, activity, user)
    return newBoard
  }

  if (!board)
    return (
      <div className="icon-bars">
        <div className="bar board"></div>
        <div className="bar board"></div>
        <div className="bar board"></div>
      </div>
    )

  return (
    <main
      className="board-details"
      style={{
        background: board.style.bgImg.length > 10 ? `url(${board.style.bgImg})` : `${board.style.bgImg}`,
      }}
    >
      <BoardHeader board={board} onUpdateBoard={onUpdateBoard} />
      <GroupList board={board} onUpdateBoard={onUpdateBoard} />
      <Outlet context={{ onUpdateBoard, board }} />
    </main>
  )
}
