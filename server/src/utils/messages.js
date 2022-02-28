const Message = require('../models/message.js');

const adminMessage = (text)=>{
    return {
        text,
        date: dateNow(),
        owner: 'Admin'
    };
};

const userMessage = async (text, user) =>{
    try{
        const message = new Message({
            text: text,
            date: dateNow(),
            room: user.room,
            owner: user.name
        });
        await message.save();
        return message;
    }catch(e){
        console.log(e);
    }
};

const dateNow = () =>{
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours().toString().padStart(2, "0") + ":" 
                + today.getMinutes().toString().padStart(2, "0") + ":" 
                + today.getSeconds().toString().padStart(2, "0");
    const dateTime = date+' '+time;
    return dateTime;
};

module.exports = {
    adminMessage, 
    userMessage
};


