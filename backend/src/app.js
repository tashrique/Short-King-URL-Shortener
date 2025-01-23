const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const urlRoutes = require('./routes/urlRoutes');

// Create express instance
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', urlRoutes);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log('Server is running on http://localhost:' + PORT)
);