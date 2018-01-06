// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Playlist from '../containers/Playlist/Playlist';
import SONGS from '../model';
import type { PlaylistItem, Song, Edge } from '../model';

storiesOf('Playlist', module).add('interactive', () => (
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
    onPause={action('onPause')}
    onPlay={action('onPlay')}
    onStartPlayback={action('onStartPlayback')}
    state={'STOPPED'}
  />
));
