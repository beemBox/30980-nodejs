/** 
 * ? Utils no es parte de la consigna, me quedé jugando un rato
 * * probando colores en consola
 *  */

export default class Utils {
  static error(msg, err, showStack) {
    console.log(`\x1b[41m\x1b[31m Error: ${msg}${(showStack && ('\n\n ' + err.stack))} \x1b[0m`)
    return { error: msg }
  }

  static log(msg) {
    console.log(`\x1b[36m\x1b[2m ${msg} \x1b[0m`)
  }

  static success(msg) {
    console.log(`\x1b[37m\x1b[0m✔️  ${msg} \x1b[0m`)
    return msg
  }

  static msg(msg) {
    console.log(`\x1b[33m ${msg} \x1b[0m`)
  }

  static getRandomElement(arr, min, max) {
    return math.random() * (max - min) + min;
  }

  /**
   ** Esto era para testear las promises pero la posta es que quería probar printear emojis en terminal y que sea medianamente funcional... los amé
   * @param {*} msg : mensaje a mostrar en testeo
   * @param {[]} arr : array con valores a testear: 1 - obj, 2 - fn, 3 - [params]
   * @param {*} expected : valor esperado
   */
  static async test(msg, arr, expected) {
    // tomo el obj
    const obj = arr.splice(0, 1)[0]
    // llamo a la fn
    const res = await obj[arr[0]](arr[1])
    //fn(arr[0])
    if (expected === res) {
      console.log(console.log(`\x1b[32mTest ${arr[0]}: ${msg} ✔️\n\tExpected: \t${expected}\n\tResult: \t${res}`)) // <- siempre quise usar emojis!!! jaja
      console.log('\x1b[0m')
    } else
      console.log(console.log(`\x1b[31mTest ${arr[0]}: ${msg} ❌\n\tExpected: \t${expected}\n\tResult: \t${res}`))
  }
}

/**
 * ? LISTA DE COLORES PARA CONSOLA (sin package ni plugin)
 * ? Fuente: https://stackoverflow.com/a/41407246
** primer dígito -> estilos y efectos en el texto
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

** 30's -> color de fuente
FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

** 40's -> color del background
BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
 */