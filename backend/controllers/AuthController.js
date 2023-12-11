// AuthController.js
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const config = require('../config/config');

class AuthController {
    async signin(req, res) {
        const { email, password } = req.body;

        try {
            // Check user in database
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            // Check password
            if (user.password !== password) {
                return res.status(401).json({ status: false, message: "Invalid password" });
            }

            // Login success
            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                email: user.email,
            };

            // Generate and set JWT token as a cookie
            const token = jwt.sign({ _id: user._id }, config.jwtSecret);
            res.cookie('t', token, { expire: new Date() + 9999 });
            res.json({token: token});
            // Redirec t to the landing page after successful sign-in
            // res.redirect('/landingPage');
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Error logging in" });
        }
    }

    async signout(req, res) {
        // Clear the token cookie on signout
        res.clearCookie('t');
        res.json({ status: true, message: "Signed out successfully" });
    }
}

module.exports = new AuthController();
