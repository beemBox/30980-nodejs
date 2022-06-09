const express = require('express')
const { Server: HttpServer } = require('http')
const { server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app) //! se le pasa el express como parametro al constructor.
const io = new IOServer(httpServer) //! se le pasa el httpServer como parametro al constructor.

const PORT = 8080;
//! Le avisamos el middleware que tiene que usar la static 'public'
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')

})

//todo Inicializamos la conección con el cliente
io.on('connection', (socket) => {
  console.log('¡Nuevo Cliente Conectado!')
})

HttpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})


// res.send() //? manda texto
// res.json() //? manda json
// res.sendfile() //? manda un archivo completo.
// res.render() //? hace un render previo a lo que va a enviar.