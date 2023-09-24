const ForbiddenError = require('./ForbiddenError');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

class YouCanNotDeleteNotYourMovieError extends ForbiddenError {
  constructor() {
    super(ERROR_MESSAGES.errors.youCantDeleteNotYourOwnMovied);
  }
}

module.exports = YouCanNotDeleteNotYourMovieError;
