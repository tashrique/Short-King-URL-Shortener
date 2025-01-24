const Url = require('../models/urlModel');
const shortid = require('shortid');
const validator = require('validator');


exports.createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;
    try {
        // Validate the URL
        if (!validator.isURL(originalUrl)) {
            return res.status(400).json({ message: "Invalid URL" });
        }

        // Check if the URL already exists in the database, if does, override the existing one
        let url = await Url.findOne({ originalUrl });
        if (url) {
            return res.status(200).json({ shortcode: url.shortcode });
        }


        // Generate a unique shortcode
        const shortcode = shortid.generate();

        // Save the URL to the database
        const newUrl = await Url.create({ originalUrl, shortcode });

        // Return the new URL
        res.status(201).json({ shortcode: newUrl.shortcode });

    } catch (error) {
        res.status(500).json({
            message: "Server Error: " + error.message,
        });
    }
};

exports.redirectUrl = async (req, res) => {
    const { shortcode } = req.params;

    try {
        // Find the URL in the database
        const url = await Url.findOne({ shortcode });

        // If the URL is not found, return 404
        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        // Increment the click count
        url.clickCount++;
        await url.save();

        // Redirect to the original
        return res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            message: "Server Error: " + error.message,
        });
    }

};