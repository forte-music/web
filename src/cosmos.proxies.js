import { createStore } from 'redux';
import createReduxProxy from 'react-cosmos-redux-proxy';
import reducer from './redux/reducers';

import createApolloProxy from 'react-cosmos-apollo-proxy';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import schema from '@forte-music/mock/schema';

import createRouterProxy from 'react-cosmos-router-proxy';

import createWrapperProxy from 'react-cosmos-wrapper-proxy';
import { RootThemeProvider } from './components/App/RootThemeProvider';

export default [
  createReduxProxy({
    createStore: state => createStore(reducer, state),
  }),
  createApolloProxy({
    clientOptions: {
      cache: new InMemoryCache(),
      link: new SchemaLink({ schema }),
    },
  }),
  createRouterProxy(),
  createWrapperProxy({
    component: RootThemeProvider,
    fixtureKey: 'useTheme',
  }),
];
