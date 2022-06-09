import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';
import { isObject } from 'util';

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

let chat = []
let users = []


io.on('connection', channel => {
  io.sockets.emit('chat', chat)
  io.sockets.emit('usersList', users)

  channel.on('incoingMessage', message => {
    users.indexOf(message.nombre) === -1 ? null : channel.emit("changeName")
    chat.push(message)
    users.push(message.nombre)
    emitWarning()
    sendUsers()
  })
})

const emitir = () => io.sockets.emit('chat', chat)
const sendUsers = () => io.sockets.emit('usersList', users)

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})


