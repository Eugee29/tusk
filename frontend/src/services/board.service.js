import { httpService } from './http.service'
import { utilService } from './util.service.js'
import { socketService } from './socket.service'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyTodo,
  getEmptyTask,
  getEmptyGroup,
  getEmptyChecklist,
  getEmptyBoard,
  getEmptyAttachment,
}

async function query(filterBy = {}) {
  try {
    return await httpService.get('board/', { filterBy })
  } catch (err) {
    throw err
  }
}

async function getById(boardId) {
  try {
    return await httpService.get(`board/${boardId}`)
  } catch (err) {
    throw err
  }
}

async function remove(boardId) {
  try {
    return await httpService.delete(`board/${boardId}`)
  } catch (err) {
    throw err
  }
}

async function save(board) {
  try {
    if (board._id) {
      socketService.emit('board-activity', board)
      const savedBoard = await httpService.put(`board/${board._id}`, board)
      return savedBoard
    } else {
      return await httpService.post(`board/`, board)
    }
  } catch (err) {
    throw err
  }
}

function getEmptyTask(title) {
  return {
    id: utilService.makeId(),
    createdAt: Date.now(),
    archivedAt: null,
    title,
    description: '',
    checklists: [],
    members: [],
    labelIds: [],
    dueDate: null,
    byMember: {
      _id: 'u102',
      username: 'Eranavichzer',
      fullname: 'Eran Avichzer',
      imgURL:
        'https://s.yimg.com/uu/api/res/1.2/UFrbnCxEMnNRJIEG2g3hIg--~B/aD02NzU7dz0xMjAwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/latestly_557/7c791a28696b3b24b70c447c07b37226',
    },
    style: {},
  }
}

function getEmptyAttachment() {
  return {
    id: utilService.makeId(),
    createdAt: Date.now(),
    fileUrl: '',
  }
}

function getEmptyGroup(title) {
  return {
    id: utilService.makeId(),
    title,
    archivedAt: null,
    tasks: [],
  }
}

function getEmptyTodo() {
  return {
    id: utilService.makeId(),
    isDone: false,
    title: '',
  }
}

function getEmptyChecklist() {
  return {
    id: utilService.makeId(),
    title: '',
    todos: [],
  }
}

function getEmptyBoard() {
  return {
    title: '',
    archivedAt: null,
    createdAt: 0,
    isStarred: false,
    createdBy: {
      _id: '',
      fullname: '',
      username: '',
      imgURL: '',
    },
    style: {},
    labels: [
      {
        id: 'l101',
        title: '',
        color: '#63be53',
      },
      {
        id: 'l102',
        title: '',
        color: '#eed62b',
      },
      {
        id: 'l103',
        title: '',
        color: '#fa9e30',
      },
      {
        id: 'l104',
        title: '',
        color: '#e6574c',
      },
      {
        id: 'l105',
        title: '',
        color: '#c374df',
      },
      {
        id: 'l106',
        title: '',
        color: '#2579bd',
      },
    ],
    members: [],
    groups: [],
    activities: [],
  }
}
