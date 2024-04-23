require("dotenv").config();
const socket = require("socket.io");
const formatMessage = require("../utils/messages");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.MY_CUSTOM_SECRET_KEY;
const {userJoin} = require("../utils/user");

const initializeSocket = (server) => {
  const io = socket(server);

  io.on("connection", (socket) => {
    socket.on('joinRoom', (token) => {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      const { username, room } = decoded;
      const user = userJoin(socket.id, username, room);

      socket.emit("roomJoined", room);

      socket.on("roomJoined", (room) => {
        const roomElement = document.getElementById('room-name');
        roomElement.textContent = room;
        console.log(`Joined room: ${room}`);
    });

      socket.emit("message", formatMessage("BOT", `Welcome, ${user.username}`));
      socket.broadcast.emit("message", formatMessage("BOT", `${user.username} Just Connnected!`));
  
      socket.on("chatMsg", (msg) => {
        io.emit("message", formatMessage(`${user.username}`, msg));
      });

      socket.on("disconnect", () => {
        io.emit("message", formatMessage("BOT", `${user.username} has Just Left!`));
      });
    });
  });
};

module.exports = initializeSocket;