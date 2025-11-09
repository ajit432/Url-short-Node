const pool = require('../config/db');
const { nanoid } = require('nanoid');
const logger = require('../utils/logger');

// Create short URL
exports.createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ message: 'originalUrl required' });

    const shortId = nanoid(6);
    // await pool.query('INSERT INTO urls (short_id, original_url) VALUES (?, ?)', [shortId, originalUrl]);
    await pool.query('INSERT INTO urls (short_id, original_url) VALUES ($1, $2)', [shortId, originalUrl]);

    const shortUrl = `${global.APP_CONFIG.APP_BASE_URL}/api/v1/url/${shortId}`;
    res.json({ shortUrl, shortId });
  } catch (err) {
    logger.logError(err);
    next(err);
  }
};

// Redirect
exports.redirectToOriginal = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    // const [rows] = await pool.query('SELECT original_url FROM urls WHERE short_id = ?', [shortId]);
    const result = await pool.query('SELECT original_url FROM urls WHERE short_id = $1', [shortId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Not found' });

    const originalUrl = rows[0].original_url;
    // await pool.query('UPDATE urls SET clicks = clicks + 1 WHERE short_id = ?', [shortId]);
    await pool.query('UPDATE urls SET clicks = clicks + 1 WHERE short_id = $1', [shortId]);
    res.redirect(originalUrl);
  } catch (err) {
    logger.logError(err);
    next(err);
  }
};

// List all URLs (for frontend “Recent” section)
exports.listUrls = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT short_id, original_url, clicks, created_at FROM urls ORDER BY created_at DESC LIMIT 10'
    );
    res.json(rows);
  } catch (err) {
    logger.logError(err);
    next(err);
  }
};
