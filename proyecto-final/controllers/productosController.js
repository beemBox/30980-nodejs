const Producto = require('../models/Producto.js')

let productos = []

const model = new Producto('productos') //! De momento sigo usando fs

class ProductosController {
  static getAll(req, res) {
    model.getAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).send(err.toString())
      })
  }

  static getById(req, res) {
    const id = parseInt(req.params.id)
    model.getById(id)
      .then(obj => {
        res.status(200).json(obj)
      })
      .catch(err => {
        res.status(500).send(err.toString())
      })
  }

  static save(req, res) {
    const {
      nombre,
      precio = parseInt(precio),
      foto = 'none',
      descripcion,
      stock
    } = req.body
    model.save({ nombre, precio, foto, descripcion, stock })
      .then(obj => {
        res.status(200).json(obj)
      })
      .catch(err => {
        res.status(400).send(err.toString())
      })
  }

  static update(req, res) {
    // Agrego el id del producto
    req.body = parseInt(req.params.id)

    model.update(req.body)
      .then(obj => {
        res.status(200).json(obj)
      })
      .catch(err => {
        // console.log(err)
        res.status(400).send(err.toString())
      })
  }

  static deleteById(req, res) {
    model.deleteById(parseInt(req.params.id))
      .then(msg => {
        res.status(200).send(msg)
      })
      .catch(err => {
        res.status(500).send(err.toString())
      })
  }
}

module.exports = ProductosController