const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const signRoutes = require('./sign');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use(signRoutes);

module.exports = router;
