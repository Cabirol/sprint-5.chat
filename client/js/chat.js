const apiURL = 'http://localhost:3000';
const socketsURL = 'http://localhost:3001';
const userData = JSON.parse(window.sessionStorage.getItem('user_data'));
const socket = io(socketsURL);

const $messages = document.querySelector("#messages");
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const messageButton = document.getElementById('send-message');
const roomButton = document.getElementById('change-room');
const logOutButton = document.getElementById('logout');

const autoscroll = () => {
    //New message element
    const $newMessage = $messages.lastElementChild;

    //Height of the new message
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    //Visible Height
    const visibleHeight = $messages.offsetHeight;

    //Height of messages container
    const containerHeight = $messages.scrollHeight;

    //How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight;
    }

};

if(!userData) location.href='./rooms.html';
if(!userData.room) location.href='./rooms.html';

socket.emit('join', {user:userData.name, room:userData.room}, (error)=>{
    if (error) {
        alert(error);
        window.location='./rooms.html';
    }
});

socket.on('message', (message)=>{
    const html = `<div class="message">
                    <p>
                        <span class="message__name">${message.owner}</span>
                        <span class="message__meta">${message.date}</span>
                    </p>
                    <p>${message.text}</p>
                </div>`;
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('roomData', ({room, users})=>{
    var list = ``;
    for (const user of users){
        list += `<li>${user}</li>`
    }
    const html = `<h2 class="room-title">${room}</h2>
                <h3 class="list-title">Users</h3>
                <ul class="users">`+list+`</ul>`;
    document.querySelector('#sidebar').innerHTML = html;
});

//Enviar un missatge
messageButton.addEventListener('click', (e)=>{
    e.preventDefault();

    //disable button
    messageButton.setAttribute('disabled', 'disabled');

    //target refers to the form, elements to its elements.
    const message = document.getElementById('chat-message');
    
    socket.emit('sendMessage', message.value, (a)=>{
        messageButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        console.log(a);
    });
});

//Canviar de sala
roomButton.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location='./rooms.html';
});

//Log Out
logOutButton.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location='./index.html';
});