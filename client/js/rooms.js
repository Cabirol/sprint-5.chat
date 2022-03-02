const apiURL = 'http://localhost:3000';
var userData = JSON.parse(window.sessionStorage.getItem('user_data'));
const welcome = document.querySelector('.welcome');
const roomSidebar = document.querySelector('.buttons_box');
const newRoomButton = document.getElementById('newRoom');

//Funcions fetch

const getUser = async () => {
    try{
        const res = await fetch(apiURL+'/users/me', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+userData.token
            }
        });
        const data = await res.json();
        
        return data.name;
    }catch(e){
        console.log(e);
        window.location='./index.html';    
    }  
};

const createRoom = async (req) => {
    try{
        const res = await fetch(apiURL+'/users/me/rooms', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+userData.token
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        
        if(data.keyPattern){
            return alert('Room already exists');
        }
        if(data.errors){
            return alert(data.message);
        }
        return data;
    }catch(e){
        alert(e);
    }
};

const getRooms = async () => {
    try{
        const res = await fetch(apiURL+'/users/me/rooms', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+userData.token
            }
        });
        const data = await res.json();
        return data;
    }catch(e){
        console.log(e);
        window.location='./index.html';    
    }  
};

const getUserInRoom = async (req) => {
    try{
        const res = await fetch(apiURL+'/users/me/rooms', {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+userData.token
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        window.sessionStorage.setItem('user_data', JSON.stringify(data));
        window.location='./chat.html';
    }catch(e){
        console.log(e);
    }
}

//Coses que s'executen al obrir la pàgina(es carrega nom usuari i botons de sales)
if(userData){
    const data = userData;
    data.room = '';
    data.socket = '';
    window.sessionStorage.setItem('user_data', JSON.stringify(data));
    userData = JSON.parse(window.sessionStorage.getItem('user_data'));
}
getUser().then(nom => welcome.innerHTML = `<h1>Hello, ${nom}</h1>`);

getRooms().then((rooms)=>{
    var insertion = ``;
    for (const room of rooms){
        insertion += `<button class="sidebar_buttons" id="room${room.name}">${room.name}: ${room.numUsers} users</button>`;
    }
    roomSidebar.innerHTML = insertion;
    
    for (const room of rooms){
        const roomButton = document.getElementById(`room${room.name}`);
        roomButton.addEventListener('click', (e)=>{
            e.preventDefault();

            getUserInRoom({room: room.name});
        });
    }
});

//Botó de crear nova sala

newRoomButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const name = document.getElementById('roomName');
    const objectData = {name: name.value};
    
    createRoom(objectData)
    .then((room)=>getUserInRoom({room: room.name}))
    .catch(e=>undefined);
});

