const mongoose = require('mongoose');

module.exports.connectDb = async () => {
  const mongoDsn = process.env.MONGO_DSN || 'mongodb://localhost:27017/bitfilmsdb';

  const result = await mongoose.connect(mongoDsn, {
    useNewUrlParser: true,
  });

  return result;
};
