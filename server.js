const express = require('express');
const path = require('path');
const http = require("http");
const socket = require("socket.io");
const formatMessage = require("./app/utils/messages.js");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
const server = http.createServer(app);

const usersFilePath = path.join(__dirname, "public/users.json");

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    fs.readFile(usersFilePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading users file: ", err);
            return res.status(500).json({ message: `Internal server error reading file: ${err}` });
        }

        let users = [];

        if (data) {
            try {
                users = JSON.parse(data);
            }
            catch (parseError) {
                console.error("Error parsing users file: ", parseError);
                return res.status(500).json({ message: `Internal server error parsing file: ${parseError}` });
            }
        }


        const existingUser = users.find((user) => user.username === username);

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser = {
            username: username,
            password: password
        };

        users.push(newUser);
    });

    console.log(username);
    console.log(password);
});

const io = socket(server);

const PORT = 3000;

io.on('connection', (socket) => {

    socket.emit("message", formatMessage("Bot", "Welcome to our chat"));
    socket.broadcast.emit("message", formatMessage("Bot", "A user just connected."));

    socket.on("chat-msg", (msg) => {
        io.emit("message", formatMessage("USER", msg));
    });

    socket.on("disconnect", (socket) => {
        io.emit("message", formatMessage("Bot", "A user just disconnected."));
    });

});

server.listen(PORT, () => {
    console.log(`Server listens to port ${PORT}`);
});
