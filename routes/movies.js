/* eslint-disable max-len */
const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// # возвращает все сохранённые пользователем фильмы
// GET /movies
moviesRouter.get('/movies', getMovies);

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies
moviesRouter.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().max(100),
      director: Joi.string().required().max(100),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required().max(1000),
      image: Joi.string()
        .required()
        .custom((imageUrl, checker) => {
          if (validator.isURL(imageUrl, { require_protocol: true })) {
            return imageUrl;
          }
          return checker.message('Некорректный url-адрес');
        })
        .messages({
          'Joi.any().required()': 'Введите ссылку на image',
        }),
      trailer: Joi.string()
        .required()
        .custom((trailerUrl, checker) => {
          if (validator.isURL(trailerUrl, { require_protocol: true })) {
            return trailerUrl;
          }
          return checker.message('Некорректный url-адрес');
        })
        .messages({
          'Joi.any().required()': 'Введите ссылку на trailer',
        }),
      nameRU: Joi.string().required().max(300),
      nameEN: Joi.string().required().max(300),
      thumbnail: Joi.string()
        .required()
        .custom((thumbnailUrl, checker) => {
          if (thumbnailUrl.isURL(thumbnailUrl, { require_protocol: true })) {
            return thumbnailUrl;
          }
          return checker.message('Некорректный url-адрес');
        })
        .messages({
          'Joi.any().required()': 'Введите ссылку на thumbnail',
        }),
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  createMovie,
);

// # удаляет сохранённый фильм по id
// DELETE /movies/movieId
moviesRouter.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = moviesRouter;
