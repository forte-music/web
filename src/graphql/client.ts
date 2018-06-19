import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

// The link is resolved based on the value of REACT_APP_MOCK_RESOLVER at
// build time. See /config/aliases.js for more information.
declare var process: {
  env: {
    REACT_APP_MOCK_RESOLVER: string;
  };
};

const getLink = () => {
  if (process.env.REACT_APP_MOCK_RESOLVER) {
    return require('./links/mock').default;
  }

  return require('./links/remote').default;
};

const link = getLink();
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

export default client;
