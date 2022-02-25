const api = 'http://localhost:3000';
const userData = JSON.parse(window.sessionStorage.getItem('user_data'));
const socket = io(api);

console.log(userData, "hello");

socket.emit('join', {user:userData.name, room:userData.room}, (error)=>{
    if (error) {
        alert(error);
        location.href='/chat.html';
    }
});

