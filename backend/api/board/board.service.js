const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
  try {
    const collection = await dbService.getCollection('board')
    var boards = await collection.find().toArray()
    return boards
  } catch (err) {
    throw err
  }
}

async function getById(boardId) {
  try {
    const collection = await dbService.getCollection('board')
    const board = collection.findOne({ _id: ObjectId(boardId) })
    return board
  } catch (err) {
    throw err
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection('board')
    await collection.deleteOne({ _id: ObjectId(boardId) })
    return boardId
  } catch (err) {
    throw err
  }
}

async function add(board) {
  try {
    const collection = await dbService.getCollection('board')
    const addedBoard = await collection.insertOne(board)
    return addedBoard.ops[0]
  } catch (err) {
    throw err
  }
}

async function update(board) {
  try {
    var id = ObjectId(board._id)
    delete board._id
    const collection = await dbService.getCollection('board')
    await collection.updateOne({ _id: id }, { $set: { ...board } })
    board._id = id
    return board
  } catch (err) {
    throw err
  }
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
}
