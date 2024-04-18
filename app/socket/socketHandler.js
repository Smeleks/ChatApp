const socket = require("socket.io");
const formatMessage = require("../utils/messages");

function initializeSocket(server) {
  const io = socket(server);

  io.on("connection", (socket) => {
    socket.emit("message", formatMessage("BOT", "welcome!"));
    socket.broadcast.emit("message", formatMessage("BOT", "A user just connected!"));

    socket.on("chatMsg", (msg) => {
      io.emit("message", formatMessage("USER", msg));
    });

    socket.on("disconnect", () => {
      io.emit("message", formatMessage("BOT", "A user has just left!"));
    });
  });
}

module.exports = initializeSocket;
