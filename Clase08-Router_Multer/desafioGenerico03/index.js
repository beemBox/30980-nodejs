//? MULTER -> es un middleware que se usa para recibir archivos cuando el cliente quiere subir algo.

//todo CONSIGNA DESAFÍO GENÉRICO 03
/**
** Crear un servidor que permita elegir y subir un archivo utilizando un formulario servido desde su espacio público.
** Dicho archivo se almacenará en una carpeta propia del servidor llamada 'uploads'
** El nombre del archivo guardado se formará con el nombre original anteponiéndose un timestamp (Date.now()) seguido con un guión.
** Ejemplo: 1610894554093-clase1.zip
*! Utilizar express y multer en un proyecto de servidor que escuche en el puerto 8080
 */

import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now()
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})

const upload = multer({ storage }) //! verificar si no tengo que poner el storage prop

// Routes
app.post('/upload', upload.single('archivo'), (req, res) => { //? ponemos el middleware de multer asignado a la prop 'upload' como segundo parámetro para que se ejecute cuando el cliente envíe la request de envío de archivo.
  const file = req.file //* multer agrega la propiedad file al objeto req.
  console.log(file)

  if (!file) return res.status(400).send('No se ha seleccionado ningún archivo')

  res.status(200).send(`Archivo <b>${file.originalname}</b> subido correctamente`)
})

app.listen(PORT, () => {
  console.log('Server listening on port 8080...')
})