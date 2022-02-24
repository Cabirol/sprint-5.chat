const prova = document.querySelector('.saludo');
const userData = JSON.parse(window.sessionStorage.getItem('user_data'));

const api = 'http://localhost:3000';

getUser = async () => {
    try{
        const res = await fetch(api+'/users/me', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+userData.token
            }
        });
        const data = await res.json();
        
        console.log(data.name);
        return data.name;
    }catch(e){
        console.log(e);
        window.location='./index.html';    
    }  
};

getUser()
.then(nom => prova.innerHTML = `<p>Hola, ${nom}</p>`);


// ? en quins casos s'ha de tirar l'usuari cap enrere?