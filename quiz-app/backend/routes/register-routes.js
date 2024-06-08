const express = require("express");
const router = express.Router();
const userRegisterController = require("../controllers/register-controller");

// Create a new user
router.post("/users", userRegisterController.createUser);

// Get all users
router.get("/users", userRegisterController.getAllUsers);

// Get a single user by ID
router.get("/users/:id", userRegisterController.getUserById);

// Get a single user by Role
router.get("/usersrole", userRegisterController.getUsersByRole);

// Get a single user by Role
router.get("/count/users", userRegisterController.countUsersByRole);

// Update a user by ID
router.patch("/users/:id", userRegisterController.updateUserById);

// Delete a user by ID
router.delete("/users/:id", userRegisterController.deleteUserById);

module.exports = router;
