const express = require("express");
const  registerController = require("../controllers/authController");
const loginController = require("../controllers/authController");
const router = express.Router();


router.post("/login", loginController.login);
router.post("/register", registerController.register);


module.exports = router;
