require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');

const { notFoundMiddleware } = require('./middleware/notFound');
const { errorHandlerMiddleware } = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { rateLimitMiddleware } = require('./middleware/rateLimit');

// Костыль для тестов
process.env.JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(helmet());
app.use(rateLimitMiddleware);

app.use(routes);
app.use(notFoundMiddleware);
app.use(errorLogger);
app.use(errors());
app.use(errorHandlerMiddleware);

module.exports = app;
