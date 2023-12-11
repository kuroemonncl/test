//index.js
const express = require('express');
const path = require('path');
const userRouter = require("./user.js");
const authRouter = require("./auth.js");

function route(app) {
    // Serve static files from the 'build' directory
    app.use(express.static(path.join(__dirname, 'build')));

    // User routers
    app.use('/api/users', userRouter);

    // Auth routers
    app.use('/auth', authRouter);

    // Catch-all route to serve index.html for client-side routing
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

}

module.exports = route;
