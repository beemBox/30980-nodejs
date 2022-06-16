//* Realizar un programa que genere un color aleatorio en formato RGB (canal rojo, verde y azul entre 0 y 255) y lo muestre por consola. Este estará implementado en un archivo llamado color.js 
//* La funcionalidad debe estar implementada dentro de una clase y deberá utilizar sintaxis ES6 (const, let, arrow function y template string).
//* Convertir este código ES6 a JS5 con Babel online. Realizar esta conversión en forma automática dentro de un proyecto node.js que utilice Babel CLI
const MAX = 255

class Color {
  constructor() {
    this.r = Math.floor(Math.random() * MAX)
    this.g = Math.floor(Math.random() * MAX)
    this.b = Math.floor(Math.random() * MAX)
  }

  getRGB = () => {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }

  getHEX = () => {
    return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`
  }

  getHEXA = () => {
    return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`
  }

  getHSL = () => {
    return `hsl(${this.r}, ${this.g}, ${this.b})`
  }


  getHSLA = () => {
    return `hsla(${this.r}, ${this.g}, ${this.b})`
  }

}