const { HTTP_BAD_REQUEST } = require('../enums/httpCodes');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

class BadRequestError extends Error {
  constructor(message = ERROR_MESSAGES.errors.badRequest) {
    super(message);
    this.status = HTTP_BAD_REQUEST;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = BadRequestError;
