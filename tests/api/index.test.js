require('./movie');
require('./sign');
require('./user');

const { connectDb } = require('../../utils/connectDb');

let db;

beforeAll(async () => {
  db = await connectDb();
});

afterAll(async () => {
  await db.disconnect();
});
