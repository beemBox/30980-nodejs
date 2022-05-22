/**
 ** Crear un proyecto de servidor http edn node.js que utilice la dependencia express, escuche en el puerto 8080 y tenga tres rutas get configuradas:
 *? A) '/' en esta ruta raíz, el servidor enviará string con un elemento de título nivel 1 (un h1 en formato HTML) que contenga el mensaje: 'Bienvenidos al servidor express' en color azul.
 *? B) '/fyh' donde se devolverá la fecha y hora actual en formato objeto:
 *?    { fyh: '11/1/2021 11:36:04' }
 *
 * TODO: Mostrar por consola el puerto de escucha del servidor al momento de realizar el listen. En caso de error, representar el detalle.
 */

import express from 'express'
import moment from 'moment'

// setup
const app = express()
const PORT = 8080

// accumulators
let visitas = 0;

// En express nosotros definimos con get qué ruta queremos escuchar (endpoint)
app.get('/', (req, res) => {
  res.send('<h1 style="color: blue">Hola a todos desde Express</h1>')
})

app.get('/visitas', (req, res) => {
  visitas++
  res.send(`<h1 style="color: red">Cantidad de visitas: ${visitas}</h1>`)
})

app.get('/fyh', (req, res) => {
  res.json({ fyh: moment().format('DD/MM/YYYY h:mm:s') }) // .json por dentro retorna un send desde el módulo de http.
})

app.get('*', (req, res) => {
  // Este es por defecto cuando cae en cualquier otro endpoint.
  res.send('404 - No hemos encontrado la página que buscas.')
})

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`)
})