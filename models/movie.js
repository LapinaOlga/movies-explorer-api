const mongoose = require('mongoose');
const { validateUrl } = require('../utils/validateUrl');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле country обязательно к заполнению'],
  },
  director: {
    type: String,
    required: [true, 'Поле director обязательно к заполнению'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration обязательно к заполнению'],
  },
  year: {
    type: Number,
    required: [true, 'Поле year обязательно к заполнению'],
  },
  description: {
    type: String,
    required: [true, 'Поле description обязательно к заполнению'],
  },
  image: {
    type: String,
    required: [true, 'Поле image обязательно к заполнению'],
    validate: {
      validator: validateUrl,
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле trailerLink обязательно к заполнению'],
    validate: {
      validator: validateUrl,
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail обязательно к заполнению'],
    validate: {
      validator: validateUrl,
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Поле movieId обязательно к заполнению'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU обязательно к заполнению'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN обязательно к заполнению'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
