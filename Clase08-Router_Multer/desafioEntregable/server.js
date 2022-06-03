/**
 *  TODO: Consigna
 ** 1) Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
 *?     a) Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor.
 *?     b) Ruga get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles.
 ** 2) Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.
 *! Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
 */

import express from 'express'
import Contenedor from './Contenedor.js'
import Utils from './utils/Utils.js'
//* Setup de servidor
const app = express()
const PORT = process.env.PORT || 8080

const NOMBRE_ARCHIVO = 'productos.txt'

// * Insertamos nuevos objetos en el archivo productos.txt antes de iniciar el servidor.
const fileContainer = new Contenedor(NOMBRE_ARCHIVO)
const objNuevo = {
  "title": "Bolígrfo",
  "price": 299.99,
  "thumbnail": "none",
  "id": 0
}
setTimeout(() => fileContainer.save(objNuevo), 1000)

const objNuevo2 = {
  "title": "Lápiz",
  "price": 29.99,
  "thumbnail": "none",
  "id": 0
}

setTimeout(() => fileContainer.save(objNuevo2), 2000)
const objNuevo3 = {
  "title": "Marcador",
  "price": 700.49,
  "thumbnail": "none",
  "id": 0
}
setTimeout(() => fileContainer.save(objNuevo3), 3000)

app.get('/', (req, res) => res.send('Página principal/raíz')) // root

app.get('/productos', (req, res) => {
  return fileContainer.getAll()
    .then(data => {
      res.json(data)
    })
    .catch(err => Utils.error(`Ha ocurrido un error al cargar el endpoint /productos.`, err, true))
})

app.get('/productoRandom', (req, res) => {
  fileContainer.getRandomObject()
    .then(randomProd => {
      res.json(randomProd)
    })
    .catch(err => Utils.error(`Ha ocurrido un error al cargar el endpoint /productoRandom`, err, true))
})

// Dejamos el servidor en escucha
app.listen(PORT, () => Utils.log(`Server is listening on port [${PORT}]`))