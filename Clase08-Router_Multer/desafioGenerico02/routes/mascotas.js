import express from 'express'
const router = express.Router()

let mascotas = []

router.get('/', (req, res) => {
  res.json(personas)
})

router.post('/', (req, res) => {
  const { nombre, apellido, edad } = req.body
  mascotas.push({ nombre, apellido, edad })
  res.json(mascotas)
})

export default router;