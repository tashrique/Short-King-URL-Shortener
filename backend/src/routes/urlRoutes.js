const express = require('express');
const { createShortUrl, redirectUrl } = require('../controllers/urlController');
const router = express.Router();

// Router for shortening URL
router.post('/shorten', createShortUrl);

// Router for redirecting to original URL
router.get('/:shortcode', redirectUrl);

module.exports = router;