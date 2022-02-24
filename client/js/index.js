const api = 'http://localhost:3000';
const signUpButton = document.getElementById('signup');
const loginButton = document.getElementById('login');

//Funcions fetch

const postNewUser = async (req) => {
    try{
        const res = await fetch(api+'/users', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        console.log(data);
        if(data.keyPattern){
            return alert('Username already exists');
        }
        if(data.errors){
            return alert(data.message);
        }
        //L'storage només accepta string.
        window.sessionStorage.setItem('user_data', JSON.stringify(data));
        window.location='./rooms.html';
    }catch(e){
        alert(e);
    }  
};

const loginNewUser = async (req) => {
    try{
        const res = await fetch(api+'/users/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        
        if(data.errors){
            return alert(data.errors);
        }
        //L'storage només accepta string.
        window.sessionStorage.setItem('user_data', JSON.stringify(data));
        window.location='./rooms.html';
    }catch(e){
        alert(e);
    }  
};

//EventListeners als botons

signUpButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const name = document.getElementById('signName');
    const password = document.getElementById('signPassword');
    const objectData = {name: name.value, password: password.value};

    postNewUser(objectData);
});
//TODO camp name dels inputs?
loginButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const name = document.getElementById('logName');
    const password = document.getElementById('logPassword');
    const objectData = {name: name.value, password: password.value};

    loginNewUser(objectData);
});