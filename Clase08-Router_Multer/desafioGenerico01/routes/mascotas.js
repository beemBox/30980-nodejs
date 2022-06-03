import express from 'express'
const router = express.Router()

// Creamos el array donde va a ir almacenando los datos.
let mascotas = []

router.get('/mascotas', (req, res) => {
  res.json(mascotas)
})

router.post('/mascotas', (req, res) => { //! acordate en postman poner el content-type json para esto.
  const { nombre, raza, edad } = req.body
  console.log(req.body)
  mascotas.push({ nombre, raza, edad })
  console.log(mascotas)
  res.json(mascotas)
})

export default router