const app = require('./app');
const { connectDb } = require('./utils/connectDb');

connectDb();

app.listen(3000, () => {
  /* eslint-disable no-console, no-control-regex */
  console.log('Listening ...');
});
