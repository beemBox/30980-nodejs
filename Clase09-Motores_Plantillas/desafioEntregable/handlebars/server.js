const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080
const productos = require('./routes/productos.js')
const { engine } = require('express-handlebars')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('view options', { layout: 'index' })
app.set('views', path.join(__dirname, '/public/views'))

//MW productos
app.use('/productos', productos)

app.get('/', (req, res) => {
  const datos = { titulo: 'Formulario de Productos', sectionHeading: 'Carga de Productos', layout: 'index' }
  res.render('formProductos', datos)
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})