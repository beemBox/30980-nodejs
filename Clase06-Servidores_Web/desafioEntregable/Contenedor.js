//? lo paso a ES6 import de modules (type: 'module' en package.json).
import fs from 'fs'
import { create, all } from 'mathjs'
import Utils from './utils/Utils.js'

const math = create(all, {}) // no me funcionaba con el import

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
    this.filePath = './' + this.fileName
  }

  /**
   * * Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
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
      } else
        objArr[idx] = { ...newObj, id: objArr[idx].id }

      await _saveFile.call(this, objArr)
        .then(msg => Utils.success(`Se ha guardado el objeto '${newObj.title}' en el archivo ${this.fileName}`))
        .catch(err => Utils.error(`Ha ocurrido un error al escribir el archivo ${this.fileName}. ${err.message}`))
    } catch (err) {
      Utils.error(`Ha ocurrido un inconveniente al guardar el archivo ${this.fileName}.`, err, true)
    }
  }

  /**
   ** Recibe un id y devuelve el objeto con ese id, o null si no está.
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
      Utils.error(`Ha ocurrido un error al traer el elemento de ID ${id}.`, err, true)
    }
  }

  /**
   ** Devuelve un array con los objetos presentes en el archivo.
   * @returns []
   */
  async getAll() {
    // devuelve un array con todos los objetos presentes en el archivo
    try {
      const objArr = await _getFile.call(this)
      return objArr ? objArr : console.warn('El archivo está vacío.')
    }
    catch (err) {
      Utils.error(`Ha ocurrido un error al traer los objetos.`, err)
    }
    return objArr
  }
  /**
   ** Elimina del archivo el objeto con el id buscado.
   * @param {void} id 
   */
  async deleteById(id) {
    try {
      let objArr = await _getFile.call(this)
      // filtramos afuera el objeto del id proporcionado
      objArr = objArr.filter(obj => obj.id !== id)
      // guardamos los filtrados
      ///console.log(objArr)
      await _saveFile.call(this, objArr)
        .then(msg => Utils.success(`El objeto de ID '${id}' se ha eliminado correctamente.`))
        .catch(err => Utils.error(`Ha ocurrido un error al escribir el archivo ${this.fileName}. ${err.message}`))
    } catch (err) {
      Utils.error(`Ha ocurrido un error al eleiminar el objeto de ID ${id}`, err, true)
    }
  }

  async deleteAll() {
    // elimina todos los objetos presentes en el archivo
    try {
      await fs.promises.truncate(this.filePath)
        .then(msg => Utils.success(`Se han eliminado todos los objetos del archivo ${this.fileName} exitosament.`))
        .catch(msg => Utils.error(`Ha ocurrido un error al eliminar todos los objetos del archivo ${this.fileName}.`))
    } catch (err) {
      Utils.error(`Ha ocurrido un error al eliminar todos los objetos.}`, err, true)
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
      Utils.error(`Ha ocurrido un error al obtener un objeto random.`, err, true)
    }
  }


  /**
   * ! DEPRECADO
   * ! en .save() primero pruebo con PROMISES directo en este método,
   * ! en los demás le agrego async/away como dice la consigna
   * * (esos métodos entrarían en valoración del desafío, no este). */
  saveSinAsyncAwait(newObj) {
    // guarda un objeto en un archivo y retorna el id asignado
    /**
     * ! se pasa a método privado fuera de la definición de la clase
    */
    fs.promises.readFile(this.filePath)
      .then(file => {
        const objArr = JSON.parse(file)
        //* Esto no es de la consigna: si ya existe el título del producto lo actualizo.
        let idx = objArr.findIndex(
          obj => obj.title.toLowerCase().trim() === newObj.title.toLowerCase().trim()
        )

        if (idx > -1) {
          // si existe el objeto lo actualizo con las nuevas props excepto el ID
          objArr[idx] = { ...newObj, id: objArr[idx].id }

        } else {
          // buscamos el último id
          newObj.id = math.max(...objArr.map(fileObj => fileObj.id)) + 1 // busco el ID más grande y le sumo 1, simulando un autoincrement / identity de una DB relacional

          // guardo el objeto en el array de objetos actualizado.
          // console.log(objArr)
          objArr.push(newObj)
        }
        // se pasa el array actualizado al archivo.
        fs.promises.writeFile(this.filePath, JSON.stringify(objArr, null, 2))
          .then(msg => Utils.success(`Se ha guardado el objeto ${newObj.title} en el archivo ${this.fileName}`))
          .catch(e => Utils.Error(`Ha ocurrido un error al escribir el archivo ${this.fileName}. ${e.message}`))
      })
      .catch(err => Utils.Error(`Ha ocurrido un error al leer el archivo ${this.fileName}. ${err.message}`))

    // retorno el id asignado. Pero igual por referencia ya estaría en el objeto que se pasa como param.
    return newObj.id
  }
}