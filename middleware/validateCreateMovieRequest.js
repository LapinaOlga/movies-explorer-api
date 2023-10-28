const { celebrate, Joi } = require('celebrate');
const { ERROR_MESSAGES } = require('../enums/errorMessages');
const { validateUrl } = require('../utils/validateUrl');

module.exports.validateCreateMovieRequestMiddleware = celebrate({
  body: Joi.object().keys({
    country: Joi.string()
      .required()
      .messages({
        'string.base': ERROR_MESSAGES.validation.movie.country.string,
        'any.required': ERROR_MESSAGES.validation.movie.country.required,
      }),
    director: Joi.string()
      .required()
      .messages({
        'string.base': ERROR_MESSAGES.validation.movie.director.string,
        'any.required': ERROR_MESSAGES.validation.movie.director.required,
      }),
    duration: Joi.number()
      .required()
      .messages({
        'number.base': ERROR_MESSAGES.validation.movie.duration.number,
        'any.required': ERROR_MESSAGES.validation.movie.duration.required,
      }),
    year: Joi.number()
      .required()
      .messages({
        'number.base': ERROR_MESSAGES.validation.movie.year.number,
        'any.required': ERROR_MESSAGES.validation.movie.year.required,
      }),
    description: Joi.string()
      .required()
      .messages({
        'string.base': ERROR_MESSAGES.validation.movie.description.string,
        'any.required': ERROR_MESSAGES.validation.movie.description.required,
      }),
    image: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validateUrl(value)) {
          return value;
        }
        return helper.message(ERROR_MESSAGES.validation.movie.image.url);
      })
      .messages({
        'string.base': ERROR_MESSAGES.validation.movie.image.string,
        'any.required': ERROR_MESSAGES.validation.movie.image.required,
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validateUrl(value)) {
          return value;
        }
        return helper.message(ERROR_MESSAGES.validation.movie.trailerLink.url);
      })
      .messages({
        'string.base': ERROR_MESSAGES.validation.movie.trailerLink.string,
        'any.required': ERROR_MESSAGES.validation.movie.trailerLink.required,
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validateUrl(value)) {
          return value;
        }
        return helper.message(ERROR_MESSAGES.validation.movie.thumbnail.url);
      })
      .messages({
        'string.base': ERROR_MESSAGES.validation.movie.thumbnail.string,
        'any.required': ERROR_MESSAGES.validation.movie.thumbnail.required,
      }),
    movieId: Joi.number()
      .required()
      .messages({
        'number.base': ERROR_MESSAGES.validation.movie.movieId.number,
        'any.required': ERROR_MESSAGES.validation.movie.movieId.required,
      }),
    nameRU: Joi.string()
      .required()
      .messages({
        'string.base': ERROR_MESSAGES.validation.movie.nameRu.string,
        'any.required': ERROR_MESSAGES.validation.movie.nameRu.required,
      }),
    nameEN: Joi.string()
      .required()
      .messages({
        'string.base': ERROR_MESSAGES.validation.movie.nameEn.string,
        'any.required': ERROR_MESSAGES.validation.movie.nameEn.required,
      }),
  }).unknown(true),
});
