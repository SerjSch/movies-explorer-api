const Movie = require('../models/movie');
const NotFoundError = require('../errors/404-not-found-err');
const BadRequestError = require('../errors/400-bad-request-err');
const ForbiddenError = require('../errors/403-forbidden-err');
const ConflictError = require('../errors/409-conflict-err');

const getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError(
          '400 — Переданы некорректные данные при создании фильма.',
        );
      }
      if (error.name === 'MongoError' || error.code === '11000') {
        throw new ConflictError('Конфликт ошибка MongoError');
      }
      throw error;
    })
    .catch(next);
};
/// //////////////DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params.movieId)
    .orFail(new Error('NotFound'))
    .then((movie) => {
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError('403 — Это не ваш фильм');
      } else {
        return movie.remove().then(() => res.send({ message: 'Фильм удален' }));
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError(
          '400 — Переданы некорректные данные удаления фильма',
        );
      } else if (error.message === 'NotFound') {
        throw new NotFoundError('404 — фильм по указанному _id не найдена');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
