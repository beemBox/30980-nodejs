import express from 'express'
import { number } from 'mathjs'

const app = express()
const PORT = process.env.PORT || 8080

//!IMPORTANTE: Se usa para POST, PUT, DELETE porque sino no nos toma el body como json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/frase', (req, res) => {
  res.status(200).json.apply({ frase })
})

app.get('/api/palabras/:pos', (req, res) => {
  const pos = parseInt(req.params.pos)
  const fraseArray = frase.split(' ') // separamos cada palabra por espacio

  if (Number.isNaN(pos)) // <- Number.isNaN es recomendado por Kyle Simpson
    return res.status(400).json({ error: 'El parámetro no es numérico.' })

  if (pos < 0 || pos > fraseArray.length)
    return res.status(400).json({ error: 'El parámetro está fuera del rango.' })

  //* devolvemos la frase
  res.status(200).json({ busqueda: fraseArray[pos] })
})

app.post('/api/palabras', (req, res) => {
  console.log(req.body)
  const { palabra } = req.body

  frase = frase.concat(`${palabra.trim()}`)

  const payload = {
    added: palabra.trim(),
    pos: frase.split(' ').length
  }

  console.log(frase)
  res.status(200).json(payload)
})

app.put('/api/palabras/:pos', (req, res) => {
  const pos = parseInt(req.params.pos) - 1
  const { palabra } = req.body

  // let fraseArr = 
})


app.listen(PORT, () => console.log('Server listening on port 8080...'))