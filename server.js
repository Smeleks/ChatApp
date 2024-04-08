const express = require("express");
const path = require('path');
const http = require('http');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

io.on('connection', (socket) => {
    console.log('User Connected Successful!');

    socket.on('disconnect', () => {
        console.log('User Disconnected!');
    });
});


server.listen(PORT, () => {
console.log(`server is running on port ${PORT}`);
});