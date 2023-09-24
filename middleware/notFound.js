const NotFoundError = require('../errors/NotFoundError');

module.exports.notFoundMiddleware = async (req, res, next) => {
  next(new NotFoundError());
};
