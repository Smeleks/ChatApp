require("dotenv").config();

const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const authRoutes = require("./app/routes/authRoutes");
const initializeSocket = require("./app/socket/socketHandler");

const app = express();
const server = http.createServer(app);


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", authRoutes);

initializeSocket(server);

server.listen(3000, () => {
  console.log("Server listens to port 3000");
})