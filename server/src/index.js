const express = require('express');
const cors = require('cors');

const http = require('http');

require('./db/mongoose.js');
const router = require('./routers/routers.js');
const socketsEngine = require('./sockets/sockets.js');

const app = express();
const server = http.createServer(app);
socketsEngine(server);

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3000, () =>{
  console.log('Api server listening on port 3000');
});

server.listen(3001, () => {
  console.log('Sockets server listening on port 3001');
});