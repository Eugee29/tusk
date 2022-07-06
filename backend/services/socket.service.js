var gIo = null

function setupSocketAPI(http) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })
  gIo.on('connection', (socket) => {
    socket.on('listen-to-board', (topic) => {
      if (socket.myTopic === topic) return
      if (socket.myTopic) {
        socket.leave(socket.myTopic)
      }
      socket.join(topic)
      socket.myTopic = topic
    })

    socket.on('board-activity', (board) => {
      socket.broadcast.to(socket.myTopic).emit('board-activity', board)
    })
  })
}

module.exports = {
  setupSocketAPI,
}
