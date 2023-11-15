const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const errorHandler = require('./middlewares/error-handler');
const PathError = require('./errors/path-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by');

// через localhost не получается подключиться, первая ссылка с решением проблемы со StackOverflow
mongoose.connect(DB_URL);

// краш тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .uri()
        .pattern(
          /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.\w+))(:\d{2,5})?((\/.+)+)?\/?#?/,
        ),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser,
);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(auth);

app.use((req, res, next) => {
  const err = new PathError('Not Found: Маршрут не найден');
  next(err);
});

app.use(errorLogger);

// обработка ошибок celebrate
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening ${PORT}`);
});
