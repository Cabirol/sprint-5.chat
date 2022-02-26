const { Server } = require("socket.io");
const User = require('../models/user.js');
const {adminMessage, userMessage} = require('../utils/messages.js');
const getUsersInRoom = require('../utils/users.js');

module.exports = server => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });
      
    io.on("connection", (socket) => {
        console.log('New websocket connection');
      
        socket.on('join', async (data) => {
            try{
                const newUserInRoom = await User.findOne({name: data.user, room: data.room});
                newUserInRoom.socket = socket.id;
                await newUserInRoom.save();
                
                socket.join(newUserInRoom.room);

                socket.emit('message', adminMessage(`Welcome, ${newUserInRoom.name}`));
                socket.broadcast.to(newUserInRoom.room)
                .emit('message', adminMessage(`${newUserInRoom.name} has joined`));

                io.to(newUserInRoom.room).emit('roomData', {
                    room: newUserInRoom.room,
                    users: await getUsersInRoom(newUserInRoom.room)
                });

            }catch(e){
                console.log(e);

            }
        });

        socket.on('sendMessage', async (message, callback)=>{
            try{
                console.log(message, 'blibli');
                const user = await User.findOne({socket: socket.id});
                io.to(user.room).emit('message', await userMessage(message, user));
                await callback('Message Delivered');

            }catch(e){
                console.log(e);
            }
        });

        socket.on('disconnect', async ()=>{
            try{
                const disconnectedUser = await User.findOne({socket: socket.id});
                const room = disconnectedUser.room;
                console.log(disconnectedUser.name, 'has disconnected.');
                disconnectedUser.socket = '';
                disconnectedUser.room = '';
                await disconnectedUser.save();

                
                io.to(room).emit('message', adminMessage(`${disconnectedUser.name} has left!`));
                io.to(room).emit('roomData', {
                    room : room,
                    users: await getUsersInRoom(room)
                });
                 
            }catch(e){
                console.log(e);
            }                    
        });
      
    });

    return io;
}
