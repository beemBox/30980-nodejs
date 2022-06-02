import express from 'express'
import querystring from 'querystring' //? esto aparece como deprecado, el legacy termina siendo node:url...
import url from 'node:url' //! son lo mismo

const app = express()
const PORT = process.env.PORT || 8080

// //* Para poder enviar jsons. (no es necesario ahora)
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.get(`/api/sumar/:par1/:par2`, (req, res) => {
  const { par1, par2, num1 = +par1, num2 = +par2 } = req.params // probando como parsear usando destructuring... conviene parseInt() toda la vida
  // console.log((typeof num1))
  const result = num1 + num2;

  res.setHeader('content-type', 'text/plain') //? esto es por defecto?
  res.status(200).send(`Result: ${result}`)
})

//* Recibiendo query
app.get('/api/sumar', (req, res) => {
  console.log(req.query)
  const num1 = parseInt(req.query.num1)
  const num2 = parseInt(req.query.num2)

  // res.setHeader('content-type', 'text/plain')
  // res.status(200).send(`Result: ${num1 + num2}`)
  // res.status(200).send(String(num1 + num2)) //! send recibe string...
  res.status(200).send('Result: ' + (num1 + num2).toString())
})

app.get('/api/operacion/:nums', (req, res) => {
  console.log(req.params.nums)
  console.log(req.query)
  res.status(200).send(`Result:`)
})


//! queda obsoleta por el uso de query params...
app.get('/api/sumar*', (req, res) => {
  console.log(querystring)
  res.status(200).send('Solo se puede operar con dos números.')
})

app.get('*', (req, res) => {
  res.status(200).send('Error 404 No se ha encontrado la página que estás buscando.') //* para handlear los 400... pero bien.
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})