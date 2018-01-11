// @flow
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';

import StatefulComponent from './StatefulComponent';
import Playlist from '../containers/Playlist/Playlist';
import type { PlaylistModel } from '../containers/Playlist/Playlist';
import { playlists } from '../graphql/mock';
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
  .addDecorator(story => <HashRouter>{story()}</HashRouter>)
  .add('isolated', () => (
    <StatefulComponent state={{ playbackState: 'STOPPED' }}>
      {({ playbackState }, setState) => (
        <Playlist
          fetchMore={() => {}}
          loading={false}
          playlist={playlist}
          onPause={() => setState({ playbackState: 'PAUSED' })}
          onPlay={() => setState({ playbackState: 'PLAYING' })}
          onStartPlayback={() => setState({ playbackState: 'PLAYING' })}
          state={playbackState}
        />
      )}
    </StatefulComponent>
  ));
