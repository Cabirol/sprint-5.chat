const apiURL = 'http://localhost:3000';
const $signForm = document.querySelector('#sign-form');
const $signFormInput = $signForm.querySelector('input');
const signUpButton = document.getElementById('signup');
const $logForm = document.querySelector('#log-form');
const $logFormInput = $logForm.querySelector('input');
const loginButton = document.getElementById('login');

window.sessionStorage.clear();

//Funcions fetch

const postNewUser = async (req) => {
    try{
        const res = await fetch(apiURL+'/users', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        if(data.keyPattern){
            return alert('Username already exists');
        }
        if(data.errors){
            return alert(data.message);
        }
        window.sessionStorage.setItem('user_data', JSON.stringify(data));
        window.location='./rooms.html';
    }catch(e){
        alert(e);
    }  
};

const loginNewUser = async (req) => {
    try{
        const res = await fetch(apiURL+'/users/login', {
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
    
    $signFormInput.value = '';
    $signFormInput.focus();

    postNewUser(objectData);
});

loginButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const name = document.getElementById('logName');
    const password = document.getElementById('logPassword');
    const objectData = {name: name.value, password: password.value};

    $logFormInput.value = '';
    $logFormInput.focus();

    loginNewUser(objectData);
});