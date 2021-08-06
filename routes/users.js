const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAuthUser, updateUserInfo, login, createUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

usersRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
// POST /signin
usersRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

usersRouter.use(auth);
// # возвращает информацию о пользователе (email и имя)
// GET /users/me
usersRouter.get('/users/me', getAuthUser);

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
usersRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email({
        minDomainSegments: 2,
        tlds: { allow: false },
      }),
    }),
  }),
  updateUserInfo,
);

module.exports = usersRouter;
