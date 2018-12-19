import React, { ReactNode } from 'react';

import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from '../../redux/store';
import client from '../../graphql';
import { RootThemeProvider } from './RootThemeProvider';

export const Providers = ({ children }: { children: ReactNode }) => (
  <RootThemeProvider>
    <HashRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </Provider>
    </HashRouter>
  </RootThemeProvider>
);
