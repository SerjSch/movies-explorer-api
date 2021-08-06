const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/404-not-found-err');

router.use('/', usersRouter);
router.use('/', moviesRouter);
router.all('/*', () => {
  throw new NotFoundError('404 - Запрашиваемый ресурс не найден');
});
module.exports = router;
