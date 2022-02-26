const Message = require('../models/message.js');

const adminMessage = (text)=>{
    return {
        text,
        date: new Date().getTime(), //TODO hora bonica
        owner: 'Admin'
    };
};

const userMessage = async (text, user) =>{
    try{
        const message = new Message({
            text: text,
            date: new Date().getTime(),
            room: user.room,
            owner: user.name
        });
        await message.save();
        console.log(message);
        return message;
    }catch(e){
        console.log(e);
    }
};

module.exports = {
    adminMessage, 
    userMessage
};
