// @flow
import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import Sidebar from './components/Sidebar';
import Footer from './containers/Footer';
import Playlist from './containers/Playlist';
import store from './store';
import client from './client';

import styles from './App.css';

const Providers = ({ children }: { children: Node }) => (
  <HashRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  </HashRouter>
);

const App = () => (
  <Providers>
    <div className={styles.grid}>
      <Sidebar className={styles.sidebar} />

      <main className={styles.content}>
        <Switch>
          <Route exact path="/songs" />
          <Route exact path="/songs/:id" />

          <Route exact path="/artists" />
          <Route exact path="/artists/:id" />

          <Route exact path="/albums" />
          <Route exact path="/albums/:id" />

          <Route exact path="/playlists" />
          <Route exact path="/playlists/:id" component={Playlist} />

          <Route exact path="/home" />
          <Route exact path="/queue" />
          <Route exact path="/search" />

          <Redirect from="/" to="/home" />
        </Switch>
      </main>

      <Footer className={styles.footer} />
    </div>
  </Providers>
);

export default App;
