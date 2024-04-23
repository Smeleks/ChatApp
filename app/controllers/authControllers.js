const jwt = require("jsonwebtoken");
const { hashPass, comparePass } = require("../utils/bcrypt")
const uuid = require("uuid");

const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../../public/users.json");
const JWT_SECRET_KEY = process.env.MY_CUSTOM_SECRET_KEY;

const signup = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const gender = req.body.gender;
  const bdate = req.body.bdate;

  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading users file:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing users file:", parseError);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      const msg = "Username Already Exists"
      const status = "fail"
      return res.status(400).redirect(`/signup.html?message=${msg}&status=${status}`)
    }
    hashPass(password).then((bcryptedPassword) => {
      const token = jwt.sign({ username }, JWT_SECRET_KEY);
      const id = uuid.v4();
      const newUser = { id, username, password: bcryptedPassword, gender, bdate, token };
      users.push(newUser);

      fs.writeFile(usersFilePath, JSON.stringify(users), "utf8", (writeErr) => {
        if (writeErr) {
          console.error("Error writing users file:", writeErr);
          return res.status(500).json({ message: "Internal server error" });
        }
        const successMessage = "User Created Successfully";
        const status = "success";
        res
          .status(201)
          .redirect(`/?message=${successMessage}&status=${status}`);
      });
    });
  });
};

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const room = req.body.room;

  fs.readFile(usersFilePath, "utf-8", (err, fileData) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    let users = [];
    if (fileData) {
      try {
        users = JSON.parse(fileData);
      } catch (err) {
        return res.status(500).json({ message: "internal server error" });
      }
    }
    const user = users.find((user) => user.username === username);
    if (!user) {
      const message = "Username doesn't Exist";
      const status = "fail";
      return res.status(404).redirect(`/?message=${message}&status=${status}`);
    }
    comparePass(password, user.password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ username, room }, JWT_SECRET_KEY);
          res.redirect(`/chat.html?token=${token}`);
        } else {
          const message = "Incorrect Password.";
          const status = "fail";
          res.redirect(`/?message=${message}&status=${status}`);
        }
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: `Internal server error: ${err}` });
      });
  });
};

module.exports = {signup, login};