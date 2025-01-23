const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");

    } catch (error) {
        console.error("Error connecting to Database: ", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;