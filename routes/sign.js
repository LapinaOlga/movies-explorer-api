const router = require('express').Router();
const UserController = require('../controllers/users');
const { validateSignInRequest } = require('../middleware/validateSignInRequest');
const { validateSignUpRequest } = require('../middleware/validateSignUpRequest');

router.post('/signin', validateSignInRequest, UserController.login);
router.post('/signup', validateSignUpRequest, UserController.create);

module.exports = router;
