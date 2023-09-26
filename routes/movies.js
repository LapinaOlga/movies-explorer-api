const router = require('express').Router();
const MovieController = require('../controllers/movies');
const { validateCreateMovieRequestMiddleware } = require('../middleware/validateCreateMovieRequest');
const { validateDeleteMovieRequestMiddleware } = require('../middleware/validateDeleteMovieRequest');
const { authMiddleware } = require('../middleware/auth');

router.get('', authMiddleware, MovieController.list);
router.post('', authMiddleware, validateCreateMovieRequestMiddleware, MovieController.create);
router.delete('/:id', authMiddleware, validateDeleteMovieRequestMiddleware, MovieController.delete);

module.exports = router;
