/**
 ** Crear un servidor que permita manejar una lista de mascotas y personas. Debe poseer dos rutas principales: '/mascotas' y '/personas', las cuales deben incluir métodos para listar y para agregar recursos:
 ** GET: devolverá la lista requerida en formato objeto.
 ** POST: permitirá guardar una persona ó mascota en array propios en memoria, con el siguiente formato:
 ** Persona -> { nombre: '', apellido: '', edad: 0, mascotas: [] }
 ** Mascota -> { nombre: '', raza: '', edad: 0 }} 
 ** Utilizar el Router de express para definir las rutas base, implementando la subrutas en los métodos correspondientes.
 ** - Probar la funcionalidad con Postman.
 ** - El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen
 */
import express from 'express'
//* la idea del router es que generemos un directorio routes y le vayamos a poner las routes que vamos creando más organicación.
import routerMascotas from './routes/mascotas.js'
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json()) //! esto es para que el servidor entienda el formato json. Lo que hace es parsear a json lo que envía el usuario.
// app.use('/', router) //? esto se pone porque lo vamos ausar como middleware
app.use('/', routerMascotas)


// Listening port 8080
//! No reemplazar el app.listen con router que es solo para las rutas.
app.listen(PORT, () => {
  console.log('Server listening on port 8080...')
})