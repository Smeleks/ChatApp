const express = require("express");
const path = require('path');
const http = require('http');
const socket = require('socket.io');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
    console.log('User Connected Successful!');

    socket.emit('message', 'Hello, New User!');
    socket.broadcast.emit('message', 'New User Joined!');

    socket.on('chatMsg', (m) => {
        io.emit('message', m);
    });

    socket.on('disconnect', () => {
        io.emit('message', 'User Disconnected!');
    });
});

server.listen(PORT, () => {
console.log(`server is running on port ${PORT}`);
});