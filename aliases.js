const path = require('path');

module.exports = {
  API: path.resolve(__dirname, 'src/api'),
  DB: path.resolve(__dirname, 'src/db'),
  Errors: path.resolve(__dirname, 'src/errors'),
  Helpers: path.resolve(__dirname, 'src/helpers'),
  Models: path.resolve(__dirname, 'src/models'),
  Phrases: path.resolve(__dirname, 'src/phrases'),
  Repos: path.resolve(__dirname, 'src/repos'),
  Utils: path.resolve(__dirname, 'src/utils'),
};
