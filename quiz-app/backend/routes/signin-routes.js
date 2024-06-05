const express = require("express");
const router = new express.Router();
const authController = require("../controllers/signin-controller");
const auth = require("../utils/middleware/auth");

// Route for user login
router.post("/users/login", authController.loginUser);

module.exports = router;
