class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros || [];
    this.mascotas = mascotas || [];
  }

  getFullName() {
    return `${this.apellido}, ${this.nombre}`;
  }

  addMascota(nombreMascota) {
    if (nombreMascota.length > 0)
      this.mascotas.push(nombreMascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    if (nombre.length > 0 && autor.length > 0)
      this.libros.push(new Libro(nombre, autor));
  }

  getBookNames() {
    return this.libros.reduce((arr, next) => {
      arr.push(next.nombre);
      return arr;
    }, [])
  }

  getBooks() {
    return this.getBookNames(); // porque no usa el mismo nombre en el ejempo (el cliente lo pidió (?))
  }
}

class Libro {
  constructor(nombre, autor) {
    this.nombre = nombre;
    this.autor = autor;
  }
}

// Ejemplos de ejecución

const usuario = new Usuario('Fulanito', 'Cosme', [new Libro('Un Mundo Feliz', 'Aldous Huxley')]);

usuario.addMascota('perro');
usuario.addMascota('gato');
usuario.addBook('La Verdad Sobre el Caso Harry Quebert', 'Jöel Dicker');
usuario.addBook('You Don\'t Know JS', 'Kyle Simpson');

console.log(`Cant. Mascotas: ${usuario.countMascotas()}`);
console.log('getBooks(): ', usuario.getBookNames());
console.log(`Usuario: ${usuario.getFullName()}`);



