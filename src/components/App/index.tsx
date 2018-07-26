import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from '../Sidebar';
import Footer from '../FooterContainer';
import Queue from '../QueueContainer';
import { Albums } from '../AlbumsContainer';
import Artist from '../ArtistContainer';
import Album from '../AlbumContainer';
import { Songs } from '../SongsContainer';

import { Providers } from './Providers';
import Title from '../Title';
import { KeyboardInteraction } from '../KeyboardInteraction';

import {
  albumPath,
  albumsPath,
  artistPath,
  artistsPath,
  homePath,
  queuePath,
  searchPath,
  songsPath,
  withIdPathParam,
  withIdFromProps,
} from '../../utils/paths';

import styles from './styles.css';

export const App = () => (
  <Providers>
    <div className={styles.grid}>
      <Title />
      <KeyboardInteraction />

      <Sidebar className={styles.sidebar} />

      <main className={styles.content}>
        <Switch>
          <Route exact path={songsPath} render={() => <Songs />} />

          <Route exact path={artistsPath} />
          <Route
            exact
            path={artistPath(withIdPathParam)}
            render={withIdFromProps(id => <Artist id={id} />)}
          />

          <Route exact path={albumsPath} render={() => <Albums />} />

          <Route
            exact
            path={albumPath(withIdPathParam)}
            render={withIdFromProps(id => <Album id={id} />)}
          />

          <Route exact path={homePath} />
          <Route exact path={queuePath} render={() => <Queue />} />
          <Route exact path={searchPath} />

          <Redirect from="/" to="/home" />
        </Switch>
      </main>

      <Footer className={styles.footer} />
    </div>
  </Providers>
);
