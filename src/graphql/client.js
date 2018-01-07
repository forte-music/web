// @flow
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

// The link is resolved based on the value of REACT_APP_MOCK_RESOLVER at
// build time. See /config/aliases.js for more information.
// $ExpectError
import link from '@/links';

const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

export default client;
