const jwt = require('jsonwebtoken');

module.exports.getAuthToken = (user) => jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
