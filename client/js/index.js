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
    }catch(e){
        console.log(e);
    }  
};

const signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(signUpForm);
    const objectData = {};
    formData.forEach((value, key) => objectData[key] = value);
    postNewUser(objectData);
});