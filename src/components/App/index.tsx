import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from '../Sidebar';
import Footer from '../FooterContainer';
import Queue from '../QueueContainer';
import { Albums } from '../AlbumsContainer';
import Artist from '../ArtistContainer';
import Album from '../AlbumContainer';

import { Providers } from './Providers';
import Title from '../Title';
import { KeyboardInteraction } from '../KeyboardInteraction';

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
  withIdFromProps,
} from '../../utils/paths';
import store from '../../redux/store';

import styles from './styles.css';

export const App = () => (
  <Providers>
    <div className={styles.grid}>
      <Title />
      <KeyboardInteraction store={store} />

      <Sidebar className={styles.sidebar} />

      <main className={styles.content}>
        <Switch>
          <Route exact path={songs} />

          <Route exact path={artists} />
          <Route
            exact
            path={artist(withId)}
            render={withIdFromProps(id => <Artist id={id} />)}
          />

          <Route exact path={albums} component={Albums} />
          <Route
            exact
            path={album(withId)}
            render={withIdFromProps(id => <Album id={id} />)}
          />

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
