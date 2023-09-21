const bcrypt = require('bcryptjs');

module.exports.encryptPassword = (password) => bcrypt.hashSync(password, 10);
