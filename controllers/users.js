const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { HTTP_CREATED } = require('../enums/httpCodes');
const UserExistsError = require('../errors/UserExistsError');
const { getAuthToken } = require('../utils/getAuthToken');
const { encryptPassword } = require('../utils/encryptPassword');

module.exports = {
  getMe: async (req, res, next) => {
    try {
      res.send({ data: req.user });
    } catch (e) {
      next(e);
    }
  },
  updateMe: async (req, res, next) => {
    try {
      const { name, email } = req.body;

      req.user = await User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        { new: true, runValidators: true },
      );
      res.send({ data: req.user });
    } catch (e) {
      if (e.name === 'MongoServerError' && e.code === 11000) {
        next(new UserExistsError());
      } else {
        next(e);
      }
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        throw new UnauthorizedError();
      }

      // Проверяем пароль
      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedError();
      }
      const token = getAuthToken(user);

      return res.send({ data: { token } });
    } catch (e) {
      next(e);
    }

    return null;
  },
  create: async (req, res, next) => {
    try {
      let passwordHash = '';

      // Если пароль указан, то хешируем его. Если нет - то mongoose вернет ошибку валидации
      if (req.body && req.body.password) {
        passwordHash = encryptPassword(req.body.password);
      }

      const user = await User.create({
        ...req.body,
        password: passwordHash,
      });

      const responseData = user.toObject();
      delete responseData.password;

      res.status(HTTP_CREATED).send({ data: responseData });
    } catch (e) {
      if (e.name === 'MongoServerError' && e.code === 11000) {
        next(new UserExistsError());
      } else {
        next(e);
      }
    }
  },
};
