const { HTTP_UNAUTHORIZED } = require('../enums/httpCodes');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

class ProtectedRouteError extends Error {
  constructor(message = ERROR_MESSAGES.errors.unauthorized) {
    super(message);
    this.status = HTTP_UNAUTHORIZED;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = ProtectedRouteError;
