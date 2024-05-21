const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Get a single user by ID
router.get('/users/:id', userController.getUserById);

// Update a user by ID
router.patch('/users/:id', userController.updateUserById);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
