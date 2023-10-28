const BadRequestError = require('./BadRequestError');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

class MovieIdIsNotCorrectError extends BadRequestError {
  constructor() {
    super(ERROR_MESSAGES.validation.movie.id.notCorrect);
  }
}

module.exports = MovieIdIsNotCorrectError;
