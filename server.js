require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const logger = require('./src/utils/logger');

// Load global constants
global.APP_CONFIG = require('./src/config/appConfig');

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

// Rate limiter — per IP limit
app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: 'Too many requests, slow down!'
}));

// Load API versions dynamically
['v1'].forEach(v => {
  const router = require(`./src/routes/${v}/index`);
  ['/api', '/apiFB'].forEach(prefix => {
    app.use(`${prefix}/${v}`, router);
  });
});

// 404 Handler
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// Global error handler
app.use(require('./src/middleware/errorHandler').errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: ${global.APP_CONFIG.APP_BASE_URL}/api/v1`);
});
