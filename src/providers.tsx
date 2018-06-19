import * as React from 'react';

import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from './store';
import client from './graphql/client';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <HashRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  </HashRouter>
);

export default Providers;
