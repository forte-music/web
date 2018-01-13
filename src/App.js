// @flow
import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import Sidebar from './components/Sidebar';
import Footer from './containers/Footer';
import Playlist from './containers/Playlist';
import Queue from './containers/Queue';
import Albums from './containers/Albums';
import store from './store';
import client from './graphql/client';

import {
  album,
  albums,
  artist,
  artists,
  home,
  playlist,
  playlists,
  queue,
  search,
  songs,
} from './paths';

import styles from './App.css';

const Providers = ({ children }: { children: Node }) => (
  <HashRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  </HashRouter>
);

const withId = ':id';

const App = () => (
  <Providers>
    <div className={styles.grid}>
      <Sidebar className={styles.sidebar} />

      <main className={styles.content}>
        <Switch>
          <Route exact path={songs} />

          <Route exact path={artists} />
          <Route exact path={artist(withId)} />

          <Route exact path={albums} component={Albums} />
          <Route exact path={album(withId)} />

          <Route exact path={playlists} />
          <Route exact path={playlist(withId)} component={Playlist} />

          <Route exact path={home} />
          <Route exact path={queue} component={Queue} />
          <Route exact path={search} />

          <Redirect from="/" to="/home" />
        </Switch>
      </main>

      <Footer className={styles.footer} />
    </div>
  </Providers>
);

export default App;
