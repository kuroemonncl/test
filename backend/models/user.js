// user.js
const mongoose = require('mongoose');

// Define the 'users' model
const userSchema = new mongoose.Schema({
    name: { type: String, required: 'Name is required' },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill in a valid email address'],
        required: 'Email is required'
    },
    password: { type: String, required: 'Password is required' },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
