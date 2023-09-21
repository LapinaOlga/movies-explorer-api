const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email обязателен для заполнения'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Поле email должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен для заполнения'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Поле name не может быть короче 2х символов'],
    maxlength: [30, 'Поле name не может быть длиннее 30 символов'],
    required: [true, 'Имя пользователя обязательно для заполнения'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
