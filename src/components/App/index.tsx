import React from 'react';
import styled from '../../styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Sidebar } from '../../Sidebar';
import Footer from '../FooterContainer';
import Queue from '../QueueContainer';
import { Albums } from '../AlbumsContainer';
import Artist from '../ArtistContainer';
import Album from '../AlbumContainer';
import { Songs } from '../SongsContainer';
import { Providers } from './Providers';
import Title from '../Title';
import { KeyboardInteraction } from '../KeyboardInteraction';
import { Search } from '../SearchContainer';

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

const Grid = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 1fr 100px;
`;

const SidebarStyled = styled(Sidebar)`
  padding-top: 3em;
  border-right: 1px solid ${props => props.theme.sidebarBorderColor};
  background: ${props => props.theme.sidebarBackgroundColor};
`;

const Content = styled.main`
  background: ${props => props.theme.contentBackgroundColor};
`;

const FooterStyled = styled(Footer)`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;

  background: ${props => props.theme.footerBackgroundColor};
`;

export const App = () => (
  <Providers>
    <Grid>
      <Title />
      <KeyboardInteraction />

      <SidebarStyled />

      <Content>
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
          <Route exact path={searchPath} render={() => <Search />} />

          <Redirect from="/" to="/home" />
        </Switch>
      </Content>

      <FooterStyled />
    </Grid>
  </Providers>
);
