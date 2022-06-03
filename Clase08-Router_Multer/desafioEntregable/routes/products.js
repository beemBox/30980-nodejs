import express from 'express'
const router = express.Router()

let productos = []

router.get('/', (req, res) => {
  res.json(personas)
})

router.post('/', (req, res) => {
  const { nombre, raza, edad } = req.body
  mascotas.push({ nombre, raza, edad })
  res.json(personas)
})

export default router;