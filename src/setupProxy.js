const { applyMiddleware } = require('@forte-music/mock');

module.exports = function(app) {
  if (!process.env.REACT_APP_MOCK_RESOLVER) {
    return;
  }

  applyMiddleware(app);
};
