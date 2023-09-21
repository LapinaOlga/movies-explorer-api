const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const authMiddleware = require('../middleware/auth');
const UserController = require('../controllers/users');

router.get('/me', authMiddleware, UserController.getMe);
router.patch('/me', authMiddleware, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
}), UserController.updateMe);

module.exports = router;
