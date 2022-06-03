import express from 'express'
const router = express.Router()

let personas = []

router.get('/', (req, res) => {
  res.json(personas)
})

router.post('/', (req, res) => {
  const { nombre, edad } = req.body
  personas.push({ nombre, edad })
  res.json(personas)
})

export default router;