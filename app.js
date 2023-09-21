require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');

// Костыль для тестов
process.env.JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use(routes);
app.use(notFoundMiddleware);
app.use(errorLogger);
app.use(errors());
app.use(errorHandlerMiddleware);

module.exports = app;
