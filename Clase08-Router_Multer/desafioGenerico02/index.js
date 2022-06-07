/**
 *! INFO
 *? El middleware es lo primero que toma un request del cliente, si sale todo bien hace una llamada al servicio.
 ** Un ejemplo es un método de auth que sea como middleware, que consulta y si no está autenticado el middleware rechaza la pteición del cliente porque necesita estar logueado.
 *todo Multer es una lib externa que se ua como middleware para recibir archivos cuando el cliente quiere subir algo.
 ** Express es un middleware que se usa para la unión entre front y back mayormente para APIs
 *
 *! express.ststic
 ** static es una función de middleware incorporado en node que se usa para servir archivos estáticos, como imagenes, css, js, etc y que sean accesibles para el cliente.
 ** Por lo que usamos para cuando queremos definir un directorio que queramos que sea público
 */

/**
 *todo CONSIGNA DESAFÍO GENÉRICO 02
 ** Partiendo del ejercicio anterior, generar una carpeta pública 'public' en el servidor, la cual tendrá un archivo index.html.
 ** En ese archivo se incoporarán dos formularios: uno que permita ingresar mascotas y otro personas utilizando el método post
 ** Probar el ingreso de datos mediante los formularios y con Postman
 ** Verificar los datos cargados en cada caso.
*/
//! index.js va llamando los routes de los archivos de rutas según los request que hagan los clientes.
import express from 'express'
import mascotasRoute from './routes/mascotas.js'
import personasRoute from './routes/personas.js'
// const mascotasRoute = require('./routes/mascotas') //! Estos no me toma cuando seteamos en package.json tye: module
// const personasRoute = require('./routes/personas')

const app = express()
const PORT = process.env.PORT || 8080

//! Importa el orden en que ponemos los middlewares
//? Primero los middleware (fijarse el orden)
//? los routes van al final
app.use(express.json()) //* para que el servidor entienda el formato json. Lo que hace es parsear a json lo que envía el usuario.
app.use(express.urlencoded({ extended: true })) //! urlencoded es para recibir los datos por urlencode

app.use(express.static('public')) //* con este middleware designamos la carpeta publica para que sea accesible desde el cliente.

app.use('/mascotas', mascotasRoute) //* Acá definimos el path de la ruta de mascotas
app.use('/personas', personasRoute) //* Defino el path de la ruta para los endpoints de personas

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html') //* Para enviar un archivo público, lo hacemos a través de res.sendFile que recibe __dirname ruta raíz + la ruta del file dentro de la 
  //* carpeta definida como accesible para el cliente con express.static
})


app.listen(PORT, () => {
  console.log('Server listening on port 8080...')
})