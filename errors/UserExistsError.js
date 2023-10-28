const { HTTP_CONFLICT } = require('../enums/httpCodes');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

class UserExistsError extends Error {
  constructor() {
    super(ERROR_MESSAGES.errors.userHasAlreadyExisted);
    this.status = HTTP_CONFLICT;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = UserExistsError;
