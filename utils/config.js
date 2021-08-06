require('dotenv').config();

const { mongoDB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

module.exports = {
  mongoDB,
};
