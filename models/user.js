const mongoose = require('mongoose');
const { ERROR_MESSAGES } = require('../enums/errorMessages');
const { validateEmail } = require('../utils/validateEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.user.email.required],
    unique: true,
    validate: {
      validator: validateEmail,
      message: ERROR_MESSAGES.validation.user.email.email,
    },
  },
  password: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.user.password.required],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, ERROR_MESSAGES.validation.user.name.minLength],
    maxlength: [30, ERROR_MESSAGES.validation.user.name.maxLength],
    required: [true, ERROR_MESSAGES.validation.user.name.required],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
