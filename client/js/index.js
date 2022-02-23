console.log("hola");

const api = 'http://localhost:3000';

postNewUser = async (req) => {
    try{
        const res = await fetch(api+'/users', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        
        if(data.errors){
            return alert(data.message);
        }
        //L'storage només accepta string.
        window.sessionStorage.setItem('user_data', JSON.stringify(data));
        window.location='./rooms.html';
    }catch(e){
        console.log(e);
    }  
};

const signUpButton = document.getElementById('signup');

signUpButton.addEventListener('click', (e)=>{
    e.preventDefault();

    // ? Només te en compte el que hi ha dins del signup?
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const objectData = {name: name.value, password: password.value};

    postNewUser(objectData);
});