const router = require('express').Router();
const UserController = require('../controllers/users');
const { validateUpdateUserRequest } = require('../middleware/validateUpdateUserRequest');
const { authMiddleware } = require('../middleware/auth');

router.get('/me', authMiddleware, UserController.getMe);
router.patch('/me', authMiddleware, validateUpdateUserRequest, UserController.updateMe);

module.exports = router;
