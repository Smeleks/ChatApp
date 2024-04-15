const path = require('path');
const usersFilePath = path.join(__dirname, '../../public/users.json');
const fs = require('fs');

const signup = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing users file:', parseError);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        const successMessage = 'Username Already Exist';
        const status = 'Fail';
        res.status(400).redirect(`./signup.html?message=${successMessage}&status=${status}`);  
    }
    const newUser = { username, password };
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing users file:', writeErr);
        return res.status(500).json({ message: 'Internal server error'});
      }
      const successMessage = 'User registered successfully';
      const status = 'Success';
      res.status(201).redirect(`/?message=${successMessage}&status=${status}`);
    });
  });
};

module.exports = {signup}