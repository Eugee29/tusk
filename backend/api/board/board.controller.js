const boardService = require('./board.service.js')
const logger = require('../../services/logger.service')

// GET LIST
async function getBoards(req, res) {
  try {
    var queryParams = req.query || {}
    const boards = await boardService.query(JSON.parse(queryParams.filterBy))
    res.json(boards)
  } catch (err) {
    logger.error('Cannot find boards:\n', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

// GET BY ID
async function getBoardById(req, res) {
  try {
    const boardId = req.params.boardId
    const board = await boardService.getById(boardId)
    res.json(board)
  } catch (err) {
    logger.error(`Cannot find board ${boardId}:\n`, err)
    res.status(500).send({ err: 'Failed to get board' })
  }
}

// POST (add board)
async function addBoard(req, res) {
  try {
    const board = req.body
    const addedBoard = await boardService.add(board)
    res.send(addedBoard)
  } catch (err) {
    logger.error(`Cannot add board:\n`, err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}

// PUT (Update board)
async function updateBoard(req, res) {
  try {
    const board = req.body
    const updatedBoard = await boardService.update(board)
    res.json(updatedBoard)
  } catch (err) {
    logger.error(`Cannot update board ${board._id}:\n`, err)
    res.status(500).send({ err: 'Failed to update board' })
  }
}

// DELETE (Remove board)
async function removeBoard(req, res) {
  try {
    const boardId = req.params.boardId
    const removedId = await boardService.remove(boardId)
    res.send(removedId)
  } catch (err) {
    logger.error(`Cannot remove board ${boardId}:\n`, err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

module.exports = {
  getBoards,
  getBoardById,
  addBoard,
  updateBoard,
  removeBoard,
}
