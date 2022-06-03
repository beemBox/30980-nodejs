import express from 'express'
import products from './routes/products'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Middleware para productos
app.use('/api/productos', products)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})