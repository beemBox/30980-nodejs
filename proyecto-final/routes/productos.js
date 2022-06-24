const express = require('express')
const controller = require('../controllers/productosController.js')
const router = express.Router()

//* GET todos los productos.
router.get('/', controller.getAll)
//* GET devuelve un producto según su id.
router.get('/:id', controller.getById)
//* POST recibe y agrega un producto, y lo devuelve con su id.
router.post('/', controller.save)
//* PUT recibe y actualiza un producto según su id.
router.put('/:id', controller.update)
//* DELETE elimina un producto según su id
router.delete('/:id', controller.deleteById)

//* Ruta inexistente
router.get('/', (req, res) => {
  res.status(400).send(`Esta ruta no existe`)
})

module.exports = router