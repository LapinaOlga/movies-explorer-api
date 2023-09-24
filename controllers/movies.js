const Movie = require('../models/movie');
const { HTTP_CREATED } = require('../enums/httpCodes');
const MovieNotFoundError = require('../errors/MovieNotFoundError');
const YouCanNotDeleteNotYourMovieError = require('../errors/YouCanNotDeletNotYourMoviesError');
const MovieIdIsNotCorrectError = require('../errors/MovieIdIsNotCorrectError');

module.exports = {
  list: async (req, res, next) => {
    try {
      const movies = await Movie.find({ owner: req.user._id })
        .populate('owner')
        .sort({ year: 'desc' })
        .exec();

      res.send({ data: movies });
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      } = req.body;

      const movie = await Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
        owner: req.user._id,
      });

      movie.owner = req.user;

      res.status(HTTP_CREATED).send({ data: movie });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);

      if (!movie) {
        throw new MovieNotFoundError();
      }

      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new YouCanNotDeleteNotYourMovieError();
      }

      await Movie.deleteOne(movie);

      res.send({ data: null });
    } catch (error) {
      if (error.name === 'CastError') {
        next(new MovieIdIsNotCorrectError());
      } else {
        next(error);
      }
    }
  },
};
