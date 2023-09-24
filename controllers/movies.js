const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_CREATED } = require('../enums/httpCodes');
const ForbiddenError = require('../errors/ForbiddenError');

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
        throw new NotFoundError('Фильм не найден');
      }

      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Вы не можете удалять чужие фильмы');
      }

      await Movie.deleteOne(movie);

      res.send({ data: null });
    } catch (error) {
      if (error.name === 'CastError') {
        next(new BadRequestError('ID фильма указан неверно'));
      } else {
        next(error);
      }
    }
  },
};
