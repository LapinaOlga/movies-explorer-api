const { celebrate, Joi } = require('celebrate');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

module.exports.validateSignInRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.base': ERROR_MESSAGES.validation.user.email.string,
        'any.required': ERROR_MESSAGES.validation.user.email.required,
        'any.email': ERROR_MESSAGES.validation.user.email.email,
      }),
    password: Joi.string()
      .required()
      .min(8)
      .messages({
        'string.base': ERROR_MESSAGES.validation.user.password.string,
        'any.required': ERROR_MESSAGES.validation.user.password.required,
        'string.min': ERROR_MESSAGES.validation.user.password.minLength,
      }),
  }).unknown(true),
});
