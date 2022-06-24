const express = require('express')
const Carrito = require('../models/Carrito.js')
const router = express.Router()

let carrito = []

const productoModel = new Carrito() //! De momento sigo usando fs
console.log(productoModel)

//* GET todos los productos.
router.get('/', (req, res) => {
  contenedor.getAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).send(err.toString())
    })
})

//* GET devuelve un producto según su id.
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  contenedor.getById(id)
    .then(obj => {
      res.status(200).json(obj)
    })
    .catch(err => {
      res.status(500).send(err.toString())
    })
})

//* POST recibe y agrega un producto, y lo devuelve con su id.
router.post('/', (req, res) => {
  const { title, price = parseInt(price), thumbnail = 'none' } = req.body
  contenedor.save({ title, price, thumbnail })
    .then(obj => {
      res.status(200).json(obj)
    })
    .catch(err => {
      res.status(400).send(err.toString())
    })
})

//* PUT recibe y actualiza un producto según su id.
router.put('/:id', (req, res) => {
  contenedor.update(req.body)
    .then(obj => {
      res.status(200).json(obj)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send(err.toString())
    })
})

//* DELETE elimina un producto según su id
router.delete('/:id', (req, res) => {
  contenedor.deleteById(parseInt(req.params.id))
    .then(msg => {
      res.status(200).send(msg)
    })
    .catch(err => {
      res.status(500).send(err.toString())
    })
})

router.get('/', (req, res) => {
  res.status(400).send(`Esta ruta no existe`)
})

module.exports = router