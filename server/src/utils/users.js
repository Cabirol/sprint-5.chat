const User = require('../models/user.js');

const getUsersInRoom = async(room) => {
    const userObjects = await User.find({room});
    const users = [];
    for (const user of userObjects){
        users.push(user.name);
    }
    return users;
}

module.exports = getUsersInRoom;