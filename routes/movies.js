const router = require('express').Router();
const MovieController = require('../controllers/movies');
const { validateCreateMovieRequestMiddleware } = require('../middleware/validateCreateMovieRequest');
const { validateDeleteMovieRequestMiddleware } = require('../middleware/validateDeleteMovieRequest');

router.get('', MovieController.list);
router.post('', validateCreateMovieRequestMiddleware, MovieController.create);
router.delete('/:id', validateDeleteMovieRequestMiddleware, MovieController.delete);

module.exports = router;
