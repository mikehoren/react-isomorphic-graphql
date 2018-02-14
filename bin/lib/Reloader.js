const socketio = require('socket.io')
const http     = require('http')
const watch    = require('node-watch')
const path     = require('path')

class Reloader {

  constructor() {
    this.server = null;
    this.socket = null;
  }

  open(app) {
    this.server = http.createServer(app)
    const io = socketio(this.server)
    io.on('connection', socket => {
      this.socket = socket;
      watch(path.join(__dirname, '../../public/build'), (evt, name) => {
        const frags = name.split('.');
        const ext   = frags[frags.length - 1];
        if(ext === 'css') {
          socket.emit('change')
        }
      })
    })
    this.server.listen(3001);
  }

  close() {
    this.server.close();
  }

}

module.exports = new Reloader()