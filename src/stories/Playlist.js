// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import StatefulComponent from './StatefulComponent';
import Playlist from '../containers/Playlist/Playlist';
import type { PlaylistModel } from '../containers/Playlist/Playlist';
import { playlists, songs, albums, artists } from '../graphql/data';
import type {
  Playlist as PlaylistDataModel,
  Song,
  Album,
  Artist,
} from '../graphql/data';

const playlistDataModel: PlaylistDataModel = ((playlists.get(
  'playlist:1'
): any): PlaylistDataModel);

// Flow doesn't seem to understand the object spread operator.
// https://github.com/facebook/flow/issues/1511
const playlist = (({
  ...playlistDataModel,
  items: {
    count: playlistDataModel.items.length,
    edges: playlistDataModel.items.map((playlistItem, index) => {
      const song: Song = (songs.get(playlistItem.song): any);
      const album: Album = (albums.get(song.album): any);
      const artist: Artist = (artists.get(album.artist): any);

      return {
        cursor: index.toString(),
        node: {
          ...playlistItem,
          song: {
            ...songs.get(playlistItem.song),
            album: {
              ...album,
              artist,
            },
          },
        },
      };
    }),
  },
}: any): PlaylistModel);

storiesOf('Playlist', module).add('isolated', () => (
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
