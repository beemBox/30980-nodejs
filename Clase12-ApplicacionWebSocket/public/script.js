const socket = io()
const nameInput = document.getElementById('nombre')
const messageInput = document.getElementById('message')


function sendMessage() {
  const message = {
    name: nameInput.value,
    text: messageInput.value,
  }

  socket.emit('incomingMessage', menssage)
  messageInput.value = ''
  messageInput.focus()
}

socket.on('chat', message => {
  const texto = message.map(msg => {
    return (`<li class="clearfix">
    <div class="message-data text-right">
      <span class="message-data-time">10:10 AM, Today</span>
      <img
        src="https://bootdey.com/img/Content/avatar/avatar7.png"
        alt="avatar"
      />
    </div>
    <div class="message other-message float-right">
      Hi Aiden, how are you? How is the project coming along?
    </div>
  </li>
    `)
  }).join('')

  document.getElementById('messages').innerHTML = texto
})

socket.on('usersList', users => {
  const liUser = Object.values(users).map(user => {
    return (`
    <li class="clearfix">
      <img
        src="https://bootdey.com/img/Content/avatar/avatar8.png"
        alt="avatar"
      />
      <div class="about">
        <div class="name">Monica Ward</div>
        <div class="status">
          <i class="fa fa-circle online"></i> online
        </div>
      </div>
    </li>`)
  }).join(" ")

  document.getElementById('users-list').innerHTML = liUser
})

socket.on('changeName', () => {
  nameInput.disable = false
  return alert('El nombre ya existe')
})