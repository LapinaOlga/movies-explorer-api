const mongoose = require('mongoose');
const { mongoDsn } = require('../config');

module.exports.connectDb = async () => {
  const result = await mongoose.connect(mongoDsn, {
    useNewUrlParser: true,
  });

  return result;
};
