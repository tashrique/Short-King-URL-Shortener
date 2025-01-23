const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortcode: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    clickCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Url', urlSchema);