const router = require('express').Router();
const UserController = require('../controllers/users');
const { validateUpdateUserRequest } = require('../middleware/validateUpdateUserRequest');

router.get('/me', UserController.getMe);
router.patch('/me', validateUpdateUserRequest, UserController.updateMe);

module.exports = router;
