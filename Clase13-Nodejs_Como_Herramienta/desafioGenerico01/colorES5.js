"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//* Realizar un programa que genere un color aleatorio en formato RGB (canal rojo, verde y azul entre 0 y 255) y lo muestre por consola. Este estará implementado en un archivo llamado color.js 
//* La funcionalidad debe estar implementada dentro de una clase y deberá utilizar sintaxis ES6 (const, let, arrow function y template string).
//* Convertir este código ES6 a JS5 con Babel online. Realizar esta conversión en forma automática dentro de un proyecto node.js que utilice Babel CLI
var MAX = 255;

var Color = /*#__PURE__*/_createClass(function Color() {
  var _this = this;

  _classCallCheck(this, Color);

  _defineProperty(this, "getRGB", function () {
    return "rgb(".concat(_this.r, ", ").concat(_this.g, ", ").concat(_this.b, ")");
  });

  _defineProperty(this, "getHEX", function () {
    return "#".concat(_this.r.toString(16)).concat(_this.g.toString(16)).concat(_this.b.toString(16));
  });

  _defineProperty(this, "getHEXA", function () {
    return "#".concat(_this.r.toString(16)).concat(_this.g.toString(16)).concat(_this.b.toString(16));
  });

  _defineProperty(this, "getHSL", function () {
    return "hsl(".concat(_this.r, ", ").concat(_this.g, ", ").concat(_this.b, ")");
  });

  _defineProperty(this, "getHSLA", function () {
    return "hsla(".concat(_this.r, ", ").concat(_this.g, ", ").concat(_this.b, ")");
  });

  this.r = Math.floor(Math.random() * MAX);
  this.g = Math.floor(Math.random() * MAX);
  this.b = Math.floor(Math.random() * MAX);
});
