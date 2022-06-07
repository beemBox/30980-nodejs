//? lo paso a ES6 import de modules (type: 'module' en package.json).
import fs from 'fs'
import { create, all } from 'mathjs'
import Utils from './utils/Utils.js'

const math = create(all, {}) //! no me funcionaba con el import

/**
 ** Método asíncrono privado para obtener el archivo desde el filePath definido al instanciar la clase Contenedor 
 * @returns [{}]
 */
async function _getFile() {
  try {
    return await JSON.parse(await fs.promises.readFile(this.filePath))
  } catch (e) {
    return Utils.error(`Ha ocurrido un error al escribir el archivo ${this.fileName}. ${e.message}`)
  }
}
/**
 ** Método asíncrono privado para guardar el archivo
 * @param {{}}} objArr 
 * @param {string} msg : mensaje exitoso para la fn saveFile
 */
async function _saveFile(objArr) {
  return fs.promises.writeFile(this.filePath, JSON.stringify(objArr, null, 2))
}

export default class Contenedor {
  constructor(fileName) {
    this.fileName = fileName
    this.filePath = `./${fileName}.json`
  }

  /**
   * * Recibe un producto, lo guarda en el archivo, devuelve el id asignado
   * @param {{}} newObj
   * @returns {number} id
   */
  async save(newObj) {
    try {
      const objArr = await _getFile.call(this)
      // verifico si el objeto existe en el archivo
      const idx = objArr.findIndex(
        obj => newObj.title.toLowerCase().trim() === obj.title.toLowerCase().trim()
      )

      if (idx === -1) {
        newObj.id = math.max(...objArr.map(fileObj => fileObj.id)) + 1
        objArr.push(newObj)
      } else {
        objArr[idx] = { ...newObj, id: objArr[idx].id }
        newObj = objArr[idx]
      }

      await _saveFile.call(this, objArr)
        .then(msg => { Utils.success(`Se ha guardado el producto '${newObj.title}' en el archivo ${this.fileName}`) })
        .catch(err => Utils.error(`Ha ocurrido un error al escribir el archivo ${this.fileName}. ${err.message}`))

      return newObj
    } catch (err) {
      return Utils.error(`Ha ocurrido un inconveniente al guardar el archivo ${this.fileName}.`, err, true)
    }
  }

  /**
   ** Recibe un id y devuelve el producto con ese id, o null si no está.
   * @param {number} id 
   * @returns {}
   */
  async getById(id) {
    try {
      const objArr = await _getFile.call(this)
      // busca y retorna el objeto filtrado por id
      const obj = objArr.find(obj => obj.id === id)
      return obj ? obj : null // si no le encuentra retornamos null (en vez de undefined)
    } catch (err) {
      return Utils.error(`Ha ocurrido un error al traer el elemento de ID ${id}.`, err, true)
    }
  }

  async update(newObj) {
    try {
      const objArr = await _getFile.call(this)
      // busca y retorna el objeto filtrado por id
      const obj = objArr.find(obj => obj.id === newObj.id)

      //* Mapeamos los nuevos valores del objeto con Object.keys aprovechando que find devuelve la referencia del objeto
      //* de esta manera si uno de los datos no se cambia, entonces queda igual a como estaba.
      //! No sé si es posible con destructuring.
      Object.keys(obj).forEach(key => {
        console.log(key)
        if (key !== 'id' && newObj[key] !== obj[key]) {
          obj[key] = newObj[key]
        }
      })

      // console.log(objArr)
      return await _saveFile.call(this, objArr)
        .then(msg => {
          Utils.success(`Se ha actualizado el producto '${obj.title}' en el archivo ${this.fileName}`)
          return obj
        })
        .catch(err => Utils.error(`Ha ocurrido un error al escribir el archivo ${this.fileName}.${err.message}`))

    } catch (err) {
      return Utils.error(`Ha ocurrido un error al actualizar el producto de ID ${newObj.id}.`, err, true)
    }
  }

  /**
   ** Devuelve un array con los productos presentes en el archivo.
   * @returns []
   */
  async getAll() {
    // devuelve un array con todos los objetos presentes en el archivo
    try {
      const objArr = await _getFile.call(this)
      return objArr ? objArr : console.warn('El archivo está vacío.')
    }
    catch (err) {
      return Utils.error(`Ha ocurrido un error al traer los productos.`, err)
    }
    return objArr
  }
  /**
   ** Elimina del archivo el producto con el id buscado.
   * @param {void} id 
   */
  async deleteById(id) {
    try {
      let objArr = await _getFile.call(this)

      if (objArr.some(obj => obj.id === id)) {
        // filtramos afuera el objeto del id proporcionado
        objArr = objArr.filter(obj => obj.id !== id)

        ///console.log(objArr)
        return await _saveFile.call(this, objArr)
          .then(msg => Utils.success(`El producto de ID '${id}' se ha eliminado correctamente.`))
          .catch(err => Utils.error(`Ha ocurrido un error al escribir el archivo ${this.fileName}.${err.message}`))
      } else {
        return Utils.error(`No existe el producto con ID '${id}'.`)
      }
    } catch (err) {
      return Utils.error(`Ha ocurrido un error al eleiminar el producto de ID ${id}`, err, true)
    }
  }

  async deleteAll() {
    // elimina todos los objetos presentes en el archivo
    try {
      await fs.promises.truncate(this.filePath)
        .then(msg => Utils.success(`Se han eliminado todos los productos del archivo ${this.fileName} exitosament.`))
        .catch(msg => Utils.error(`Ha ocurrido un error al eliminar todos los productos del archivo ${this.fileName}.`))
    } catch (err) {
      return Utils.error(`Ha ocurrido un error al eliminar todos los productos.} `, err, true)
    }
  }

  async getRandomObject() {
    try {
      // traigo los objetos
      const objArr = await _getFile.call(this)
      // determino el rango según la cantidad de elementos del array de objetos
      const randomIdx = math.floor(math.random() * (objArr.length - 0 + 1)) + 0
      console.log(randomIdx)
      return await objArr[randomIdx]
    } catch (err) {
      return Utils.error(`Ha ocurrido un error al obtener un producto random.`, err, true)
    }
  }
}