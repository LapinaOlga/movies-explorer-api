const { HTTP_NOT_FOUND } = require('../enums/httpCodes');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

class NotFoundError extends Error {
  constructor(message = ERROR_MESSAGES.errors.pageNotFound) {
    super(message);
    this.status = HTTP_NOT_FOUND;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = NotFoundError;
