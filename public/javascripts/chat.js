class Chat {
  constructor(socket) {
    this.socket = socket
  }

  sendMessage(room, msg) {
    this.socket.emit('message', {text: msg, room})
  }

  changeRoom(room) {
    this.socket.emit('join', {newRoom: room})
  }

  processCommand(command) {
    const words = command.split(' ')
    const cmd = words[0].split('/')[1]
    let msg = false

    switch (cmd) {
      case 'join':
        words.shift()
        const room = words.join(' ')
        this.changeRoom(room)
        break
      case 'nick':
        words.shift()
        const name = words.join(' ')
        this.socket.emit('nameChange', name)
        break
      default:
      msg = 'Invalid Command'
      break
    }

    return msg
  }

}

module.exports = Chat

// function Chat (socket) {
//   this.socket = socket
// }
//
// Chat.prototype.sendMessage = function (msg) {
//   this.socket.emit('message', {text: msg})
// }
//
// Chat.prototype.changeRoom = function (room) {
//   this.socket.emit('join', {newRoom: room})
// }
//
// Chat.prototype.processCommand = function (command) {
//   const words = command.split(' ')
//   const parsedCmd = words[0].substring(1, words[0].length).toLowerCase()
//   let msg = false
//
//   switch (parsedCmd) {
//     case 'join':
//       words.shift()
//       const room = words.join(' ')
//       this.changeRoom(room)
//       break
//     case 'nick':
//       words.shift()
//       const name = words.join(' ')
//       this.socket.emit('nameAttempt', name)
//       break
//     default:
//       msg = 'Unrecognized command.'
//       break
//   }
//   return msg
// }
//
// module.exports = Chat
