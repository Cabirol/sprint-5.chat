const express = require('express');
require('./db/mongoose.js');

const router = require('./routers/routers.js');

const app = express();
const http = require('http');
const server = http.createServer(app);
/*
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});


io.on("connection", (socket) => {
  

  setInterval(() => socket.emit("hello", "server li diu hello al client"), 5000);

  socket.on("howareyou", (arg) => {
  console.log(arg);
});
  
});
*/

app.use(express.json());

app.use(router);

server.listen(3000, () => {
  console.log('listening on port:3000');
});