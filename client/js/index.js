console.log("hola");

const api = 'http://localhost:3000';

postNewUser = async (objectData) => {
    try{
        const res = await fetch(api+'/users', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(objectData)
        });
        const data = await res.json();
        //Enlloc de console.log, la funció ha de fer servir la info.
        console.log(data);
        //TODO gestionar errors
        window.localStorage.setItem('user_data', data)
        // redirigeix cap a rooms
        window.location='./rooms.html';
    }catch(e){
        console.log(e);
    }  
};

const signUpButton = document.getElementById('signup');

signUpButton.addEventListener('click', (e)=>{
    e.preventDefault();
    //Només te en compte el que hi ha dins del signup?
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const objectData = {name: name.value, password: password.value};
    postNewUser(objectData);
});