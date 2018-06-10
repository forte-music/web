// @flow
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Footer from './containers/Footer';
import Queue from './containers/Queue';
import Albums from './containers/Albums';

import Providers from './providers';
import Title from './components/Title';
import { KeyboardInteraction } from './keyboardInteraction';

import {
  album,
  albums,
  artist,
  artists,
  home,
  queue,
  search,
  songs,
  withId,
} from './paths';
import store from './store';

import styles from './App.css';

const App = () => (
  <Providers>
    <div className={styles.grid}>
      <Title />
      <KeyboardInteraction store={store} />

      <Sidebar className={styles.sidebar} />

      <main className={styles.content}>
        <Switch>
          <Route exact path={songs} />

          <Route exact path={artists} />
          <Route exact path={artist(withId)} />

          <Route exact path={albums} component={Albums} />
          <Route exact path={album(withId)} />

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
