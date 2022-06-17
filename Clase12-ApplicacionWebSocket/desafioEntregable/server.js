const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const PORT = process.env.PORT || 8080
const productos = require('./routes/productos.js')
const { engine } = require('express-handlebars')
const { on } = require('stream')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public'))) // que se cargen los archivos estáticos

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('view options', { layout: 'index' })
app.set('views', path.join(__dirname, '/public/views'))

const products = []
const messages = []

// Seteamos os eventos de socketio
io.on('connection', channel => {
  console.log('Nuevo usuario logueado')
  emitirProductos()
  channel.on('newProduct', product => {
    productss.push(product)
    emitirProductos()
  })

  channel.on('newMsg', msgObj => {
    console.log(msgObj)
  })

})

const emitirProductos = () => io.emit('refreshProducts', products)

//MW productos
// app.use('/productos', productos) //! de momento lo frenamos

app.get('/', (req, res) => {
  const datos = { titulo: 'Formulario de Productos', sectionHeading: 'Carga de Productos', layout: 'index' }
  res.render('formProductos', datos)
})


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})