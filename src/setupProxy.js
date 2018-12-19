const { ApolloServer } = require('apollo-server-express');
const schema = require('@forte-music/mock/schema').default;
const server = new ApolloServer({ schema });

module.exports = function(app) {
  if (!process.env.REACT_APP_MOCK_RESOLVER) {
    return;
  }

  server.applyMiddleware({ app });
};
