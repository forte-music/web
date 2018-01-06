// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import SONGS from '../model';

import SongList, { DetailHeader, DetailRow } from '../components/SongList';

const ids = Object.keys(SONGS);

storiesOf('SongList', module).add('interactive', () => (
  <SongList
    count={ids.length}
    totalItems={ids.length}
    loadMore={() => {}}
    header={<DetailHeader />}
    renderItem={({ index, style }) => {
      const id = ids[index];
      const song = SONGS[ids[index]];

      return (
        <div style={style} key={id}>
          <DetailRow song={song} />
        </div>
      );
    }}
  />
));
