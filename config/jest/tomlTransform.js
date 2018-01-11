const getModuleFor = require('../loaders/toml');

// This is a custom Jest transformer turning toml file imports into objects.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process(src, filename) {
    return getModuleFor(src);
  },
};
