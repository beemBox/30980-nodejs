import express from 'express'
import productos from './routes/productos.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Middleware para productos
app.use('/api/productos', productos)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})