/* eslint-disable no-unused-vars */
// здесь обрабатываем все ошибки
function serverErrors(err, req, res, next) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500
        ? '500 - ошибка по-умолчанию, внутренняя ошибка сервера'
        : message,
  });
}

module.exports = serverErrors;
