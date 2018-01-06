// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import Playlist from '../containers/Playlist/Playlist';
import SONGS from '../model';
import type { PlaylistItem, Song, Edge } from '../model';
import StatefulComponent from './StatefulComponent';

storiesOf('Playlist', module).add('interactive', () => (
  <StatefulComponent state={{ playbackState: 'STOPPED' }}>
    {({ playbackState }, setState) => (
      <Playlist
        fetchMore={() => {}}
        loading={false}
        playlist={{
          id: '1',
          name: 'Break Up Music',
          duration: 1 * 60 * 60 + 25 * 60 + 20,
          items: {
            count: 3,
            edges: Object.values(SONGS).map((song: any, index): Edge<
              PlaylistItem
            > => ({
              cursor: index.toString(),
              node: {
                id: index.toString(),
                song: (song: Song),
              },
            })),
          },
        }}
        onPause={() => setState({ playbackState: 'PAUSED' })}
        onPlay={() => setState({ playbackState: 'PLAYING' })}
        onStartPlayback={() => setState({ playbackState: 'PLAYING' })}
        state={playbackState}
      />
    )}
  </StatefulComponent>
));
