const express = require('express');
const router = express.Router();
const urlService = require('../../services/urlService');

// Create short URL
router.post('/shorten', urlService.createShortUrl);

// Redirect by short ID
router.get('/:shortId', urlService.redirectToOriginal);

module.exports = router;
