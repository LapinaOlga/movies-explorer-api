const { celebrate, Joi } = require('celebrate');
const { ERROR_MESSAGES } = require('../enums/errorMessages');
const { validateEmail } = require('../utils/validateEmail');

module.exports.validateSignUpRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validateEmail(value)) {
          return value;
        }
        return helper.message(ERROR_MESSAGES.validation.user.email.email);
      })
      .messages({
        'string.base': ERROR_MESSAGES.validation.user.email.string,
        'any.required': ERROR_MESSAGES.validation.user.email.required,
        'string.email': ERROR_MESSAGES.validation.user.email.email,
      }),
    password: Joi.string()
      .required()
      .min(8)
      .messages({
        'string.base': ERROR_MESSAGES.validation.user.password.string,
        'any.required': ERROR_MESSAGES.validation.user.password.required,
        'string.min': ERROR_MESSAGES.validation.user.password.minLength,
      }),
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.base': ERROR_MESSAGES.validation.user.name.string,
        'any.required': ERROR_MESSAGES.validation.user.name.required,
        'string.min': ERROR_MESSAGES.validation.user.name.minLength,
        'string.max': ERROR_MESSAGES.validation.user.name.maxLength,
      }),
  }).unknown(true),
});
