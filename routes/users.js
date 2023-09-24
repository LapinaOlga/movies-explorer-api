const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const UserController = require('../controllers/users');

router.get('/me', UserController.getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Поле email должно быть валидным email-адресом');
    }),
  }),
}), UserController.updateMe);

module.exports = router;
