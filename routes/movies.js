const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../utils/validateUrl');
const MovieController = require('../controllers/movies');

router.get('', MovieController.list);

router.post('', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required().min(1895).max(new Date().getFullYear() + 10),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (validateUrl(value)) {
        return value;
      }
      return helper.message('Поле image содержит невалидный URL');
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (validateUrl(value)) {
        return value;
      }
      return helper.message('Поле trailerLink содержит невалидный URL');
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validateUrl(value)) {
        return value;
      }
      return helper.message('Поле thumbnail содержит невалидный URL');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }).unknown(true),
}), MovieController.create);

router.delete('/:id', celebrate({
  params: {
    id: Joi.string().required().hex().length(24),
  },
}), MovieController.delete);

module.exports = router;
