require("dotenv").config();
const socket = require("socket.io");
const formatMessage = require("../utils/messages");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.MY_CUSTOM_SECRET_KEY;
const { userJoin } = require("../utils/user");

const initializeSocket = (server) => {
  const io = socket(server);

  io.on("connection", (socket) => {
    socket.on('joinRoom', (token) => {
      try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const { username, room } = decoded;
        const user = userJoin(socket.id, username, room);

        socket.emit("roomJoined", room);  // Emitting room info to client
        socket.emit("message", formatMessage("BOT", `Welcome, ${user.username}`));
        socket.broadcast.to(room).emit("message", formatMessage("BOT", `${user.username} just connected!`));

        socket.on("chatMsg", (msg) => {
          io.to(room).emit("message", formatMessage(user.username, msg));
        });

        socket.on("disconnect", () => {
          io.to(room).emit("message", formatMessage("BOT", `${user.username} has just left!`));
        });
      } catch (error) {
        console.error("JWT Verification failed:", error.message);
        socket.emit("error", "Failed to verify JWT");
      }
    });
  });

  return io;
};

module.exports = initializeSocket;