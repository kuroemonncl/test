// user.js
const express = require("express")
const router = express.Router();

const UserController = require("../controllers/UserController");

// Fetch a user
router.get('/:userId', UserController.detail);
// Update a user
router.put('/:userId', UserController.update);
// Delete a user
router.delete('/:userId', UserController.delete);
// // Create a User
router.post('/', UserController.create);
// List all User
router.get('/', UserController.getAll);


module.exports = router;
