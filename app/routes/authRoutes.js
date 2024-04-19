const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/authControllers");


router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);

module.exports = router;