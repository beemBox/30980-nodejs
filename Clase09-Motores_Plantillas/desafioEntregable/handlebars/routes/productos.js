const express = require('express')
const router = express.Router()

let storeProductos = []

//* /productos
router.post('/', (req, res) => {
  storeProductos.push(req.body)
  console.log(req.body)
  const datos = {
    title: 'Lista de Productos',
    sectionHeading: 'Carga de Productos',
    productos: storeProductos,
    hasProductos: storeProductos.length > 0,
    layout: 'index'
  }
  res.render('tablaProductos', datos)
})

module.exports = router