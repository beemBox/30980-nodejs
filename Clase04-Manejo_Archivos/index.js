console.clear()

const Contenedor = require('./Contenedor')
const Utils = require('./utils/Utils')



const fileContainer = new Contenedor('./productos.txt');

//* Insertamos nuevos objetos en el archivo productos.txt
const objNuevo = {
  "title": "Bolígrfo",
  "price": 299.99,
  "thumbnail": "none",
  "id": 0
}

const objNuevo2 = {
  "title": "Lápiz",
  "price": 29.99,
  "thumbnail": "none",
  "id": 0
}

const objNuevo3 = {
  "title": "Marcador",
  "price": 700.49,
  "thumbnail": "none",
  "id": 0
}

//* Descomentar estas líneas para probar nuevamente
// fileContainer.save(objNuevo)
// objNuevo.price = 599.99 // actualizo el precio
// fileContainer.save(objNuevo)
// fileContainer.save(objNuevo2)

//* obtengo el objeto por ID
// fileContainer.getById(3) // este debería ser Globo Terráqueo
//   .then(obj => console.log(obj))
//   .catch(e => Utils.Error('Error al consultar obj ID 3'))

// Utils.test('Debe devolver null', [fileContainer, 'getById', 15], null)

// Primero creo el obj y después lo elimino.
// fileContainer.save(objNuevo3)
// setTimeout(() => {
//   fileContainer.deleteById(6)
// }, 1000)

//! Elimnamos todos los objetos
setTimeout(() => {
  fileContainer.deleteAll()
}, 1000)
