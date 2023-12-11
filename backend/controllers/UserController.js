// UserController.js
const User = require("../models/user");
const mongoose = require("mongoose");

class UserController {
  async getAll(req, res) {
    try {
      // Retrieve all users
      const users = await User.find();
      // Return the users
      res.json({
        status: true,
        data: users,
      });
    } catch (error) {
      // Handle any errors that occurred
      console.error("Error retrieving users:", error);
      res.json({
        status: false,
        data: [],
        message: "Have " + error,
      });
    }
  }
  async create(req, res) {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    newUser
      .save()
      .then(() => {
        res
          .status(201)
          .json({ status: true, message: "New user created successfully" });
      })
      .catch((error) => {
        res.status(500).json({ status: false, message: "Error creating user" });
      });
  }
  async detail(req, res) {
    const userId = req.params.userId;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ status: false, message: "User not found" });
        }
        res.json({ status: true, data: user });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ status: false, message: "Error retrieving user" });
      });
  }
  async update(req, res) {
    const userId = req.params.userId;
    const updatedUser = req.body;
    User.findByIdAndUpdate(userId, updatedUser, { new: true })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ status: false, message: "User not found" });
        }
        res.json({
          status: true,
          data: user,
          message: "User updated successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({ status: false, message: "Error updating user" });
      });
  }
  async delete(req, res) {
    const userId = req.params.userId;
    User.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ status: false, message: "User not found" });
        }
        res.json({ status: true, message: "User deleted successfully" });
      })
      .catch((error) => {
        res.status(500).json({ status: false, message: "Error deleting user" });
      });
  }
  async signin(req, res) {
    const { email, password } = req.body;
    // Check user in database
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ status: false, message: "User not found" });
        }
        // Check password
        if (user.password !== password) {
          return res.status(401).json({ status: false, message: "Invalid password" });
        }
        // Login success
        res.json({ status: true, message: "Login successful", data: user });
      })
      .catch((error) => {
        res.status(500).json({ status: false, message: "Error logging in" });
      });
  }
  async signout() {
    res.json({status: true, message: "Sign out successfully"})
  }
}

module.exports = new UserController();
