/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const user = require('./user');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
    maxlength: 100,
  },
  director: {
    type: String,
    required: true,
    maxlength: 100,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  image: {
    type: String,
    required: false,
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?([a-zA-Z0-9\-])+\.([a-zA-Z])+\/?([a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=]+)/.test(
          v,
        );
      },
      message: (props) => `Ошибка в ссылке ${props.value}`,
    },
  },
  trailer: {
    type: String,
    required: false,
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?([a-zA-Z0-9\-])+\.([a-zA-Z])+\/?([a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=]+)/.test(
          v,
        );
      },
      message: (props) => `Ошибка в ссылке ${props.value}`,
    },
  },
  thumbnail: {
    type: String,
    required: false,
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?([a-zA-Z0-9\-])+\.([a-zA-Z])+\/?([a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=]+)/.test(
          v,
        );
      },
      message: (props) => `Ошибка в ссылке ${props.value}`,
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: user,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
    maxlength: 300,
    default: 'Название фильма на русском языке',
  },
  nameEN: {
    type: String,
    required: true,
    maxlength: 300,
    default: 'The title of the film in English',
  },
});

module.exports = mongoose.model('movie', movieSchema);
