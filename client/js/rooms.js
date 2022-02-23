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
        
        console.log(data);
    }catch(e){
        console.log(e);
    }  
};

getUser();

// ? en quins casos s'ha de tirar l'usuari cap enrere?