require("dotenv").config();
const socket = require("socket.io");
const formatMessage = require("../utils/messages");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.MY_CUSTOM_SECRET_KEY;

const initializeSocket = (server) => {
  const io = socket(server);
  io.on('connection', (socket) => {
    socket.on('joinRoom', (token) => {
      // const decoded = jwt.verify(token, JWT_SECRET_KEY);
      // const { username, room } = decoded;
      // console.log(username);
      // console.log(room);
    })
  });

  io.on("connection", (socket) => {
    socket.emit("message", formatMessage("BOT", "welcome!"));
    socket.broadcast.emit("message", formatMessage("BOT", "User Just Connnected!"));

    socket.on("chatMsg", (msg) => {
      io.emit("message", formatMessage("USER", msg));
    });

    socket.on("disconnect", () => {
      io.emit("message", formatMessage("BOT", "User has Just Left!"));
    });
  });
};

module.exports = initializeSocket;