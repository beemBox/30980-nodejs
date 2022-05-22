/** 
*? Condigna de Desafío Genérico 01
** Desarrollar un servidor en node.js que escuche peticiones en el puerto 8080 y responda un mensaje de acuerdo a la hora actual:
** Si la hora actual se encuentra entre las 6 y las 12 hs será 'Buenos días!'.
** Entre las 13 y las 19 hs será 'Buenas tardes!'.
** De 20 a 5 hs será 'Buenas noches!'.
** Se mostrará por consola cuando el servidor esté listo para operrar y en qué pueto lo está haciendo.
*/
import http from 'http'
const PORT = 8080

const server = http.createServer((req, res) => { // creamos el servidor
  console.log(req)
  const date = (new Date()).getHours()
  console.log('date: ' + date)

  if (date => 6 && date < 12)
    return res.end("Buenos días!")
  else if (date => 13 && date < 19)
    return res.end("Buenas tardes!")
  else if (date => 19 || date < 5)
    return res.end("Buenas noches!")

  return res.end('Mensaje por defecto.'); // si uso dose veces res.end() termino teniendo un error ERR_STREAM_WRITE_AFTER_END: write after end (porque ya se envió una respuesta con end).
  // la forma de resolver este tema es poniendo un return a cada res.end()
});


server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})