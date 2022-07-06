import React, { useEffect, useState } from 'react'

import { BoardList } from '../cmps/board/board-list.jsx'
import { boardService } from '../services/board.service.js'

export const Workspace = () => {
  const [boards, setBoards] = useState(null)

  useEffect(() => {
    loadBoards()
    // eslint-disable-next-line
  }, [])

  const loadBoards = async () => {
    const boards = await boardService.query()
    setBoards(boards)
  }

  const onUpdateBoard = async (updatedBoard) => {
    await boardService.save(updatedBoard)
    const updatedBoards = boards.map((board) => (board._id === updatedBoard._id ? updatedBoard : board))
    setBoards(updatedBoards)
  }

  if (!boards)
    return (
      <div className="icon-bars">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    )

  return (
    <main className="workspace">
      <BoardList boards={boards} onUpdateBoard={onUpdateBoard} />
    </main>
  )
}
