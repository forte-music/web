// @flow
import React from 'react';
import type { Node } from 'react';

import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from './store';
import client from './graphql/client';

type Props = {
  children: Node,
};

export const Providers = ({ children }: Props) => (
  <HashRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  </HashRouter>
);

export default Providers;
