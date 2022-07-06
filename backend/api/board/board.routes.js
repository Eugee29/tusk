const express = require('express')

const { getBoards, getBoardById, addBoard, updateBoard, removeBoard } = require('./board.controller')
const router = express.Router()

router.get('/', getBoards)
router.get('/:boardId', getBoardById)
router.post('/', addBoard)
router.put('/:boardId', updateBoard)
router.delete('/:boardId', removeBoard)

module.exports = router
