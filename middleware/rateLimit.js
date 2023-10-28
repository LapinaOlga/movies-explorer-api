const rateLimit = require('express-rate-limit');

module.exports.rateLimitMiddleware = rateLimit({
  windowMs: 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
