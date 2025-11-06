const logger = require('../utils/logger');

exports.errorHandler = (err, req, res, next) => {
  logger.logError(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};
