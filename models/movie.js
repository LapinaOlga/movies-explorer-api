const mongoose = require('mongoose');
const { validateUrl } = require('../utils/validateUrl');
const { ERROR_MESSAGES } = require('../enums/errorMessages');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.movie.country.required],
  },
  director: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.movie.director.required],
  },
  duration: {
    type: Number,
    required: [true, ERROR_MESSAGES.validation.movie.duration.required],
  },
  year: {
    type: Number,
    required: [true, ERROR_MESSAGES.validation.movie.year.required],
  },
  description: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.movie.description.required],
  },
  image: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.movie.image.required],
    validate: {
      validator: validateUrl,
      message: ERROR_MESSAGES.validation.movie.image.url,
    },
  },
  trailerLink: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.movie.trailerLink.required],
    validate: {
      validator: validateUrl,
      message: ERROR_MESSAGES.validation.movie.trailerLink.url,
    },
  },
  thumbnail: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.movie.thumbnail.required],
    validate: {
      validator: validateUrl,
      message: ERROR_MESSAGES.validation.movie.thumbnail.url,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, ERROR_MESSAGES.validation.movie.movieId.required],
  },
  nameRU: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.movie.nameRu.required],
  },
  nameEN: {
    type: String,
    required: [true, ERROR_MESSAGES.validation.movie.nameEn.required],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
