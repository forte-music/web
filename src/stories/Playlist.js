// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';

import store from '../store';
import Playlist from '../containers/Playlist/Playlist';
import { playlists } from '../graphql/mock';
import type { PlaylistModel } from '../containers/Playlist/Playlist';
import type { Playlist as PlaylistDataModel } from '../graphql/mock';

const playlistModel: PlaylistDataModel = ((playlists.get(
  'playlist:1'
): any): PlaylistDataModel);

// Flow doesn't seem to understand the object spread operator.
// https://github.com/facebook/flow/issues/1511
const playlist = (({
  ...playlistModel,
  items: {
    count: playlistModel.items.length,
    edges: playlistModel.items.map((playlistItem, index) => ({
      cursor: index.toString(),
      node: playlistItem,
    })),
  },
}: any): PlaylistModel);

storiesOf('Playlist', module)
  .addDecorator(story => (
    <Provider store={store}>
      <HashRouter>{story()}</HashRouter>
    </Provider>
  ))
  .add('isolated', () => (
    <Playlist
      onStartPlaying={() => {}}
      isPlaying={true}
      fetchMore={() => {}}
      playlist={playlist}
    />
  ));
