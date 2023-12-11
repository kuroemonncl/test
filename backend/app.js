const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/ConnectDB');
const route = require('./routes/index');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use 'route' function for setting up routes
route(app);

// Specific route for the landing page
app.get('/', (req, res) => {
    console.log('Serving landing page');
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
