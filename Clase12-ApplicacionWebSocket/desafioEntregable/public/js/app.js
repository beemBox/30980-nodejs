const socket = io()

const form = document.querySelector('#formProductos')
const msgForm = document.querySelector('#formMsg')
const productsListBody = document.querySelector('.products-list__body')
const msgSendBtn = document.querySelector('.msg-send')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  // le mando el producto
  socket.emit('newProduct', {
    nombre: form.title.value,
    precio: form.price.value,
    descripcion: form.thumbnail.value,
  })
})

msgForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // Envío usuario y mensaje
  socket.emit('newMsg', {
    user: document.querySelector('input[name=userName]').value.trim(),
    msg: document.querySelector('input[name=msg]').value.trim(),
  })
})


socket.on('refreshProducts', products => {
  const prodRows = products.map(product => {
    return `
      <div class="products-list__row">
        <span>${product.nombre}</span>
        <span>${product.precio}</span>
        <span>${product.descripcion}</span>
      </div>
      `
  }).join(' ')
  productsListBody.innerHTML = prodRows
});

socket.on('refreshMsgs', msgs => {
  return `<span>${msg.user}</span>
  <p>${msg.msg}</p>`
})