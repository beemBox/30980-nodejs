console.clear()
const express = require('express')
const productosRoute = require('./routes/productos.js')
// const carritoRoute = require('./routes/carrito.js')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public')) // archivo estáticos si es que agrego

// base routes
app.use('/api/productos', productosRoute)
// app.use('/api/carrito', carritoRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})