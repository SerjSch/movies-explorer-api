const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getAuthUser, updateUserInfo } = require('../controllers/users');

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
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: false },
      }),
    }),
  }),
  updateUserInfo,
);

module.exports = usersRouter;
