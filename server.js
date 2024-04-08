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

    socket.emit("message", "Wellcome to server");

    socket.broadcast.emit("message", "A new user joind");

    socket.on('chatMsg', (m) => {
        io.emit("message", m)
    })

    socket.on('disconnect', () => {
        io.emit("message", "A user has left")
    })
});

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});