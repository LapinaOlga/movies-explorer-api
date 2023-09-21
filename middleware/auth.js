const jwt = require('jsonwebtoken');
const ProtectedRouteError = require('../errors/ProtectedRouteError');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  req.user = null;

  const header = req.headers.authorization;

  if (!header || !header.match(/^Bearer /i)) {
    next(new ProtectedRouteError());
    return;
  }

  const [, token] = header.split(' ');
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(new ProtectedRouteError());
    return;
  }

  try {
    // Пользователь может быть удален, а JWT токен при этом будет активным.
    // Дополнительно проверяем этот кейс.
    const user = await User.findById(payload._id);

    if (!user) {
      next(new ProtectedRouteError());
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
