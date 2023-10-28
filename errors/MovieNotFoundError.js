const NotFoundError = require('./NotFoundError');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

class MovieNotFoundError extends NotFoundError {
  constructor() {
    super(ERROR_MESSAGES.errors.movieIsUndefined);
  }
}

module.exports = MovieNotFoundError;
