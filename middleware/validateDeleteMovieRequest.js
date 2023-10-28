const { celebrate, Joi } = require('celebrate');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

module.exports.validateDeleteMovieRequestMiddleware = celebrate({
  params: {
    id: Joi.string()
      .required()
      .hex()
      .length(24)
      .messages({
        'string.base': ERROR_MESSAGES.validation.movie.id.string,
        'any.required': ERROR_MESSAGES.validation.movie.id.required,
        'any.hex': ERROR_MESSAGES.validation.movie.id.hex,
        'any.length': ERROR_MESSAGES.validation.movie.id.length,
      }),
  },
});
